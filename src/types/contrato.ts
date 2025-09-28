export type Contrato = {
  banco: string;
  valorTotalFinanciamento: number;
  dataPagamento: string;
  valorParcela: number;
  parcelaAtual: number;
  totalParcelas: number;
  status: string;
  valorFinalEntrada: number;
  descricaoEntrada: string;
  usuarioId: string;
  veiculoId: number;
};
