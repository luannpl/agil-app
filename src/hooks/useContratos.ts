import {
  criarContrato,
  listarContratos,
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
