import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Check, Copy, Loader2 } from "lucide-react";
import { TranslateResult, Translateloader } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { copyClipboard } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";

export type ResultBoxProps = {
  name: string;
  loading: boolean;
  content: string;
};

export function ResultBox({ name, loading, content }: ResultBoxProps) {
  content = content.replace("<start>", "");
  content = content.replace("</end>", "");
  const task = useRef<NodeJS.Timeout | undefined>(undefined);
  const [copied, setCopied] = useState<boolean>(false);
  useEffect(() => {
    setCopied(false);
  }, [content]);

  useEffect(() => {
    if (!copied) return;

    clearTimeout(task.current);
    task.current = setTimeout(() => setCopied(false), 250);
  }, [copied]);

  const formattedContent = content?.replace(/\n/g, "<br>");

  return (
    <Card>
      <CardTitle
        className={`text-sm select-none translate-y-[-0.5rem] translate-x-[0.5rem] bg-background w-max px-1`}
      >
        {name}
      </CardTitle>
      <CardContent className={`flex flex-col min-h-[120px] h-full`}>
        {loading ? (
          <div
            className={`loader-box flex flex-row items-center justify-center my-auto`}
          >
            <Loader2 className={`h-4 w-4 mr-1 animate-spin`} />
          </div>
        ) : (
          <div>
            <p
              className={`keep-all`}
              dangerouslySetInnerHTML={{ __html: formattedContent }}
            />
          </div>
        )}

        {!loading && content && content.length > 0 && (
          <>
            <div className={`flex-grow`} />
            <div className={`result-action mt-2 mb-4 flex flex-row`}>
              <Button
                className={`ml-auto`}
                size={`icon`}
                variant={`outline`}
                onClick={async () => {
                  await copyClipboard(content);
                  setCopied(true);
                }}
              >
                {copied ? (
                  <Check className={`h-4 w-4`} />
                ) : (
                  <Copy className={`h-4 w-4`} />
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export type ResultContainerProps = {
  loading: Translateloader;
  result: TranslateResult;
  isExpanded: boolean;
};

export function ResultContainer({
  loading,
  result,
  isExpanded,
}: ResultContainerProps) {
  useEffect(() => {
    const version = "1.2";
    const localVersion = localStorage.getItem("version");
    if (version !== localVersion) {
      const keys = Object.keys(localStorage);
      const filteredKeys = keys.filter((key) => key !== "theme");
      filteredKeys.forEach((key) => localStorage.removeItem(key));
    }
    localStorage.setItem("version", version);

    const container = document.querySelector(
      ".result-container",
    ) as HTMLElement;
    if (container) {
      Sortable.create(container, {
        animation: 150,
        ghostClass: "sortable-ghost",
        store: {
          get: () => {
            const storedOrder = localStorage.getItem("resultBoxOrder");
            return storedOrder ? JSON.parse(storedOrder) : [];
          },
          set: (sortable: any) => {
            const order = sortable.toArray();
            localStorage.setItem("resultBoxOrder", JSON.stringify(order));
          },
        },
      });
    }
  }, [isExpanded]);

  return (
    <div
      className={`result-container ${isExpanded ? "grid-cols-4" : "grid-cols-3"} grid gap-4`}
    >
      <ResultBox
        name="ChatGPT 3.5"
        loading={loading.chatgpt}
        content={result.chatgpt}
      />
      {/* <ResultBox
        name="ChatGPT 4"
        loading={loading.chatgpt4}
        content={result.chatgpt4}
      /> */}
      <ResultBox
        name="Gemini Pro"
        loading={loading.gemini}
        content={result.gemini}
      />
      {/* <ResultBox 
        name="Claude 3 Sonnet"
        loading={loading.claude}
        content={result.claude}
      /> */}
      <ResultBox
        name="Qwen Turbo"
        loading={loading.qwen}
        content={result.qwen}
      />
      <ResultBox 
        name="GLM 3 Turbo"
        loading={loading.glm}
        content={result.glm}
      />
      <ResultBox
        name="DeepL X"
        loading={loading.deeplx}
        content={result.deeplx}
      />
      <ResultBox
        name="Microsoft"
        loading={loading.microsoft}
        content={result.microsoft}
      />
      <ResultBox
        name="Google"
        loading={loading.google}
        content={result.google}
      />
      <ResultBox
        name="Transmart"
        loading={loading.transmart}
        content={result.transmart}
      />
      <ResultBox
        name="Niutrans"
        loading={loading.niutrans}
        content={result.niutrans}
      />
      <ResultBox
        name="Baidu"
        loading={loading.baidu}
        content={result.baidu}
      />
    </div>
  );
}
export function getResult() {
  return [
    "chatgpt",
    // "chatgpt4",
    "gemini",
    // "claude",
    "qwen",
    "glm",
    "deeplx",
    "microsoft",
    "google",
    "transmart",
    "niutrans",
    "baidu",
  ];
}
