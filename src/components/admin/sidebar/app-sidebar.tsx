"use client";
import * as React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner"; // IMPORTANTE: Importe o 'toast' da sua biblioteca de notificações (ex: sonner, react-toastify)

import { useAuth } from "@/contexts/AuthContext";
import { useLogoutUsuario } from "@/hooks/useUsuario";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VersionSwitcher } from "@/components/admin/sidebar/version-switcher";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, refetchUser } = useAuth();
  const { mutate: logout } = useLogoutUsuario();

  // Efeito para redirecionar o usuário se ele não estiver autenticado
  useEffect(() => {
    // Apenas redirecione se o carregamento terminou e não há usuário
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleLogout = () => {
    logout(undefined, {
      // 1º arg: undefined (sem variáveis), 2º arg: objeto de opções
      onSuccess: async () => {
        await refetchUser();
        router.push("/login");
      },
      onError: () => {
        toast.error("Erro ao fazer logout. Tente novamente.");
      },
    });
  };

  if (isLoading) {
    return (
      <Sidebar {...props}>
        <SidebarHeader>
          <Skeleton className="h-10 w-full" />
        </SidebarHeader>
        <SidebarContent className="gap-0">
          <div className="p-4 space-y-6">
            <div>
              <Skeleton className="h-6 w-2/4 mb-3" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full" />
            </div>
            <div>
              <Skeleton className="h-6 w-3/4 mb-3" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-10 w-full" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  // Se o carregamento terminou e não há usuário, não renderiza nada
  // (o useEffect cuidará do redirecionamento)
  if (!user) {
    return null;
  }
  const getNavigationData = () => {
    switch (user?.tipo) {
      case "admin":
        return {
          navMain: [
            {
              title: "Veículos",
              url: "/admin/veiculos",
              items: [
                {
                  title: "Cadastrar Veículo",
                  url: "/admin/veiculos",
                },
                {
                  title: "Ver Veículos",
                  url: "/admin/veiculos/view",
                },
              ],
            },
            {
              title: "Painel de Controle",
              url: "/admin/painel-controle",
              items: [
                {
                  title: "Cadastrar Usuário",
                  url: "/admin/usuarios",
                },
                {
                  title: "Ver Usuários",
                  url: "/admin/usuarios/view",
                },
                {
                  title: "Perfil",
                  url: "/admin/usuarios/perfil",
                },
                {
                  title: "Dashboard",
                  url: "/admin/dashboard",
                },
              ],
            },
          ],
        };
      case "vendedor":
        return {
          navMain: [
            {
              title: "Veículos",
              url: "/admin/veiculos",
              items: [
                {
                  title: "Cadastrar Veículo",
                  url: "/admin/veiculos",
                },
                {
                  title: "Ver Veículos",
                  url: "/admin/veiculos/view",
                },
              ],
            },
            {
              title: "Painel de Controle",
              url: "/admin/painel-controle",
              items: [
                {
                  title: "Dashboard",
                  url: "/admin/dashboard",
                },
              ],
            },
          ],
        };
      case "despachante":
        return {
          navMain: [
            {
              title: "Veículos",
              url: "/admin/veiculos",
              items: [
                {
                  title: "Ver Veículos",
                  url: "/admin/veiculos/view",
                },
              ],
            },
            {
              title: "Painel de Controle",
              url: "/admin/painel-controle",
              items: [
                {
                  title: "Dashboard",
                  url: "/admin/dashboard",
                },
              ],
            },
          ],
        };
      default:
        return {
          navMain: [
            {
              title: "Veículos",
              url: "/admin/veiculos",
              items: [
                {
                  title: "Ver Veículos",
                  url: "/admin/veiculos/view",
                },
              ],
            },
            {
              title: "Painel de Controle",
              url: "/admin/painel-controle",
              items: [
                {
                  title: "Dashboard",
                  url: "/admin/dashboard",
                },
              ],
            },
          ],
        };
    }
  };

  const data = getNavigationData();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher user={user} />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-md font-extrabold"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.url}
                        >
                          <Link prefetch href={item.url}>
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <Link prefetch href="/">
          <Button variant="outline" className="w-full">
            Ver Site
          </Button>
        </Link>
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "Saindo..." : "Sair"}
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
