import CardVeiculos from "@/components/client/cardVeiculos/cardVeiculos";
import HeroSection from "@/components/client/hero-section/hero-section";
import Marcas from "@/components/client/marcas/marcas";

export default function HomeClient() {
  return (
    <div>
      <HeroSection />
      <Marcas />
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-14">
        <div className="max-w-lg mx-auto gap-12 justify-center lg:flex lg:max-w-none">
          <div className="max-w-lg space-y-3 flex flex-col">
            <h3 className="text-yellow-500 font-semibold text-2xl mb-8">
              Veiculos em Destaque
            </h3>
            <CardVeiculos
              id="1"
              nome="Jeep Renegade"
              ano={2020}
              preco={80000}
              imagem="/jeep.jpeg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
