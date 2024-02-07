"use client";

import { Textarea } from "@/components/ui/textarea";
import { useMemo } from "react";

type InputContentProps = {
  content: string;
  setContent: (value: string) => void;
};
export default function ({ content, setContent }: InputContentProps) {
  const lines = useMemo(() => content.split("\n").length, [content]);
  const chars = useMemo(() => content.length, [content]);

  return (
    <div className={`w-full h-max relative`}>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={lines + 1}
        className={`hide-scrollbar w-full resize-none`}
      />
      <p className={`absolute bottom-2 right-2 text-sm text-gray-400`}>
        {chars}
      </p>
    </div>
  );
}
