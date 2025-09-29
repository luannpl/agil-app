export type Pagamento = {
  id?: string;
  contratoId: string;
  numeroParcela: number;
  dataPagamento: string;
  valorPago: number;
  status: "pago" | "pendente";
};
