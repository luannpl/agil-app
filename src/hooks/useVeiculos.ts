// src/hooks/useVeiculos.ts
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  getVeiculos,
  getVeiculoById,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
  getVeiculosDestaques,
  buscarVeiculoPorPlaca,
} from "@/services/veiculos/veiculosService";
import { CreateVeiculoResponse, Veiculo } from "@/types/veiculo";
import { AxiosError } from "axios";

// GET todos os veículos
export function useVeiculos() {
  return useQuery<Veiculo[]>({
    queryKey: ["veiculos"],
    queryFn: getVeiculos,
  });
}

// GET um veículo por ID
export function useVeiculo(
  id: string | undefined
): UseQueryResult<Veiculo, AxiosError> {
  return useQuery<Veiculo, AxiosError>({
    queryKey: ["veiculo", id],
    queryFn: () => getVeiculoById(id!),
    enabled: !!id,
    retry: (failureCount, error) => {
      if (error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
}

export function useVeiculosDestaques() {
  return useQuery<Veiculo[]>({
    queryKey: ["veiculosDestaques"],
    queryFn: getVeiculosDestaques,
  });
}

// POST novo veículo
export function useCreateVeiculo() {
  const queryClient = useQueryClient();

  return useMutation<CreateVeiculoResponse, AxiosError, FormData>({
    mutationFn: createVeiculo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["veiculos"] });
    },
  });
}

export function useBuscarVeiculoPorPlaca() {
  const queryClient = useQueryClient();
  return useMutation<Veiculo | null, AxiosError, string>({
    mutationFn: buscarVeiculoPorPlaca,
    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(["veiculo", data.id], data);
      } else {
        queryClient.removeQueries({ queryKey: ["veiculo"] });
      }
    },
    onError: (error) => {
      console.error("Erro ao buscar veículo por placa:", error);
    },
  });
}

// PUT atualizar veículo
export function useUpdateVeiculo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Veiculo> }) =>
      updateVeiculo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["veiculos"] });
    },
  });
}

// DELETE veículo
export function useDeleteVeiculo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVeiculo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["veiculos"] });
    },
  });
}
