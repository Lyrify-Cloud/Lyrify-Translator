import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { TranslateResult } from "@/lib/api";

export type ResultBoxProps = {
  name: string;
  loading: boolean;
  content: string;
};

export function ResultBox({ name, loading, content }: ResultBoxProps) {
  return (
    <Card>
      <CardTitle
        className={`text-sm select-none translate-y-[-0.5rem] translate-x-[0.5rem]`}
      >
        {name}
      </CardTitle>
      <CardContent className={`flex flex-col min-h-[120px]`}>
        {loading ? (
          <div
            className={`loader-box flex flex-row items-center justify-center my-auto`}
          >
            <Loader2 className={`h-4 w-4 mr-1 animate-spin`} />
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <p>{content}</p>
          </div>
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
      <ResultBox loading={loading} name="DeepL X" content={result.deeplx} />
      <ResultBox
        loading={loading}
        name="Microsoft"
        content={result.microsoft}
      />
      <ResultBox loading={loading} name="Google" content={result.google} />
      <ResultBox
        loading={loading}
        name={"Niutrans"}
        content={result.niutrans}
      />
      <ResultBox loading={loading} name="M2m100" content={result.m2m100} />
    </div>
  );
}
