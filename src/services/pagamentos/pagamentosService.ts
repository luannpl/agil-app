// import { api } from "../api";
import { Pagamento } from "@/types/pagamento";

// Simulação de um banco de dados em memória para pagamentos
const pagamentosDB: Pagamento[] = [];

export async function listarPagamentosPorContrato(
  contratoId: string
): Promise<Pagamento[]> {
  console.log(`Buscando pagamentos para o contrato: ${contratoId}`);
  // Em um app real, seria: const { data } = await api.get(`/contratos/${contratoId}/pagamentos`);
  const pagamentos = pagamentosDB.filter((p) => p.contratoId === contratoId);
  return Promise.resolve(pagamentos);
}

export async function criarPagamento(
  pagamento: Omit<Pagamento, "id" | "status">
): Promise<Pagamento> {
  console.log("Criando novo pagamento:", pagamento);
  // Em um app real, seria: const { data } = await api.post('/pagamentos', pagamento);
  const novoPagamento: Pagamento = {
    id: new Date().toISOString(), // ID único
    ...pagamento,
    status: "pago",
  };
  pagamentosDB.push(novoPagamento);
  return Promise.resolve(novoPagamento);
}
