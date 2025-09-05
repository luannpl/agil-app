import { createContato, getContatos } from "@/services/contato/contatoService";
import { Contato } from "@/types/contato";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateContato() {
  const queryClient = useQueryClient();

  return useMutation<Contato, AxiosError, Contato>({
    mutationFn: createContato,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contatos"] });
    },
  });
}

export function useContatos() {
  return useQuery<Contato[]>({
    queryKey: ["contatos"],
    queryFn: getContatos,
  });
}
