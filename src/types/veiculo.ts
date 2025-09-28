import { Usuario } from "./usuario";

export type Veiculo = {
  id: number;
  nome: string;
  descricao: string;
  marca: string;
  ano: number;
  placa: string;
  valor: number;
  cor: string;
  quilometragem: number;
  vendido: boolean;
  tipo: string;
  sistema: string;
  combustivel: string;
  localizacao?: string;
  imagem?: string;
  codigoCRV?: string;
  seguro?: boolean;
  rastreador?: boolean;
  transferido?: boolean;
  regularizado?: boolean;
  valorEntrada?: number;
  valorVenda?: number;
  infoAdicionais?: string;
  usuario: Usuario;
};

export type CreateVeiculoResponse = {
  message: string;
};
