import {
  criarContrato,
  getContratoById,
  listarContratos,
  listarParcelas,
  updateContrato,
  updateStatusParcela,
} from "@/services/contratos/contratosService";
import { Contrato, Parcela } from "@/types/contrato";
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

  return useMutation<Contrato, AxiosError, Partial<Contrato>>({
    mutationFn: (data) => updateContrato(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contratos"] });
      queryClient.invalidateQueries({ queryKey: ["contrato", id] });
    },
  });
}

export function useParcelas(contratoId: string | undefined) {
  return useQuery<Parcela[], AxiosError>({
    queryKey: ["parcelas", contratoId],
    queryFn: () => listarParcelas(contratoId!),
    enabled: !!contratoId,
  });
}

export function useUpdateStatusParcela(contratoId: string) {
  const queryClient = useQueryClient();

  return useMutation<
    Parcela,
    AxiosError,
    { parcelaId: string; status: string }
  >({
    mutationFn: ({ parcelaId, status }) =>
      updateStatusParcela(contratoId, parcelaId, status),

    onSuccess: (data) => {
      queryClient.setQueryData(
        ["parcelas", contratoId],
        (old: Parcela[] | undefined) =>
          old?.map((p) => (p.id === data.id ? data : p))
      );
    },

    onError: (error) => {
      console.error("Erro ao atualizar status da parcela:", error);
    },
  });
}
