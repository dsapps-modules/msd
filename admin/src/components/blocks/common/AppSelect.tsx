"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname } from "next/navigation";

interface SelectGroupData {
  label?: any;
  value?: any;
}
interface AppSelectProps {
  value: any;
  hideNone?: any;
  customClass?: string;
  placeholder?: string;
  disabled?: boolean;
  groups: SelectGroupData[];
  onSelect: (value: any) => void;
  onOpenChange?: (open: boolean) => void;
}

export const AppSelect: React.FC<AppSelectProps> = ({
  placeholder = "Select item",
  value,
  groups,
  onSelect,
  customClass,
  hideNone,
  onOpenChange,
  disabled = false,
}) => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
  const dir = locale === "ar" ? "rtl" : "ltr";

  const getSelectedLabel = (value: any) => {
    if (value == "none") return placeholder;
    const selectedOption = groups?.find(
      (item) => String(item.value) === String(value)
    ); // Convert both to strings
    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <Select dir={dir} value={value} onValueChange={onSelect} 
    onOpenChange={onOpenChange}
    >
      <SelectTrigger
        className={`${
          disabled
            ? ""
            : "ring ring-transparent focus:ring-transparent ring-offset-0 app-input"
        }  ${customClass}`}
        disabled={disabled}
      >
        <SelectValue placeholder={placeholder}>
          {getSelectedLabel(value || "")}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {!hideNone && <SelectItem value="none">None</SelectItem>}

        {groups?.map((option, optionIndex) => (
          <SelectItem key={optionIndex} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
