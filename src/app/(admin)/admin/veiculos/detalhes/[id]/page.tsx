"use client";
import { useParams } from "next/navigation";

export default function DetalhesVeiculoPage() {
    const {id} = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Veículo {id}</h1>
      <p>Carregando detalhes do veículo...</p>
    </div>
  );
}