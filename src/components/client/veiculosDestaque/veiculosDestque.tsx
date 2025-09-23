"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Veiculo } from "@/types/veiculo";
import CardVeiculos from "../cardVeiculos/cardVeiculos";
import {
  EmptyStateCard,
  EmptyCardVariant,
} from "../emptyStateCard/emptyStateCard";
import useBreakpoint from "@/hooks/useBreakPoint";

type Props = {
  isLoading: boolean;
  veiculos: Array<Veiculo> | undefined;
};

// Hook para detectar breakpoint atual

export default function VeiculosDestaque({ isLoading, veiculos }: Props) {
  const breakpoint = useBreakpoint();

  const getQtdCards = () => {
    if (breakpoint === "lg") return 6; // entre 1024 e 1535px
    if (breakpoint === "2xl") return 4; // >=1536px
    return 4; // <1024px
  };

  const renderSkeletons = () =>
    Array.from({ length: getQtdCards() }).map((_, index) => (
      <CardVeiculoSkeleton key={index} />
    ));

  const renderVeiculos = () => {
    const qtd = getQtdCards();
    const veiculosExibidos = veiculos?.slice(0, qtd) || [];
    const cardsRestantes = qtd - veiculosExibidos.length;

    const emptyStateVariants: EmptyCardVariant[] = [
      "coming-soon",
      "cta",
      "testimonial",
      "benefits",
    ];

    return (
      <>
        {veiculosExibidos.map((veiculo) => (
          <CardVeiculos key={veiculo.id} {...veiculo} />
        ))}
        {cardsRestantes > 0 &&
          Array.from({ length: cardsRestantes }).map((_, index) => (
            <EmptyStateCard
              key={`empty-${index}`}
              variant={emptyStateVariants[index % emptyStateVariants.length]}
            />
          ))}
      </>
    );
  };

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
        <h3 className="text-yellow-500 font-semibold text-3xl mb-8 text-center">
          Veículos em Destaque
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {isLoading ? renderSkeletons() : renderVeiculos()}
        </div>
      </div>
    </div>
  );
}
