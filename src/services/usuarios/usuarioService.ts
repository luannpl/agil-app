import {
  LoginForm,
  CreateUsuarioDTO,
  UsuarioResponse,
  LoginResponse,
  AlterarSenhaForm,
  ClienteResponse,
} from "@/types/usuario";
import { api } from "../api";

export async function login(usuario: LoginForm): Promise<LoginResponse> {
  const { data } = await api.post("/auth/login", usuario);
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function createUsuario(
  usuario: CreateUsuarioDTO
): Promise<UsuarioResponse> {
  const { data } = await api.post("/usuarios", usuario);
  return data;
}

export async function buscarClientePorCPF(
  cpf: string
): Promise<ClienteResponse> {
  const { data } = await api.post("/usuarios/cliente/", { cpf });
  return data;
}

export async function getUsuarios(): Promise<UsuarioResponse[]> {
  const { data } = await api.get("/usuarios");
  return data;
}

export async function getMe(): Promise<UsuarioResponse> {
  const { data } = await api.get("/usuarios/me");
  return data;
}

export async function getFuncionarios(): Promise<UsuarioResponse[]> {
  const { data } = await api.get("/usuarios/funcionarios");
  return data;
}

// Recebendo 1 argumento (um objeto)
export async function alterarSenha({
  senhaAtual,
  novaSenha,
  confirmarNovaSenha,
}: AlterarSenhaForm): Promise<void> {
  const { data } = await api.patch("/usuarios/alterar-senha", {
    senhaAtual,
    novaSenha,
    confirmarNovaSenha,
  });
  return data;
}
