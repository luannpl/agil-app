"use client";
import { useColumns } from "@/hooks/useColumns";
import { DataTable } from "@/components/admin/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsuarioResponse } from "@/types/usuario";
import { useDeleteUsuario, useUsuarios } from "@/hooks/useUsuario";
import { toast } from "sonner";
import { Users, UserCog, ShoppingCart, Shield, Loader2 } from "lucide-react";
import { useMemo } from "react";

export default function ListaUsuarios() {
  const { data: usuarios, isLoading } = useUsuarios();
  const { mutate: deleteUsuario } = useDeleteUsuario();

  const handleDelete = (id: string) => {
    deleteUsuario(id, {
      onSuccess: () => {
        toast.success("Usuário excluído com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao excluir o usuário.");
      },
    });
  };

  const { usuarioAdmin, usuarioCliente, usuarioVendedor } = useMemo(() => {
    return {
      usuarioAdmin: usuarios?.filter((u) => u.tipo === "admin") ?? [],
      usuarioCliente: usuarios?.filter((u) => u.tipo === "cliente") ?? [],
      usuarioVendedor: usuarios?.filter((u) => u.tipo === "vendedor") ?? [],
    };
  }, [usuarios]);

  const columns = useColumns<UsuarioResponse>(usuarios ?? [], "usuarios", {
    only: ["nome", "email", "telefone"],
    onDelete: handleDelete,
  });

  const stats = [
    {
      title: "Total de Usuários",
      value: usuarios?.length ?? 0,
      icon: Users,
      description: "Todos os usuários cadastrados",
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Administradores",
      value: usuarioAdmin.length,
      icon: Shield,
      description: "Usuários com acesso admin",
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Clientes",
      value: usuarioCliente.length,
      icon: ShoppingCart,
      description: "Clientes cadastrados",
      gradient: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Vendedores",
      value: usuarioVendedor.length,
      icon: UserCog,
      description: "Equipe de vendas",
      gradient: "from-orange-500 to-orange-600",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Gerenciamento de Usuários
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Visualize e gerencie todos os usuários do sistema
        </p>
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
          <CardTitle className="text-xl sm:text-2xl py-4">Lista de Usuários</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Filtre os usuários por tipo e gerencie suas informações
          </CardDescription>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <Tabs defaultValue="admin" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="admin" className="gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Admin</span>
                <span className="md:hidden">Adm</span>
              </TabsTrigger>
              <TabsTrigger value="cliente" className="gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
                <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Cliente</span>
                <span className="md:hidden">Cli</span>
              </TabsTrigger>
              <TabsTrigger value="vendedor" className="gap-1.5 sm:gap-2 text-xs sm:text-sm py-2">
                <UserCog className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden md:inline">Vendedor</span>
                <span className="md:hidden">Vnd</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="admin" className="mt-6">
              <DataTable columns={columns} data={usuarioAdmin} />
            </TabsContent>
            <TabsContent value="cliente" className="mt-6">
              <DataTable columns={columns} data={usuarioCliente} />
            </TabsContent>
            <TabsContent value="vendedor" className="mt-6">
              <DataTable columns={columns} data={usuarioVendedor} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
