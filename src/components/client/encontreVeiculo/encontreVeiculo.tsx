import { Button } from "@/components/ui/button";
import { Car, MoveRight } from "lucide-react";
import Link from "next/link";

export default function EncontreVeiculo() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-500 md:px-8 py-4 flex flex-col justify-center items-center gap-4 pb-0">
      <h3 className="text-yellow-500 font-semibold text-3xl text-center">
        Encontre seu veiculo ideal hoje
      </h3>
      <p className="text-center text-lg px-4 md:px-0 text-gray-300">
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
  );
}
