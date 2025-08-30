import {
  createUsuario,
  getUsuarios,
  login,
  logout,
} from "@/services/usuarios/usuarioService";
import {
  LoginResponse,
  LoginForm,
  CreateUsuarioDTO,
  UsuarioResponse,
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

export function useCreateUsuario() {
  const queryClient = useQueryClient();

  return useMutation<UsuarioResponse, AxiosError, CreateUsuarioDTO>({
    mutationFn: createUsuario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
    },
  });
}

export function useUsuarios() {
  return useQuery<UsuarioResponse[]>({
    queryKey: ["usuarios"],
    queryFn: getUsuarios,
  });
}
