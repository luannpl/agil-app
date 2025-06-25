"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CadastroUsuario() {
  return (
    <>
      <h1 className="text-2xl font-bold text-foreground">Cadastrar usuário</h1>
      <div className="flex gap-4 mt-4">
        <Input placeholder="Digite o nome do usuário" type="text" />
        <Input placeholder="Digite o email do usuário" type="email" />
      </div>
      <Input placeholder="Digite a senha do usuário" type="password" />
      <Button
        className="cursor-pointer mt-4"
        variant="default"
        onClick={() => {
          toast("Usuário cadastrado com sucesso!", {
            description: "Você pode agora fazer login com suas credenciais.",
            position: "top-right",
            style: {
              backgroundColor: "#4A90E2",
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "12px 16px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            },
          });
        }}
      >
        Cadastrar Usuário
      </Button>
    </>
  );
}
