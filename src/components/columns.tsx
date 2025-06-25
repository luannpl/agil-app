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

export type Veiculo = {
  id: string;
  name: string;
  placa: string;
  valor: number;
};

export const columns: ColumnDef<Veiculo>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nome",
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
              <DropdownMenuItem
                onClick={() => alert(`Editando ${veiculo.name}`)}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert(`Excluindo ${veiculo.name}`)}
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
