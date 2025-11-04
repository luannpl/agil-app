import { updateValorParcelaAtrasada } from "@/services/pagamentos/pagamentoService";
import { ParcelaAtualizada } from "@/types/pagamento";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useUpdateValorParcelaAtrasada() {
  const queryClient = useQueryClient();
  return useMutation<ParcelaAtualizada, AxiosError, string>({
    mutationFn: (parcelaId: string) => updateValorParcelaAtrasada(parcelaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parcelas"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar o valor da parcela atrasada:", error);
    },
  });
}
