"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useVeiculo } from "@/hooks/useVeiculos";
import { formatarPreco } from "@/utils/formatarPreco";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

// imports do shadcn para o modal
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function DetalhesVeiculoPage() {
  const { id } = useParams();
  const router = useRouter();

  const idAsString = Array.isArray(id) ? id[0] : id;

  const { data: veiculo, isLoading, error } = useVeiculo(idAsString);

  useEffect(() => {
    if (!idAsString) {
      router.push("/admin/veiculos");
      return;
    }

    if (error instanceof AxiosError) {
      toast.error("Veículo não encontrado");
      router.push("/admin/veiculos/view");
    }
  }, [idAsString, error, router]);

  if (isLoading || !idAsString) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Veículo </h1>
      {veiculo && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Nome do Veículo</Label>
              <Input value={veiculo.nome} readOnly />
            </div>
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Descrição</Label>
              <Input value={veiculo.descricao} readOnly />
            </div>
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Placa</Label>
              <Input value={veiculo.placa} readOnly />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Marca</Label>
              <Input value={veiculo.marca} readOnly />
            </div>
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Cor</Label>
              <Input value={veiculo.cor} readOnly />
            </div>
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Ano</Label>
              <Input value={veiculo.ano} readOnly />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Valor</Label>
              <Input value={formatarPreco(veiculo.valor)} readOnly />
            </div>
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Quilometragem</Label>
              <Input value={veiculo.quilometragem} readOnly />
            </div>
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Localização</Label>
              <Input value={veiculo.localizacao} readOnly />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Combustível</Label>
              <Input
                className="capitalize"
                value={veiculo.combustivel}
                readOnly
              />
            </div>
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Tipo</Label>
              <Input className="capitalize" value={veiculo.tipo} readOnly />
            </div>
            <div className="w-full">
              <Label className="mb-2 px-1 text-md">Sistema</Label>
              <Input className="capitalize" value={veiculo.sistema} readOnly />
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full">
                <Label className="mb-2 px-1 text-md">Imagem</Label>
                <Input
                  readOnly
                  value="Clique aqui para ver a imagem do veículo"
                  className="cursor-pointer text-gray-500"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <img
                src={veiculo?.imagem || "/placeholder.svg"}
                alt={veiculo?.nome}
                className="w-full h-auto object-contain rounded-lg"
              />
            </DialogContent>
          </Dialog>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => router.back()}
              >
                Voltar
              </Button>
            </div>
            <div className="w-full">
              <Button variant="auth" className="w-full">
                Editar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
