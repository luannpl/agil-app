export type Veiculo = {
  id: string;
  nome: string;
  descricao: string;
  ano: number;
  valor: number;
  quilometragem: number;
  sistema: string;
  localizacao: string;
  imagem: string;
  cor: string;
  marca: string;
  tipo: string;
};
export type VeiculoFormValues = {
  nome: string;
  descricao?: string;
  ano: number;
  marca: string;
  placa: string;
  valor: number;
  quilometragem: number;
  cor: string;
  tipo: "carro" | "moto" | "caminhao";
  imagem?: File;
};

export type CreateVeiculoResponse = {
  message: string;
};

export type CardVeiculosProps = {
  id: string;
  nome: string;
  descricao?: string;
  ano: number;
  valor: number;
  quilometragem: number;
  sistema: string;
  localizacao: string;
  imagem: string;
  cor?: string;
  marca?: string;
  tipo?: string;
};
