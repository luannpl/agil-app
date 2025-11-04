export type Pagamento = {
  id?: string;
  contratoId: string;
  numeroParcela: number;
  dataVencimento?: string;
  dataPagamento?: string;
  valorPago?: number;
  valorParcela?: number;
  valorParcelaInicial?: number;
  status: "pago" | "pendente" | "PAGO" | "PENDENTE" | "ATRASADO";
  createdAt?: string;
  updatedAt?: string;
};
