"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { maskPhone } from "@/utils/masks";
import Link from "next/link";

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
    <div className="p-4 bg-gray-600/5 rounded-lg backdrop-blur-md pb-8">
      <h1 className="text-2xl font-bold mb-4">Perfil do Usuário</h1>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Label className="mb-2 px-1 text-md">Nome </Label>
            <Input value={user.nome} readOnly />
          </div>
          <div className="w-full">
            <Label className="mb-2 px-1 text-md">Email</Label>
            <Input value={user.email} readOnly />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Label className="mb-2 px-1 text-md">Telefone</Label>
            <Input value={maskPhone(user.telefone)} readOnly />
          </div>
          <div className="w-full">
            <Label className="mb-2 px-1 text-md">Tipo de Usuário</Label>
            <Input value={user.tipo} readOnly />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Link href="/admin/veiculos/view" className="w-full">
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </Link>
          </div>
          <div className="w-full">
            <Button variant="auth" className="w-full">
              Editar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
