import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/lib/constant";

type LanguageSelectProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  acceptAuto?: boolean;
};

export default function ({
  placeholder,
  value,
  acceptAuto,
  onChange,
}: LanguageSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {acceptAuto && <SelectItem value={"auto"}>Auto Detect</SelectItem>}
        {languages.map((language, index) => (
          <SelectItem key={index} value={language.key}>
            {language.value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
