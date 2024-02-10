import { Inter } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRight, Loader2, ScanSearch, Text, MessagesSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import InputContent from "@/components/InputContent";
import { Button } from "@/components/ui/button";
import Github from "@/components/icons/Github";
import Link from "next/link";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageSelect from "@/components/LanguageSelect";
import { Head } from "next/document";
import {
  initializeTranslateState,
  translateContent,
  TranslateResponse,
  TranslateResult,
} from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ResultContainer } from "@/components/ResultBox";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { toast } = useToast();
  const [content, setContent] = useState<string>("");
  const [from, setFrom] = useState<string>("auto");
  const [to, setTo] = useState<string>("zh");

  const [loader, setLoader] = useState<boolean>(false);
  const [result, setResult] = useState<TranslateResult>(
    initializeTranslateState,
  );

  const submit = async () => {
    const text = content.trim();
    if (content.length === 0) return;
    setLoader(true);
    const data = await translateContent(text, from, to);
    if (!data.status) {
      toast({
        title: "Translate Error",
        description: data.message,
      });
    } else {
      setResult(data.data);
    }
    setLoader(false);
  };

  return (
    <>
      <Toaster />
      <main className={cn(inter.className, "py-8 flex flex-col items-center")}>
        <div className={`main-wrapper w-[95vw] m-auto max-w-[950px]`}>
          <Card className={`mb-6`}>
            <CardHeader>
              <CardTitle className={`flex flex-row items-center select-none`}>
                <ScanSearch className={`w-6 h-6 mr-2`} />
                Lyrify
                <ThemeProvider />
                <Button
                  className={`ml-2`}
                  variant={`ghost`}
                  size={`icon`}
                  asChild
                >
                  <Link
                    href={"https://qm.qq.com/q/VNaGrHJAMC"}
                    target={`_blank`}
                  >
                    <MessagesSquare className={`h-5 w-5`} />
                  </Link>
                </Button>
                <Button
                  className={`ml-2`}
                  variant={`ghost`}
                  size={`icon`}
                  asChild
                >
                  <Link
                    href={"https://github.com/SIPC/Lyrify"}
                    target={`_blank`}
                  >
                    <Github className={`h-5 w-5`} />
                  </Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className={`card-content`}>
              <Label className={`card-label`}>
                <Text className={`h-4 w-4`} />
                Content
              </Label>
              <InputContent content={content} setContent={setContent} />
              <div className={`flex flex-row items-center`}>
                <LanguageSelect
                  acceptAuto={true}
                  value={from}
                  onChange={setFrom}
                  placeholder={`Source Language`}
                />
                <ChevronRight className={`shrink-0 w-3 h-3 mx-2`} />
                <LanguageSelect
                  value={to}
                  onChange={setTo}
                  placeholder={`Target Language`}
                />
              </div>
              <div className={`flex flex-row`}>
                <div className={`flex-grow`} />
                <Button className={`mt-2`} variant={`default`} onClick={submit}>
                  {loader && (
                    <Loader2 className={`h-4 w-4 mr-1 animate-spin`} />
                  )}
                  {loader ? "Translating" : "Translate"}
                </Button>
              </div>
            </CardContent>
          </Card>
          <ResultContainer loading={loader} result={result} />
        </div>
      </main>
    </>
  );
}
