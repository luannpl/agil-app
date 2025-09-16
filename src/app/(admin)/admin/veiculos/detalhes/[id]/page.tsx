"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useVeiculo } from "@/hooks/useVeiculos";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DetalhesVeiculoPage() {
  const { id } = useParams();
  const router = useRouter();

  const idAsString = Array.isArray(id) ? id[0] : id;

  // --- HOOKS CALLED UNCONDITIONALLY AT THE TOP ---
  // Pass idAsString even if it's undefined; the hook should handle it gracefully.
  const { data: veiculo, isLoading, error } = useVeiculo(idAsString);

  useEffect(() => {
    // Handle the case where the ID is missing from the URL
    if (!idAsString) {
      router.push("/admin/veiculos");
      return;
    }

    // Handle the case where the vehicle is not found
    if (error instanceof AxiosError) {
      toast.error("Veículo não encontrado");
      router.push("/admin/veiculos/view");
    }
  }, [idAsString, error, router]);

  // --- CONDITIONAL RENDERING HAPPENS AFTER HOOKS ---
  if (isLoading || !idAsString) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  // While redirecting on error, render nothing.
  if (error) {
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Veículo {id}</h1>
      {veiculo && (
        <div>
          <p>Nome: {veiculo.nome}</p>
          <p>Descrição: {veiculo.descricao}</p>
          <p>Marca: {veiculo.marca}</p>
          <p>Ano: {veiculo.ano}</p>
          {/* <p>Placa: {veiculo.placa}</p> */}
          <p>Valor: {veiculo.valor}</p>
          <p>Cor: {veiculo.cor}</p>
          <p>Quilometragem: {veiculo.quilometragem}</p>
          <p>Localização: {veiculo.localizacao}</p>
          <p>Combustível: {veiculo.combustivel}</p>
          <p>Tipo: {veiculo.tipo}</p>
          <p>Sistema: {veiculo.sistema}</p>
        </div>
      )}
    </div>
  );
}
