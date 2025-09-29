import {
  criarContrato,
  getContratoById,
  listarContratos,
  updateContrato,
} from "@/services/contratos/contratosService";
import { Contrato } from "@/types/contrato";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateContrato() {
  const queryClient = useQueryClient();

  return useMutation<Contrato, AxiosError, Contrato>({
    mutationFn: criarContrato,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contratos"] });
    },
  });
}

export function useContratos() {
  return useQuery<Contrato[]>({ 
    queryKey: ["contratos"],
    queryFn: listarContratos,
  });
}

export function useContratoById(id: string) {
  return useQuery<Contrato, AxiosError>({
    queryKey: ["contrato", id],
    queryFn: () => getContratoById(id),
    enabled: !!id,
  });
}

export function useUpdateContrato(id: string) {
  const queryClient = useQueryClient();

  return useMutation<
    Contrato,
    AxiosError,
    Partial<Contrato>
  >({
    mutationFn: (data) => updateContrato(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contratos"] });
      queryClient.invalidateQueries({ queryKey: ["contrato", id] });
    },
  });
}
