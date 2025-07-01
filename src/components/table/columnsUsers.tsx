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

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  valor: number;
};

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "valor",
    header: "Valor",
    cell: ({ row }) => {
      const usuario = row.original;

      return (
        <div className="flex items-center justify-between w-full">
          <span>{usuario.valor.toFixed(2)}</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/usuarios/detalhes/${usuario.id}`}>
                  Ver detalhes
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert(`Excluindo ${usuario.nome}`)}
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
