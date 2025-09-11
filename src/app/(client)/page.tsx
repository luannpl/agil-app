"use client";
import EncontreVeiculo from "@/components/client/encontreVeiculo/encontreVeiculo";
import HeroSection from "@/components/client/hero-section/hero-section";
import Marcas from "@/components/client/marcas/marcas";
import MotivosParaEscolher from "@/components/client/motivosParaEscolher/motivosParaEscolher";
import VeiculosDestaque from "@/components/client/veiculosDestaque/veiculosDestque";
import { useVeiculosDestaques } from "@/hooks/useVeiculos";

export default function HomeClient() {
  const { data: veiculos, isLoading } = useVeiculosDestaques();

  return (
    <div>
      <HeroSection />
      <Marcas />
      <VeiculosDestaque isLoading={isLoading} veiculos={veiculos} />
      <MotivosParaEscolher />
      <EncontreVeiculo />
    </div>
  );
}
