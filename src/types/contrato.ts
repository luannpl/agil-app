import { Pagamento } from "./pagamento";
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

export type DadosContrato = {
  compradorNome: string;
  compradorCPF: string;
  compradorRG: string;
  compradorNacionalidade: string;
  compradorEstadoCivil: string;
  compradorProfissao: string;
  compradorEndereco: string;
  compradorEnderecoNumero: string;
  compradorCEP: string;
  compradorBairro: string;
  compradorCidade: string;
  compradorEstado: string;
  veiculoMarca: string;
  veiculoModelo: string;
  veiculoAno: number;
  veiculoPlaca: string;
  veiculoRenavam: string;
  veiculoCor: string;
  veiculoQuilometragem: number;
  avista: boolean;
  parcelado: boolean;
  entradaDescricao: string;
  totalParcelas: number;
  valorParcela: string;
  valorEntrada: string;
  valorTotal: string;
  dataContrato: string;
  sinal: string;
};

export type Parcela = {
  contrato: Contrato;
  pagamentos: Pagamento[];
};
