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

export type Veiculo = {
  id: string;
  modelo: string;
  ano: number;
  placa: string;
  valor: number;
  vendido: boolean;
};

export const columns: ColumnDef<Veiculo>[] = [
  {
    accessorKey: "modelo",
    header: "Modelo",
  },
  {
    accessorKey: "ano",
    header: "Ano",
  },
  {
    accessorKey: "placa",
    header: "Placa",
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      const veiculo = row.original;

      return (
        <div className="flex items-center justify-between w-full">
          <span>{veiculo.valor.toFixed(2)}</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/veiculos/detalhes/${veiculo.id}`}>
                  Ver detalhes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert(`Excluindo ${veiculo.modelo}`)}
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
