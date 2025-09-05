import { Contato } from "@/types/contato";
import { api } from "../api";

export async function createContato(contato: Contato): Promise<Contato> {
  const { data } = await api.post("/contatos", contato);
  return data;
}

export async function getContatos(): Promise<Contato[]> {
  const { data } = await api.get("/contatos");
  return data;
}
