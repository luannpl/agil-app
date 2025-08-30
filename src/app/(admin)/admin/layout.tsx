"use client";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
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

  // Se chegou aqui, o usuário existe e o carregamento terminou
  // Lógica para trocar o layout com base na role
  switch (user.tipo) {
    case "admin":
      return <LayoutContent>{children}</LayoutContent>;
    case "vendedor":
      // TODO: Substituir pelo layout do Vendedor
      return <div>Layout Vendedor {children}</div>;
    case "despachante":
      // TODO: Substituir pelo layout do Despachante
      return <div>Layout Despachante {children}</div>;
    default:
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <h1>Tipo de usuário não reconhecido.</h1>
        </div>
      );
  }
}

// O layout principal do admin agora provê o contexto de autenticação
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RoleBasedLayout>{children}</RoleBasedLayout>
    </AuthProvider>
  );
}
