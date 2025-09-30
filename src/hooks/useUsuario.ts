import {
  alterarSenha,
  buscarClientePorCPF,
  createUsuario,
  getFuncionarios,
  getUsuarios,
  login,
  logout,
} from "@/services/usuarios/usuarioService";
import {
  LoginResponse,
  LoginForm,
  CreateUsuarioDTO,
  UsuarioResponse,
  AlterarSenhaForm,
  ClienteResponse,
} from "@/types/usuario";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

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
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
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

export function useFuncionarios() {
  return useQuery<UsuarioResponse[]>({
    queryKey: ["funcionarios"],
    queryFn: getFuncionarios,
  });
}
