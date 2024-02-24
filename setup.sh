#!/bin/bash

command_exists() {
	command -v "$1" 2>&1
}

start_docker() {
	systemctl start docker && systemctl enable docker
}

confirm() {
	echo -e -n "\033[34m[Lyrify] $* \033[1;36m(Y/n)\033[0m"
	read -n 1 -s opt

	[[ "$opt" == $'\n' ]] || echo

	case "$opt" in
	'y' | 'Y') return 0 ;;
	'n' | 'N') return 1 ;;
	*) confirm "$1" ;;
	esac
}

info() {
	echo -e "\033[37m[Lyrify] $*\033[0m"
}

warning() {
	echo -e "\033[33m[Lyrify] $*\033[0m"
}

abort() {
	echo -e "\033[31m[Lyrify] $*\033[0m"
	exit 1
}

trap 'onexit' INT
onexit() {
	echo
	abort "用户手动结束安装"
}

if [ "$EUID" -ne "0" ]; then
	abort "请以 root 权限运行"
fi

if [ -z $(command_exists docker) ]; then
	warning "缺少 Docker 环境"
	if confirm "是否需要自动安装 Docker"; then
		curl -sSLk https://get.docker.com/ | bash
		if [ $? -ne "0" ]; then
			abort "Docker 安装失败"
		fi
		info "Docker 安装完成"
	else
		abort "中止安装"
	fi
fi

start_docker

docker version >/dev/null 2>&1
if [ $? -ne "0" ]; then
	abort "Docker 服务工作异常"
fi
info "Docker 工作状态正常"

if docker ps -a -q --filter "name=lyrify" | grep -q .; then
	# 升级
	if [ -f "/tmp/.Lyrify/config.txt" ]; then
		source "/tmp/.Lyrify/config.txt"
	else
		echo "config.txt 未找到，请重新输入以下信息以配置 Lyrify:"
		read -p "OpenAI API Endpoint (Press Enter to use default)" openai_api_endpoint
		read -p "OpenAI API Key: " openai_api_key
		read -p "OpenAI Model: " openai_model
		read -p "Gemini API Endpoint (Press Enter to use default): " gemini_api_endpoint
		read -p "Gemini API Key: " gemini_api_key
		read -p "NIUTRANS Key: " niutrans_key
		read -p "DEEPL_X API URL: " deepl_x_api_url
		read -p "BAIDU_APP_ID: " baidu_app_id
		read -p "BAIDU_KEY: " baidu_key

		cat <<EOL >/tmp/.Lyrify/config.txt
openai_api_endpoint=${openai_api_endpoint:-https://api.openai.com/v1/chat/completions}
openai_api_key=$openai_api_key
openai_model=$openai_model
gemini_api_endpoint=${gemini_api_endpoint:-https://generativelanguage.googleapis.com}
gemini_api_key=$gemini_api_key
niutrans_key=$niutrans_key
deepl_x_api_url=$deepl_x_api_url
baidu_app_id=$baidu_app_id
baidu_key=$baidu_key
EOL
	fi

	info "即将开始下载新版本 Docker 镜像"
	docker pull sipcink/lyrify:online

	info "即将开始替换 Docker 容器"
	docker stop lyrify >/dev/null 2>&1 && docker rm lyrify >/dev/null 2>&1
	docker run -d --name lyrify \
	-p 3000:3000 \
	-e OpenAI_API_ENDPOINT="$openai_api_endpoint" \
	-e OpenAI_API_KEY="$openai_api_key" \
	-e OpenAI_MODEL="$openai_model" \
	-e Gemini_API_ENDPOINT="$gemini_api_endpoint" \
	-e Gemini_API_KEY="$gemini_api_key" \
	-e NIUTRANS_KEY="$niutrans_key" \
	-e DEEPL_X_API_URL="$deepl_x_api_url" \
	-e BAIDU_APP_ID="$baidu_app_id" \
	-e BAIDU_KEY="$baidu_key" \
	sipcink/lyrify:online

	if [ $? -ne 0 ]; then
		abort "替换 Docker 容器失败"
	else
		info "替换 Docker 容器成功"
		# 检查并删除旧镜像
		docker rmi $(docker images | grep "lyrify" | grep "none" | awk '{print $3}')
		if [ $? -ne 0 ]; then
			warn "删除旧镜像失败"
		else
			info "删除旧镜像成功"
		fi
	fi
	info "升级成功"

else
	# 安装
	mkdir -p "/tmp/.Lyrify" || {
		abort "创建安装目录 '/tmp/.Lyrify' 失败"
	}
	info "创建安装目录 '/tmp/.Lyrify' 成功"
	cd "/tmp/.Lyrify"

	info "请输入以下信息以配置 Lyrify:"
	read -p "OpenAI API Endpoint (Press Enter to use default): " openai_api_endpoint
	read -p "OpenAI API Key: " openai_api_key
	read -p "OpenAI Model: " openai_model
	read -p "Gemini API Endpoint (Press Enter to use default): " gemini_api_endpoint
	read -p "Gemini API Key: " gemini_api_key
	read -p "NIUTRANS Key: " niutrans_key
	read -p "DEEPL_X API URL: " deepl_x_api_url
	read -p "BAIDU_APP_ID: " baidu_app_id
	read -p "BAIDU_KEY: " baidu_key

	cat <<EOL >config.txt
openai_api_endpoint=${openai_api_endpoint:-https://api.openai.com/v1/chat/completions}
openai_api_key=$openai_api_key
openai_model=$openai_model
gemini_api_endpoint=${gemini_api_endpoint:-https://generativelanguage.googleapis.com}
gemini_api_key=$gemini_api_key
niutrans_key=$niutrans_key
deepl_x_api_url=$deepl_x_api_url
baidu_app_id=$baidu_app_id
baidu_key=$baidu_key
EOL

	docker run -d --name lyrify \
	-p 3000:3000 \
	-e OpenAI_API_ENDPOINT="$openai_api_endpoint" \
	-e OpenAI_API_KEY="$openai_api_key" \
	-e OpenAI_MODEL="$openai_model" \
	-e Gemini_API_ENDPOINT="$gemini_api_endpoint" \
	-e Gemini_API_KEY="$gemini_api_key" \
	-e NIUTRANS_KEY="$niutrans_key" \
	-e DEEPL_X_API_URL="$deepl_x_api_url" \
	-e BAIDU_APP_ID="$baidu_app_id" \
	-e BAIDU_KEY="$baidu_key" \
	sipcink/lyrify:online

	if [ $? -ne "0" ]; then
		abort "启动 Docker 容器失败"
	fi

	warning "Lyrify 安装成功，请访问以下地址访问"
	warning "https://0.0.0.0:3000/"
fi
