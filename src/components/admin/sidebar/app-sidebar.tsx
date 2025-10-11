"use client";
import * as React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronRight, LogOut, Globe } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";
import { useLogoutUsuario } from "@/hooks/useUsuario";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
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
import { sidebarConfig } from "@/config/sideBarConfig";

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
        <SidebarHeader className="border-b border-sidebar-border p-4">
          <Skeleton className="h-16 w-full rounded-lg" />
        </SidebarHeader>
        <SidebarContent className="gap-0">
          <div className="p-4 space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-5 w-24 rounded" />
              <div className="space-y-2 ml-4">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-5 w-32 rounded" />
              <div className="space-y-2 ml-4">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </div>
            </div>
          </div>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-4 space-y-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
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

  const data =
    sidebarConfig[user?.tipo as keyof typeof sidebarConfig] ??
    sidebarConfig.default;
  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b border-sidebar-border/50 bg-gradient-to-b from-sidebar to-sidebar/95 p-4">
        <VersionSwitcher user={user} />
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-gradient-to-b from-sidebar/95 to-sidebar">
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item, index) => (
          <React.Fragment key={item.title}>
            <Collapsible
              title={item.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup className="py-2">
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground text-sm font-bold rounded-md px-3 py-2 transition-all duration-200"
                >
                  <CollapsibleTrigger className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="flex-1 text-left">{item.title}</span>
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent className="transition-all duration-200 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <SidebarGroupContent className="pl-2">
                    <SidebarMenu className="space-y-1">
                      {item.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === subItem.url}
                            className="group/item transition-all duration-200 hover:translate-x-1"
                          >
                            <Link
                              prefetch
                              href={subItem.url}
                              className="flex items-center gap-3 px-3 py-2"
                            >
                              <subItem.icon className="h-4 w-4 flex-shrink-0 opacity-70 group-hover/item:opacity-100 transition-opacity" />
                              <span className="text-sm">{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
            {index < data.navMain.length - 1 && (
              <Separator className="my-2 bg-sidebar-border/30" />
            )}
          </React.Fragment>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/50 bg-gradient-to-t from-sidebar to-sidebar/95 p-4 space-y-2">
        <Button
          asChild
          variant="outline"
          className="w-full group hover:bg-sidebar-accent transition-all duration-200"
        >
          <Link prefetch href="/" className="flex items-center gap-2">
            <Globe className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
            <span>Ver Site</span>
          </Link>
        </Button>
        <Button
          variant="destructive"
          className="w-full group hover:bg-destructive/90 transition-all duration-200"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4 transition-transform duration-200" />
          {isLoading ? "Saindo..." : "Sair"}
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
