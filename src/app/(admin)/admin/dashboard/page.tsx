"use client";
import { Car, DollarSign, Package, Zap, ChartArea, Loader2 } from "lucide-react";
import { MetricsCard } from "@/components/admin/dashboard/MetricsCard";
import { UltimasVendas } from "@/components/admin/dashboard/UltimasVendas";
import { TopMarcas } from "@/components/admin/dashboard/TopMarcas";
import { useDashboardData } from "@/hooks/useDashboard";

export default function Dashboard() {
  const { data: dashboardData, isLoading } = useDashboardData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    return formatCurrency(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-yellow-500/10 rounded-xl shadow-sm">
            <ChartArea className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Bem-vindo ao painel de controle da Ágil Veículos!
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Estoque de Veículos"
          value={dashboardData?.totalVeiculosEstoque.toString() || "0"}
          icon={Car}
          gradient="from-blue-500 to-blue-600"
          iconColor="text-blue-600"
          description="Total de veículos em estoque"
        />
        <MetricsCard
          title="Estoque em Valor"
          value={formatCompactCurrency(dashboardData?.totalEstoqueEmValor || 0)}
          description={formatCurrency(dashboardData?.totalEstoqueEmValor || 0)}
          icon={DollarSign}
          gradient="from-green-500 to-green-600"
          iconColor="text-green-600"
        />
        <MetricsCard
          title="Total de Clientes"
          value={dashboardData?.totalClientes.toString() || "0"}
          description="Clientes cadastrados"
          icon={Zap}
          gradient="from-purple-500 to-purple-600"
          iconColor="text-purple-600"
        />
        <MetricsCard
          title="Vendas no Mês"
          value={dashboardData?.totalContratosMes.toString() || "0"}
          description="Contratos fechados"
          icon={Package}
          gradient="from-orange-500 to-orange-600"
          iconColor="text-orange-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full">
          <UltimasVendas ultimasVendas={dashboardData?.ultimasVendas || []} />
        </div>
        <div className="w-full">
          <TopMarcas
            marcasMaisVendidas={dashboardData?.marcasMaisVendidas || []}
          />
        </div>
      </div>
    </div>
  );
}
