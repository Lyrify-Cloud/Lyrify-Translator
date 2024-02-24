import { Inter } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Loader2,
  ScanSearch,
  Text,
  MessagesSquare,
  ChevronsLeftRight,
  ChevronsRightLeft,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import InputContent from "@/components/InputContent";
import { Button } from "@/components/ui/button";
import Github from "@/components/icons/Github";
import Link from "next/link";
import ThemeProvider from "@/components/ThemeProvider";
import LanguageSelect from "@/components/LanguageSelect";
import {
  initializeTranslateState,
  initializeTranslateloader,
  translateContent,
  TranslateResult,
  Translateloader,
} from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { ResultContainer, getResult } from "@/components/ResultBox";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { toast } = useToast();
  const [content, setContent] = useState<string>("");
  const [from, setFrom] = useState<string>("auto");
  const [to, setTo] = useState<string>("zh");

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [loader, setLoader] = useState<Translateloader>(initializeTranslateloader);
  const [result, setResult] = useState<TranslateResult>(initializeTranslateState);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const setAllLoader = (value: boolean) => {
    setLoader((loader) => {
      const newLoader: any = { ...loader };
      Object.keys(newLoader).forEach((key) => {
        newLoader[key] = value;
      });
      return newLoader;
    });
  };

  const setResultState = (model: string, value: string) => {
    setLoader((loader) => {
      const newLoader: any = { ...loader };
      newLoader[model] = false;
      return newLoader;
    });
    setResult((loader) => {
      const newLoader: any = { ...loader };
      newLoader[model] = value;
      return newLoader;
    });
  };

  const submit = async () => {
    const text = content.trim();
    let completedPromises = 0;
    if (content.length === 0) return;
    setAllLoader(true);

    const models = getResult();
    const promises = models.map((model) =>
      translateContent(text, from, to, model),
    );
    promises.forEach(async (promise, index) => {
      try {
        const result = await promise;
        const model = models[index];
        const value = result.data;
        if (!result.status) {
          toast({
            title: "Translate Error",
            description: result.message,
          });
        } else {
          setResultState(model, value);
        }
      } finally {
        completedPromises++;
        if (completedPromises === promises.length) {
          setAllLoader(false);
        }
      }
    });
  };

  return (
    <>
      <Toaster />
      <main className={cn(inter.className, "py-8 flex flex-col items-center")}>
        <div
          className={`main-wrapper w-[96vw] ${isExpanded ? "max-w-[96vw]" : "max-w-[900px]"}`}
        >
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
                  onClick={handleClick}
                >
                  {isExpanded ? (
                    <ChevronsRightLeft className={`h-6 w-6`} />
                  ) : (
                    <ChevronsLeftRight className={`h-6 w-6`} />
                  )}
                </Button>
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
                <ChevronRight className={`shrink-0 w-3 h-3 mx-2`}
                  onClick={() => {
                    const temp = from;
                    if (temp != 'auto') {
                      setFrom(to);
                      setTo(temp);
                    }
                  }}
                />
                <LanguageSelect
                  value={to}
                  onChange={setTo}
                  placeholder={`Target Language`}
                />
              </div>
              <div className={`flex flex-row`}>
                <div className={`flex-grow`} />
                <Button
                  className={`mt-2`}
                  variant={`default`}
                  disabled={loader.translate}
                  onClick={submit}
                  data-umami-event={`${from}>${to}`}
                >
                  {loader.translate && (
                    <Loader2 className={`h-4 w-4 mr-1 animate-spin`} />
                  )}
                  {loader.translate ? "Translating" : "Translate"}
                </Button>
              </div>
            </CardContent>
          </Card>
          <ResultContainer
            loading={loader}
            result={result}
            isExpanded={isExpanded}
          />
        </div>
      </main>
    </>
  );
}
