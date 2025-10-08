"use client";
import { Car, DollarSign, Package, Zap, ChartArea } from "lucide-react";
import { MetricsCard } from "@/components/admin/dashboard/MetricsCard";
import { UltimasVendas } from "@/components/admin/dashboard/UltimasVendas";
import { TopMarcas } from "@/components/admin/dashboard/TopMarcas";
import { useDashboardData } from "@/hooks/useDashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }
  return (
    <div className="space-y-6 px-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <ChartArea className="w-6 h-6 text-yellow-500" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
        </div>
        <p className="text-muted-foreground">
          Bem-vindo ao painel de controle da Ágil Veículos!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Estoque de Veiculos"
          value={dashboardData?.totalVeiculosEstoque.toString() || "0"}
          // description="8 novos esta semana"
          icon={Car}
          // trend={{ value: 12.5, isPositive: true }}
        />
        <MetricsCard
          title="Estoque em Valor"
          value={`R$ ${
            dashboardData?.totalEstoqueEmValor.toFixed(2) || "0.00"
          }`}
          // description="Meta: R$ 6M"
          icon={DollarSign}
          // trend={{ value: 8.2, isPositive: true }}
        />
        <MetricsCard
          title="Total de Clientes"
          value={dashboardData?.totalClientes.toString() || "0"}
          // description="54 novos leads"
          icon={Zap}
          // trend={{ value: 18.7, isPositive: true }}
        />
        <MetricsCard
          title="Total de Vendas no Mês"
          value={dashboardData?.totalContratosMes.toString() || "0"}
          // description="15 novos esta semana"
          icon={Package}
          // trend={{ value: 3.1, isPositive: false }}
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full">
          <UltimasVendas ultimasVendas={dashboardData?.ultimasVendas || []} />
        </div>
        <div className="w-full">
          <TopMarcas
            marcasMaisVendidas={dashboardData?.marcasMaisVendidas || []}
          />
        </div>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart />
        <TopCars />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentSales />

        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Taxa de Conversão
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <Progress value={68} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                +5% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Satisfação do Cliente
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5.0</div>
              <Progress value={96} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Baseado em 342 avaliações
              </p>
            </CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  );
}
