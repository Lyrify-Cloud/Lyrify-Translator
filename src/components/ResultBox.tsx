import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Check, Copy, Loader2 } from "lucide-react";
import { TranslateResult, Translateloader } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { copyClipboard } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Sortable from 'sortablejs'; 

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

  const formattedContent = content.replace(/\n/g, '<br>');

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
            <p className={`keep-all`} dangerouslySetInnerHTML={{ __html: formattedContent }} />
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

export function ResultContainer({ loading, result, isExpanded}: ResultContainerProps) {
  useEffect(() => {
      const container = document.querySelector('.result-container') as HTMLElement;
      if (container) {
          Sortable.create(container, {
              animation: 150,
              ghostClass: 'sortable-ghost',
              store: {
                  get: () => {
                      const storedOrder = localStorage.getItem('resultBoxOrder');
                      return storedOrder ? JSON.parse(storedOrder) : [];
                  },
                  set: (sortable:any) => {
                      const order = sortable.toArray();
                      localStorage.setItem('resultBoxOrder', JSON.stringify(order));
                  },
              },
          });
      }
  }, [isExpanded]); 

  return ( 
       <div className={`result-container ${isExpanded ? 'grid-cols-4' : 'grid-cols-3'} grid gap-4`}>
          <ResultBox data-name="ChatGPT" loading={loading.chatgpt} name="ChatGPT" content={result.chatgpt} />
          <ResultBox data-name="Gemini" loading={loading.gemini} name="Gemini" content={result.gemini} />
          <ResultBox data-name="DeepLX" loading={loading.deeplx} name="DeepL X" content={result.deeplx} />
          <ResultBox data-name="Microsoft" loading={loading.microsoft} name="Microsoft" content={result.microsoft} />
          <ResultBox data-name="Google" loading={loading.google} name="Google" content={result.google} />
          <ResultBox data-name="Transmart" loading={loading.transmart} name="Transmart" content={result.transmart} />
          <ResultBox data-name="Niutrans" loading={loading.niutrans} name="Niutrans" content={result.niutrans} />
          <ResultBox data-name="Baidu" loading={loading.baidu} name="Baidu" content={result.baidu} />
       </div>
  );
}
export function getResult() {return ['chatgpt', 'gemini', 'deeplx', 'microsoft', 'google', 'transmart', 'niutrans', 'baidu']}