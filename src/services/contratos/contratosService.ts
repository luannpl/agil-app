import { Contrato, Parcela } from "@/types/contrato";
import { api } from "../api";

export async function criarContrato(data: Contrato): Promise<Contrato> {
  const { data: contrato } = await api.post("/contratos", data);
  return contrato;
}

export async function listarContratos(): Promise<Contrato[]> {
  const { data } = await api.get("/contratos");
  return data;
}

export async function getContratoById(id: string): Promise<Contrato> {
  const { data } = await api.get(`/contratos/${id}`);
  return data;
}

export async function updateContrato(
  id: string,
  data: Partial<Contrato>
): Promise<Contrato> {
  const { data: contrato } = await api.patch(`/contratos/${id}`, data);
  return contrato;
}

export async function listarParcelas(contratoId: string): Promise<Parcela[]> {
  const { data } = await api.get(`/contratos/${contratoId}/pagamentos`);
  return data;
}

export async function updateStatusParcela(
  contratoId: string,
  parcelaId: string,
  status: string
): Promise<Parcela> {
  const { data } = await api.patch(
    `/contratos/${contratoId}/pagamentos/${parcelaId}/status`,
    { status }
  );
  return data;
}
