"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Car, ChartCandlestick, MapPin } from "lucide-react";
import { Veiculo } from "@/types/veiculo";
import { formatarPreco } from "@/utils/formatarPreco";
import { useState, useEffect } from "react";

export default function CardVeiculos(props: Veiculo) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images =
    props.imagens && props.imagens.length > 0
      ? props.imagens
      : [{ url: "/agil-logo.png" }];

  useEffect(() => {
    // Only set up interval if there are multiple images
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [images.length]);

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Link href={`/veiculos/${props.id}`}>
        <Card className="h-full overflow-hidden hover:shadow-xl hover:shadow-yellow-500/20 transition-shadow duration-300 bg-gradient-to-br from-zinc-900 to-zinc-800 ">
          <div className="relative aspect-[4/3] overflow-hidden group">
            {/* Imagens do Carrossel */}
            {images.map((imagem, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={imagem.url || "/agil-logo.png"}
                  alt={`${props.nome} - Imagem ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}

            {/* Indicadores de Navegação */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      goToImage(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-yellow-500 w-6"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Ir para imagem ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <CardHeader className="pb-4 px-2 m-0 gap-0 pt-0">
            <CardTitle className="text-xl font-bold text-gray-400 line-clamp-2">
              {props.nome}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 line-clamp-1">
              {props.descricao || "Sem descrição disponível."}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0 pb-0 px-2">
            <p className="text-xl font-bold text-yellow-600">
              {formatarPreco(props.valor)}
            </p>
          </CardContent>

          <CardFooter className="px-2 pb-4">
            <div className="pt-2 border-t w-full text-gray-500 border-gray-600 flex justify-between">
              <div className="">
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {props.ano}
                </p>
                <p className="flex items-center gap-1">
                  <Car className="h-4 w-4 text-gray-500" />
                  {props.quilometragem} km
                </p>
              </div>
              <div className="">
                <p className="flex items-center gap-1">
                  <ChartCandlestick className="h-4 w-4 text-gray-500" />
                  <span className="capitalize">{props.sistema}</span>
                </p>
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {props.localizacao || "Fortaleza - CE"}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
}
