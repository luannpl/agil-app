import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // base do input
        "file:text-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        // fundo e borda igual ao switch container
        "bg-muted/20 border border-input",
        // foco customizado
        "focus-visible:ring-yellow-500 focus-visible:border-yellow-500 focus-visible:ring-[3px]",
        // erro / inválido
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // seleção
        "selection:bg-gray-300 selection:text-gray-900 dark:selection:bg-gray-800 dark:selection:text-gray-100",
        className
      )}
      {...props}
    />
  );
}

export { Input };
