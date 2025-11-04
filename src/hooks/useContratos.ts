import {
  criarContrato,
  deleteContrato,
  getContratoById,
  listarContratos,
  listarParcelas,
  updateContrato,
  updateStatusParcela,
} from "@/services/contratos/contratosService";
import { Contrato, Parcela } from "@/types/contrato";
import { Pagamento } from "@/types/pagamento";
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

export function useDeleteContrato() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: deleteContrato,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contratos"] });
    },
  });
}

export function useParcelas(contratoId: string | undefined) {
  return useQuery<Parcela, AxiosError>({
    queryKey: ["parcelas", contratoId],
    queryFn: () => listarParcelas(contratoId!),
    enabled: !!contratoId,
  });
}

export function useUpdateStatusParcela(contratoId: string) {
  const queryClient = useQueryClient();

  return useMutation<
    Pagamento, // retorno da API (um único pagamento atualizado)
    AxiosError,
    { parcelaId: string; status: string } // parâmetros esperados
  >({
    mutationFn: ({ parcelaId, status }) =>
      updateStatusParcela(contratoId, parcelaId, status),

    onSuccess: (data) => {
      // Atualiza o cache local do contrato
      queryClient.setQueryData<Parcela>(["parcelas", contratoId], (old) => {
        if (!old) return old;

        const updated = {
          ...old,
          pagamentos: old.pagamentos.map((p) => (p.id === data.id ? data : p)),
        };

        return updated;
      });
    },

    onError: (error) => {
      console.error("Erro ao atualizar status da parcela:", error);
    },
  });
}
