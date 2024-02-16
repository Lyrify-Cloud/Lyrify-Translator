import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useMemo, useEffect,useState } from "react";
import autosize from "autosize";

type InputContentProps = {
  content: string;
  setContent: (value: string) => void;
};

export default function ({ content, setContent }: InputContentProps) {
  const chars = useMemo(() => content.length, [content]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    autosize(document.querySelectorAll("textarea"));
  }, []);

  return (
    <div className={`w-full h-max relative`}>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={`hide-scrollbar w-full resize-none`}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      <button
        className="absolute top-2 right-2 text-gray-500"
        onClick={() => setContent("")}
      >
        <X size="16" />
      </button>
      <p
        className={`absolute bottom-0 right-2 text-sm text-gray-400 ${show ? "opacity-1" : "opacity-0"}`}
      >
        {chars}
      </p>
    </div>
  );
}
