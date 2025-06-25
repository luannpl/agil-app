"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CadastroVeiculo() {
  return (
    <>
      <h1 className="text-2xl font-bold">Cadastrar veiculo</h1>
      <div className="flex gap-4 mt-4">
        <Input placeholder="Digite o nome do veículo" type="text" />
        <Input placeholder="Digite a placa do veículo" type="text" />
      </div>
      <Input placeholder="Digite o modelo do veículo" type="text" />
      <Input placeholder="Digite o ano do veículo" type="text" />
      <Input placeholder="Digite o valor do veículo" type="text" />
      <Input placeholder="Digite a cor do veículo" type="text" />
      <Input placeholder="Digite o tipo do veículo" type="text" />
      <Button
        className="cursor-pointer mt-4"
        variant="default"
        onClick={() =>
          toast("Veículo cadastrado!", {
            position: "top-right",
            style: {
              backgroundColor: "#4A90E2",
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "12px 16px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            },
          })
        }
      >
        Cadastrar Veículo
      </Button>
    </>
  );
}
