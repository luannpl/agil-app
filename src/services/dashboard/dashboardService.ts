import { DashboardData } from "@/types/dashboard";
import { api } from "../api";

export async function getDashboardData(): Promise<DashboardData> {
  const { data } = await api.get("/dashboard/admin");
  return data;
}
