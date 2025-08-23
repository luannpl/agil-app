"use client";
import { CardHoverEffectDemo } from "@/components/client/cardHoverEffect/cardHoverEffect";
import CardVeiculos from "@/components/client/cardVeiculos/cardVeiculos";
import HeroSection from "@/components/client/hero-section/hero-section";
import Marcas from "@/components/client/marcas/marcas";
import { Button } from "@/components/ui/button";
import { MoveRight, Car } from "lucide-react";
import Link from "next/link";

export default function HomeClient() {
  const veiculos = [
    {
      id: "1",
      nome: "Jeep Renegade",
      descricao: "2.0 16V DIESEL LIMITED 4X4 AUTOMÁTICO",
      ano: 2020,
      preco: 80000,
      quilometragem: 54000,
      cambio: "Automático",
      localizacao: "Fortaleza - CE",
      imagem: "/jeep.jpeg",
    },
    {
      id: "2",
      nome: "Jeep Renegade",
      descricao: "2.0 16V DIESEL LIMITED 4X4 AUTOMÁTICO",
      ano: 2020,
      preco: 80000,
      quilometragem: 54000,
      cambio: "Automático",
      localizacao: "Fortaleza - CE",
      imagem: "/jeep.jpeg",
    },
    {
      id: "3",
      nome: "Jeep Renegade",
      descricao: "2.0 16V DIESEL LIMITED 4X4 AUTOMÁTICO",
      ano: 2020,
      preco: 80000,
      quilometragem: 54000,
      cambio: "Automático",
      localizacao: "Fortaleza - CE",
      imagem: "/jeep.jpeg",
    },
    {
      id: "4",
      nome: "Jeep Renegade",
      descricao: "2.0 16V DIESEL LIMITED 4X4 AUTOMÁTICO",
      ano: 2020,
      preco: 80000,
      quilometragem: 54000,
      cambio: "Automático",
      localizacao: "Fortaleza - CE",
      imagem: "/jeep.jpeg",
    },
  ];
  return (
    <div>
      <HeroSection />
      <Marcas />
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-14">
        <div className="w-full">
          <h3 className="text-yellow-500 font-semibold text-2xl mb-8 text-center">
            Veículos em Destaque
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {veiculos.map((veiculo) => (
              <CardVeiculos key={veiculo.id} {...veiculo} />
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 pb-14 pt-4">
        <h3 className="text-yellow-500 font-semibold text-2xl mb-8 text-center">
          Motivos para nos escolher
        </h3>
        <CardHoverEffectDemo />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 text-gray-500 md:px-8 py-4 flex flex-col justify-center items-center gap-4 pb-0">
        <h3 className="text-yellow-500 font-semibold text-2xl text-center">
          Encontre seu veiculo ideal hoje
        </h3>
        <p className="text-center text-lg px-4 md:px-0">
          Navegue por nosso catálogo completo de veículos seminovos e encontre o
          veículo dos seus sonhos
        </p>
        <Link href="/veiculos">
          <Button
            className="h-12 group relative overflow-hidden"
            variant={"auth"}
          >
            <span className="flex items-center gap-2 transition-all duration-500 group-hover:opacity-0 group-hover:translate-x-4">
              Ver todos os veículos
              <MoveRight />
            </span>
            <Car className="absolute left-1/2 top-1/2 -translate-y-1/2 opacity-0 -translate-x-[200%] transition-all duration-500 group-hover:opacity-100 group-hover:-translate-x-1/2 w-14 h-14" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
