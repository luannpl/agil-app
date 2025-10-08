import { getDashboardData } from "@/services/dashboard/dashboardService";
import { DashboardData } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

export function useDashboardData() {
  return useQuery<DashboardData>({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
  });
}
