import {
  LoginForm,
  CreateUsuarioDTO,
  UsuarioResponse,
  LoginResponse,
} from "@/types/usuario";
import { api } from "../api";

export async function login(usuario: LoginForm): Promise<LoginResponse> {
  const { data } = await api.post("/usuarios/login", usuario);
  return data;
}

export async function createUsuario(
  usuario: CreateUsuarioDTO
): Promise<UsuarioResponse> {
  const { data } = await api.post("/usuarios", usuario);
  return data;
}
