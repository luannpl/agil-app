import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Pagamento } from "@/types/pagamento";
import {
  criarPagamento,
  listarPagamentosPorContrato,
} from "@/services/pagamentos/pagamentosService";

export function usePagamentosPorContrato(contratoId: string) {
  return useQuery<Pagamento[], AxiosError>({ 
    queryKey: ["pagamentos", contratoId],
    queryFn: () => listarPagamentosPorContrato(contratoId),
    enabled: !!contratoId, // A query só será executada se o contratoId existir
  });
}

export function useCreatePagamento() {
  const queryClient = useQueryClient();

  return useMutation<
    Pagamento,
    AxiosError,
    Omit<Pagamento, "id" | "status">
  >({
    mutationFn: criarPagamento,
    onSuccess: (data) => {
      // Invalida a query de pagamentos para buscar a lista atualizada
      queryClient.invalidateQueries({ queryKey: ["pagamentos", data.contratoId] });
      // Também invalida a query do contrato específico para atualizar seu status
      queryClient.invalidateQueries({ queryKey: ["contrato", data.contratoId] });
    },
  });
}
