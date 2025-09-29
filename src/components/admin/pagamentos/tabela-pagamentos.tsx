"use client";

import React from "react";
import { Contrato } from "@/types/contrato";
import {
  usePagamentosPorContrato,
  useCreatePagamento,
} from "@/hooks/usePagamentos";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { formatarPreco } from "@/utils/formatarPreco";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle } from "lucide-react";

interface TabelaPagamentosProps {
  contrato: Contrato;
}

export function TabelaPagamentos({ contrato }: TabelaPagamentosProps) {
  const {
    data: pagamentos,
    isLoading,
    isError,
  } = usePagamentosPorContrato(contrato.id!);
  const { mutate: criarPagamento, isPending } = useCreatePagamento();

  const handleMarcarComoPago = (numeroParcela: number) => {
    toast.info(`Registrando pagamento para a parcela ${numeroParcela}...`);
    criarPagamento(
      {
        contratoId: contrato.id!,
        numeroParcela,
        valorPago: contrato.valorParcela,
        dataPagamento: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success(`Parcela ${numeroParcela} paga com sucesso!`);
        },
        onError: () => {
          toast.error("Erro ao registrar pagamento.");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center p-8">
        Erro ao carregar os pagamentos.
      </div>
    );
  }

  const todasAsParcelas = Array.from(
    { length: contrato.totalParcelas },
    (_, i) => i + 1
  );

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm mt-6">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Histórico de Pagamentos</h3>
      </div>
      <div className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Parcela</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {todasAsParcelas.map((numeroParcela) => {
              const pagamento = pagamentos?.find(
                (p) => p.numeroParcela === numeroParcela
              );
              const isPago = !!pagamento;

              return (
                <TableRow key={numeroParcela}>
                  <TableCell className="font-medium">{numeroParcela}</TableCell>
                  <TableCell>{formatarPreco(contrato.valorParcela)}</TableCell>
                  <TableCell>
                    {isPago ? (
                      <Badge variant="pago" className="flex items-center w-fit">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Pago
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pendente</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {!isPago ? (
                      <Button
                        size="sm"
                        onClick={() => handleMarcarComoPago(numeroParcela)}
                        disabled={isPending}
                      >
                        {isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Marcar como Pago"
                        )}
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
