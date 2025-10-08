"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { maskPhone } from "@/utils/masks";
import Link from "next/link";
import { User, Mail, Phone, Shield, UserCog } from "lucide-react";

export default function PerfilPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="w-full px-4 py-6">
        {/* Cabeçalho */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <User className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Perfil do Usuário
            </h1>
          </div>
          <p className="text-muted-foreground text-sm lg:text-base ">
            Visualize e gerencie suas informações de conta
          </p>
        </div>

        {/* Card de informações */}
        <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 space-y-6">
          {/* Seção Dados Pessoais */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <UserCog className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg font-semibold text-foreground">
                Informações Pessoais
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Nome</Label>
                <Input value={user.nome} readOnly />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={user.email} readOnly className="pl-9" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Telefone</Label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={maskPhone(user.telefone)}
                    readOnly
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Tipo de Usuário</Label>
                <div className="relative">
                  <Shield className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input value={user.tipo} readOnly className="pl-9" />
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-4 sm:gap-2 justify-end">
            <Link
              href="/admin/usuarios/perfil/alterar-senha"
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              <Button
                variant="auth"
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Alterar Senha
              </Button>
            </Link>
            <Link href="/admin/usuarios/perfil/editar">
              <Button
                variant="outline"
                className="w-full sm:w-auto order-2 sm:order-1"
              >
                Editar Perfil
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
