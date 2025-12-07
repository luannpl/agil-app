"use client";
import { useColumns } from "@/hooks/useColumns";
import { DataTable } from "@/components/admin/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Veiculo } from "@/types/veiculo";
import { useDeleteVeiculo, useVeiculos } from "@/hooks/useVeiculos";
import { toast } from "sonner";
import { Car, CheckCircle2, XCircle, TrendingUp, Loader2, Plus } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";

export default function ListaVeiculos() {
  const { data: veiculos, isLoading } = useVeiculos();
  const { mutate: deleteVeiculo } = useDeleteVeiculo();

  const handleDelete = (id: string) => {
    deleteVeiculo(id, {
      onSuccess: () => {
        toast.success("Veículo excluído com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao excluir o veículo.");
      },
    });
  };

  const { veiculosDisponiveis, veiculosVendidos, totalValueDisponiveis, totalValueVendidos } = useMemo(() => {
    const disponiveis = veiculos?.filter((v) => v.vendido === false) ?? [];
    const vendidos = veiculos?.filter((v) => v.vendido === true) ?? [];
    
    return {
      veiculosDisponiveis: disponiveis,
      veiculosVendidos: vendidos,
      totalValueDisponiveis: disponiveis.reduce((sum, v) => sum + (v.valor || 0), 0),
      totalValueVendidos: vendidos.reduce((sum, v) => sum + (v.valorVenda || v.valor || 0), 0),
    };
  }, [veiculos]);

  const columns = useColumns<Veiculo>(veiculos ?? [], "veiculos", {
    only: ["nome", "marca", "ano", "valor"],
    onDelete: handleDelete,
  });

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

  const stats = [
    {
      title: "Total de Veículos",
      value: veiculos?.length ?? 0,
      icon: Car,
      description: "Todos os veículos cadastrados",
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      isNumeric: true,
    },
    {
      title: "Disponíveis",
      value: veiculosDisponiveis.length,
      icon: CheckCircle2,
      description: formatCurrency(totalValueDisponiveis),
      gradient: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      isNumeric: true,
    },
    {
      title: "Vendidos",
      value: veiculosVendidos.length,
      icon: XCircle,
      description: formatCurrency(totalValueVendidos),
      gradient: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      isNumeric: true,
    },
    {
      title: "Valor Total",
      value: formatCompactCurrency(totalValueDisponiveis + totalValueVendidos),
      icon: TrendingUp,
      description: "Inventário completo",
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      isNumeric: false,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Carregando veículos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Gerenciamento de Veículos
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Visualize e gerencie todo o inventário de veículos
          </p>
        </div>
        <Link href="/admin/veiculos">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium w-full md:w-auto"
            size="default"
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Veículo
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title} 
              className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300 py-2"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
                <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={` p-2.5 rounded-xl shadow-sm`}>
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} strokeWidth={2.5} />
                </div>
              </CardHeader>
              
              <CardContent className="relative">
                <div className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs with Tables */}
      <Card className="shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl sm:text-2xl pt-4">Lista de Veículos</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Filtre os veículos por status e gerencie o inventário
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <Tabs defaultValue="disponiveis" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto">
              <TabsTrigger value="disponiveis" className="gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
                <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Disponíveis</span>
                <span className="sm:hidden">Disp.</span>
                <span className="ml-1">({veiculosDisponiveis.length})</span>
              </TabsTrigger>
              <TabsTrigger value="vendidos" className="gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
                <XCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Vendidos</span>
                <span className="sm:hidden">Vend.</span>
                <span className="ml-1">({veiculosVendidos.length})</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="disponiveis" className="mt-6">
              <DataTable columns={columns} data={veiculosDisponiveis} />
            </TabsContent>
            <TabsContent value="vendidos" className="mt-6">
              <DataTable columns={columns} data={veiculosVendidos} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
