"use client";
import { CardHoverEffectDemo } from "@/components/client/cardHoverEffect/cardHoverEffect";
import CardVeiculos from "@/components/client/cardVeiculos/cardVeiculos";
import HeroSection from "@/components/client/hero-section/hero-section";
import Marcas from "@/components/client/marcas/marcas";

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
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-x-8 lg:gap-x-12 xl:gap-x-8 2xl:gap-x-32 gap-y-6 justify-items-center">
            {veiculos.map((veiculo) => (
              <CardVeiculos key={veiculo.id} {...veiculo} />
            ))}
          </div>
        </div>
      </div>
      <h3 className="text-yellow-500 font-semibold text-2xl mb-8 text-center">
        Motivos para nos escolher
      </h3>
      <div>
        <CardHoverEffectDemo />
      </div>
    </div>
  );
}
