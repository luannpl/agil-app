import * as React from "react";
import { ChevronRight } from "lucide-react";
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
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

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
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
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
                        <SidebarMenuButton asChild>
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
        <Button variant="destructive" className="w-full">
          Sair
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
