export type DashboardData = {
  totalVeiculosEstoque: number;
  totalEstoqueEmValor: number;
  totalClientes: number;
  totalContratosMes: number;
  ultimasVendas: UltimaVenda[];
  marcasMaisVendidas: MarcaMaisVendida[];
};

export type UltimaVenda = {
  id: string;
  banco: string;
  valorTotalFinanciamento: number;
  dataPagamento: string;
  valorParcela: number;
  parcelaAtual: number;
  totalParcelas: number;
  status: string;
  valorFinalEntrada: number;
  descricaoEntrada: string;
  sinal: string;
  usuarioId: string;
  veiculoId: number;
  createdAt: string;
  updatedAt: string;
  usuario: Usuario;
  veiculo: Veiculo;
};

export type Usuario = {
  id: string;
  nome: string;
};

export type Veiculo = {
  id: number;
  nome: string;
};

export type MarcaMaisVendida = {
  marca: string;
  totalVendidos: number;
};
