import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Check, Copy, Loader2 } from "lucide-react";
import { TranslateResult } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { copyClipboard } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export type ResultBoxProps = {
  name: string;
  loading: boolean;
  content: string;
};

export function ResultBox({ name, loading, content }: ResultBoxProps) {
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
            <p className={`break-all`}>{content}</p>
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
  loading: boolean;
  result: TranslateResult;
};

export function ResultContainer({ loading, result }: ResultContainerProps) {
  return (
    <div className={`result-container grid-cols-3 grid gap-4`}>
      <ResultBox loading={loading} name="ChatGPT" content={result.chatgpt} />
      <ResultBox loading={loading} name="Gemini" content={result.gemini} />
      <ResultBox loading={loading} name="DeepLX" content={result.deeplx} />
      <ResultBox loading={loading} name="Microsoft" content={result.microsoft} />
      <ResultBox loading={loading} name="Google" content={result.google} />
      <ResultBox loading={loading} name="Transmart" content={result.transmart} />
      <ResultBox loading={loading} name="Niutrans" content={result.niutrans} />
      <ResultBox loading={loading} name="M2m100" content={result.m2m100} />
    </div>
  );
}
