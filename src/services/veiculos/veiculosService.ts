import { CreateVeiculoResponse, VeiculoFormValues } from "@/types/veiculo";
import { api } from "../api";

export async function getVeiculos(): Promise<VeiculoFormValues[]> {
  const { data } = await api.get("/veiculos");
  return data;
}

export async function getVeiculoById(id: string): Promise<VeiculoFormValues> {
  const { data } = await api.get(`/veiculos/${id}`);
  return data;
}

export async function createVeiculo(veiculo: Partial<VeiculoFormValues>): Promise<CreateVeiculoResponse> {
  const { data } = await api.post("/veiculos", veiculo);
  return data;
}

export async function updateVeiculo(id: string, veiculo: Partial<VeiculoFormValues>): Promise<VeiculoFormValues> {
  const { data } = await api.put(`/veiculos/${id}`, veiculo);
  return data;
}

export async function deleteVeiculo(id: string): Promise<void> {
  await api.delete(`/veiculos/${id}`);
}
