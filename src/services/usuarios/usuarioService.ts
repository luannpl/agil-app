import { LoginForm } from "@/types/usuario";
import { api } from "../api";

export async function login(usuario: LoginForm): Promise<{ token: string; usuario: { id: string; nome: string } }> {
  const { data } = await api.post("/usuarios/login", usuario);
  return data;
}