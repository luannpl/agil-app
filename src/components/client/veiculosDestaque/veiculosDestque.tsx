import { Skeleton } from "@/components/ui/skeleton";
import { Veiculo } from "@/types/veiculo";
import CardVeiculos from "../cardVeiculos/cardVeiculos";

type Props = {
  isLoading: boolean;
  veiculos: Array<Veiculo> | undefined;
};

export default function VeiculosDestaque({ isLoading, veiculos }: Props) {
  // Skeleton para os cards de veículos
  const CardVeiculoSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-14">
      <div className="w-full">
        <h3 className="text-yellow-500 font-semibold text-2xl mb-8 text-center">
          Veículos em Destaque
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <CardVeiculoSkeleton key={index} />
              ))
            : veiculos?.map((veiculo) => (
                <CardVeiculos key={veiculo.id} {...veiculo} />
              ))}
        </div>
      </div>
    </div>
  );
}
