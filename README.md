<h1 style="text-align: center;">Lyrify - 聚合翻译</h1>

Lyrify 是一个聚合翻译网站，旨在结合多种翻译服务，包括 ChatGPT、DeeplX、Microsoft、Google、Niutrans 和 M2m100，提供全面的多语言翻译功能。

### 特性

- 聚合多种翻译服务：使用 ChatGPT、Gemini、DeeplX、Microsoft、Google、Niutrans 和 M2m100，从而获得更全面的翻译结果。
- 简单易用：用户友好的界面，使用户能够轻松输入和获取翻译结果。
- 多语言支持：覆盖多种语言，支持用户在不同语言之间进行翻译。
- 轻量部署：基于 Nextjs 构建，支持 Docker 等部署方式。

### 运行

```shell
git clone https://github.com/SIPC/lyrify # clone project
cd lyrify

npm install # install dependencies (pnpm recommend)
npm run dev --turbo #  start dev server
```

### 配置

创建 `.env` 文件并在文件中配置你的 API 密钥和代理设置，具体详见 `.env.example`。

### 部署

```shell
npm run build # build project
npm run start # start deploy server
```

### Docker 部署

```shell
docker run -d --name lyrify \
  -p 3000:3000 \
  -e OpenAI_API_KEY='sk-...' \
  -e OpenAI_API_ENDPOINT='https://api.openai.com/v1/chat/completions' \
  -e OpenAI_MODEL='gpt-3.5-turbo' \
  -e NIUTRANS_KEY='...' \
  -e DEEPL_X_API_URL='...' \
  sipcink/lyrify:latest
```

> Github Workflow 自动打包
> 
> 在 Action Secret 中配置 `DOCKERHUB_USERNAME` `DOCKERHUB_TOKEN` 参数


### 贡献

如果你发现了问题或有改进建议，请在 [Issues](https://github.com/SIPC/lyrify/issues) 中提出。我们欢迎并感谢你的贡献！


## Star History

<a href="https://star-history.com/#SIPC/Lyrify&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=SIPC/Lyrify&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=SIPC/Lyrify&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=SIPC/Lyrify&type=Date" />
  </picture>
</a>

