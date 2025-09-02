import {
  CreateVeiculoResponse,
  Veiculo,
  VeiculoFormValues,
} from "@/types/veiculo";
import { api } from "../api";

export async function getVeiculos(): Promise<Veiculo[]> {
  const { data } = await api.get("/veiculos");
  return data;
}

export async function getVeiculosDestaques(): Promise<Veiculo[]> {
  const { data } = await api.get("/veiculos/destaques");
  return data;
}

export async function getVeiculoById(id: string): Promise<Veiculo> {
  const { data } = await api.get(`/veiculos/${id}`);
  return data;
}

export async function createVeiculo(
  veiculo: FormData
): Promise<CreateVeiculoResponse> {
  console.log(veiculo.get("imagem"));
  const { data } = await api.post("/veiculos", veiculo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateVeiculo(
  id: string,
  veiculo: Partial<VeiculoFormValues>
): Promise<VeiculoFormValues> {
  const { data } = await api.put(`/veiculos/${id}`, veiculo);
  return data;
}

export async function deleteVeiculo(id: string): Promise<void> {
  await api.delete(`/veiculos/${id}`);
}
