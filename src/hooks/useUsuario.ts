import {
  alterarSenha,
  buscarClientePorCPF,
  createUsuario,
  deleteUsuario,
  getFuncionarios,
  getUsuarioById,
  getUsuarios,
  login,
  logout,
  updateUsuario,
} from "@/services/usuarios/usuarioService";
import {
  LoginResponse,
  LoginForm,
  CreateUsuarioDTO,
  UsuarioResponse,
  AlterarSenhaForm,
  ClienteResponse,
} from "@/types/usuario";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAuth } from "@/contexts/AuthContext";

export function useLoginUsuario() {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, AxiosError, LoginForm>({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(["usuario"], data.usuario);
    },
  });
}

export function useLogoutUsuario() {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["usuario"] });
    },
  });
}

export function useAlterarSenha() {
  return useMutation<void, AxiosError, AlterarSenhaForm>({
    mutationFn: alterarSenha,
  });
}

export function useCreateUsuario() {
  const queryClient = useQueryClient();

  return useMutation<UsuarioResponse, AxiosError, CreateUsuarioDTO>({
    mutationFn: createUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuario"] });
    },
  });
}

export function useBuscarClientePorCPF() {
  const queryClient = useQueryClient();
  return useMutation<ClienteResponse | null, AxiosError, string>({
    mutationFn: buscarClientePorCPF,

    onSuccess: (data) => {
      if (data) {
        queryClient.setQueryData(["cliente", data.cpf], data);
      } else {
        console.log("Nenhum cliente encontrado com o CPF informado.");
      }
    },

    onError: (error) => {
      console.error("Ocorreu um erro inesperado ao buscar o cliente:", error);
    },
  });
}

export function useUsuarios() {
  return useQuery<UsuarioResponse[]>({
    queryKey: ["usuarios"],
    queryFn: getUsuarios,
  });
}

export function useUsuarioById(
  id: string | undefined
): UseQueryResult<UsuarioResponse, AxiosError> {
  return useQuery<UsuarioResponse, AxiosError>({
    queryKey: ["usuarioById", id],
    queryFn: () => getUsuarioById(id!),
    enabled: !!id,
    retry: (failureCount, error) => {
      if (error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });
}

export function useFuncionarios() {
  return useQuery<UsuarioResponse[]>({
    queryKey: ["funcionarios"],
    queryFn: getFuncionarios,
  });
}

export function useUpdateUsuario() {
  const queryClient = useQueryClient();
  const { refetchUser } = useAuth();

  return useMutation<UsuarioResponse, AxiosError, Partial<CreateUsuarioDTO>>({
    mutationFn: updateUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      queryClient.invalidateQueries({ queryKey: ["funcionarios"] });
      refetchUser();
    },
  });
}

export function useDeleteUsuario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}
