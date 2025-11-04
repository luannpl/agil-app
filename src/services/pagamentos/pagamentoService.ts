import { ParcelaAtualizada } from "@/types/pagamento";
import { api } from "../api";

export async function updateValorParcelaAtrasada(
  parcelaId: string
): Promise<ParcelaAtualizada> {
  const { data } = await api.put(`/pagamentos/${parcelaId}`);
  return data;
}
