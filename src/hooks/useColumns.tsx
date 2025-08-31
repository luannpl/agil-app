"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

type ColumnOptions = {
  only?: string[];
  exclude?: string[];
};

export function useColumns<T extends Record<string, unknown>>(
  data: T[],
  basePath?: string,
  options?: ColumnOptions
): ColumnDef<T>[] {
  const sample = data[0];
  if (!sample) return [];

  let keys = Object.keys(sample).filter((key) => key !== "id");

  if (options?.only) {
    keys = keys.filter((key) => options.only!.includes(key));
  } else if (options?.exclude) {
    keys = keys.filter((key) => !options.exclude!.includes(key));
  }

  return keys.map((key, index) => {
    const isLast = index === keys.length - 1;

    return {
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
      cell: ({ row }) => {
        const value = row.getValue(key);
        const item = row.original;
        const id = item.id;

        return (
          <div className="flex items-center justify-between w-full">
            <span>
              {value !== null && value !== undefined ? value.toString() : "N/A"}
            </span>

            {isLast && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/${basePath}/detalhes/${id}`}>
                      Ver detalhes
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert(`Excluindo ${id}`)}>
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        );
      },
    } as ColumnDef<T>;
  });
}
