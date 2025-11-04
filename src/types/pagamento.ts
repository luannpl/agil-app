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

export type ParcelaAtualizada = {
  id: string;
  valorParcela: number;
  valorParcelaInicial: number;
  numeroParcela: number;
  dataVencimento: string;
  status: "PAGO" | "PENDENTE" | "ATRASADO";
  contratoId: string;
  createdAt: string;
  updatedAt: string;
  multa: string;
  juros: string;
  diasAtraso: number;
  valorAtualizado: string;
};
