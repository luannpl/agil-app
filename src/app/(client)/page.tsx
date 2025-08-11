import HeroSection from "@/components/client/hero-section/hero-section";
import Marcas from "@/components/client/marcas/marcas";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeClient() {
  return (
    <div>
      <HeroSection />
      <Marcas />
      {/* <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-14">
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
          <div className="max-w-lg space-y-3 flex">
            <h3 className="text-yellow-300 font-semibold text-2xl">
              Veiculos em Destaque
            </h3>
            <Card className="w-full max-w-sm">
              <CardHeader className="text-white">
                <p className="text-lg">Confira nossos veículos em destaque!</p>
              </CardHeader>
              <CardTitle className="text-yellow-500">
                Veículos selecionados para você
              </CardTitle>
            </Card>
          </div>
        </div>
      </div> */}
    </div>
  );
}
