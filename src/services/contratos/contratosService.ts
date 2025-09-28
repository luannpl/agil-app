import { Contrato } from "@/types/contrato";
import { api } from "../api";

export async function criarContrato(data: Contrato): Promise<Contrato> {
  const { data: contrato } = await api.post("/contratos", data);
  return contrato;
}

export async function listarContratos(): Promise<Contrato[]> {
  const { data } = await api.get("/contratos");
  return data;
}
