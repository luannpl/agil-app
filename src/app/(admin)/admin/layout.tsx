"use client";

import { useAuth } from "@/contexts/AuthContext";
import LayoutContent from "@/components/admin/layout/layout-content";
import { Skeleton } from "@/components/ui/skeleton";
// Importe o useRouter para navegação no cliente
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Este componente decide qual layout renderizar com base no usuário
function RoleBasedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter(); // Instancie o router

  useEffect(() => {
    // Se o carregamento terminou e não há usuário, redirecione
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]); // Adicione as dependências ao useEffect

  if (isLoading || !user) {
    // Enquanto carrega ou antes do redirecionamento, mostre o skeleton
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  return <LayoutContent>{children}</LayoutContent>;
}

// O layout principal do admin agora provê o contexto de autenticação
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleBasedLayout>{children}</RoleBasedLayout>;
}
