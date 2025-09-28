import { ClienteResponse } from "./usuario";
import { Veiculo } from "./veiculo";

export type Contrato = {
  id?: string;
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
  usuario?: ClienteResponse;
  veiculo?: Veiculo;
};
