import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import Link from "next/link";
import { UsuarioResponse } from "@/types/usuario"; // Certifique-se que este tipo existe

// Definindo as props que o componente espera receber
interface VersionSwitcherProps {
  user: UsuarioResponse | null;
}

const getInitials = (name: string = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export function VersionSwitcher({ user }: VersionSwitcherProps) {
  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link prefetch href={"/admin/"}>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Avatar>
                    <AvatarImage src={"https://github.com/shadcn.png"} />
                    <AvatarFallback>{getInitials(user.nome)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col gap-0.5 leading-none text-left">
                  <span className="font-medium">{user.nome || "Usuário"}</span>
                  <span className="text-sm text-muted-foreground">
                    {user.tipo || "Cargo"}
                  </span>
                </div>
              </SidebarMenuButton>
            </Link>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
