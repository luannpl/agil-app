"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Selecione...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter((item) => item !== value));
  };

  const selectedOptions = options.filter((option) =>
    selected.includes(option.value)
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between text-left font-normal h-9",
            "focus-visible:ring-yellow-500 focus-visible:border-yellow-500 focus-visible:ring-[3px]",
            !selected.length && "text-muted-foreground",
            className
          )}
        >
          <div className="flex flex-wrap gap-1 max-w-[150px]">
            {selected.length === 0 && placeholder}
            {selected.length === 1 && selectedOptions[0]?.label}
            {selected.length > 1 && `${selected.length} selecionados`}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="max-h-60 overflow-auto">
          {selected.length > 0 && (
            <div className="px-2 py-2 border-b">
              <div className="flex flex-wrap gap-1">
                {selectedOptions.map((option) => (
                  <div
                    key={option.value}
                    className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-xs"
                  >
                    {option.label}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(option.value);
                      }}
                      className="ml-1 hover:bg-yellow-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="p-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 px-2 py-2 hover:bg-accent cursor-pointer rounded-sm"
                onClick={() => handleSelect(option.value)}
              >
                <div className="flex items-center justify-center w-4 h-4 border border-gray-300 rounded-sm bg-white">
                  {selected.includes(option.value) && (
                    <Check className="h-3 w-3 text-yellow-500" />
                  )}
                </div>
                <span className="text-sm">{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
