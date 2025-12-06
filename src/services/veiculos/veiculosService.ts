import { CreateVeiculoResponse, Veiculo } from "@/types/veiculo";
import { api } from "../api";
import { AxiosError } from "axios";

export async function getVeiculos(): Promise<Veiculo[]> {
  const { data } = await api.get("/veiculos");
  return data;
}

export async function getVeiculosDisponiveis(): Promise<Veiculo[]> {
  const { data } = await api.get("/veiculos/disponiveis");
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
  console.log(veiculo.getAll("imagens"));
  const { data } = await api.post("/veiculos", veiculo, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function buscarVeiculoPorPlaca(
  placa: string
): Promise<Veiculo | null> {
  try {
    const { data } = await api.post("/veiculos/placa/", { placa });
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function updateVeiculo(
  id: string,
  veiculo: Partial<Veiculo>
): Promise<Veiculo> {
  const { data } = await api.put(`/veiculos/${id}`, veiculo);
  return data;
}

export async function deleteVeiculo(id: string): Promise<void> {
  await api.delete(`/veiculos/${id}`);
}
