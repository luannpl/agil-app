"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  // Função para gerar breadcrumb dinâmico
  const generateBreadcrumb = () => {
    const pathSegments = pathname
      .split("/")
      .filter((segment) => segment !== "");
    const breadcrumbItems: Array<{
      href: string;
      label: string;
      isLast: boolean;
    }> = [];

    // Mapeamento de rotas para labels mais amigáveis
    const routeLabels: { [key: string]: string } = {
      admin: "Administração",
      dashboard: "Dashboard",
      usuarios: "Usuários",
      veiculos: "Veículos",
      view: "Lista",
    };

    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label =
        routeLabels[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);

      breadcrumbItems.push({
        href: currentPath,
        label: label,
        isLast: index === pathSegments.length - 1,
      });
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = generateBreadcrumb();

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <div key={item.href} className="flex items-center">
                    {index > 0 && (
                      <BreadcrumbSeparator className="hidden md:block" />
                    )}
                    <BreadcrumbItem className="hidden md:block">
                      {item.isLast ? (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={item.href}>
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
