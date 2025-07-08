export type Veiculo = {
    id: string;
    modelo: string;
    ano: number;
    placa: string;
    valor: number;
    vendido: boolean;
};
export type VeiculoFormValues = {
    nome: string;
    modelo: string;
    ano: string;
    placa: string;
    valor: string;
    cor: string;
    tipo: "carro" | "moto" | "caminhao";
};

export type CreateVeiculoResponse = {
    message: string;
};