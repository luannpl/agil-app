import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Car, MapPin } from "lucide-react";

interface CardVeiculosProps {
  id: string;
  nome: string;
  ano: number;
  preco: number;
  imagem: string;
}

export default function CardVeiculos({
  id,
  nome,
  ano,
  preco,
  imagem,
}: CardVeiculosProps) {
  const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    <>
      <Link href={`/veiculo/${id}`}>
        <Card className="w-full min-w-xs overflow-hidden hover:shadow-xl hover:shadow-yellow-500/20 transition-shadow duration-300 py-0 gap-0 ">
          <div className="relative aspect-[5/3] overflow-hidden">
            <Image
              src={imagem}
              alt={nome}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          <CardHeader className="pb-6 px-2 m-0 gap-0 pt-2">
            {/* <CardTitle className="text-lg  text-yellow-200 ">{ano}</CardTitle> */}
            <CardTitle className="text-xl font-bold text-gray-600 line-clamp-2">
              {nome}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              2.0 16V DIESEL LIMITED 4X4 AUTOMÁTICO
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0 pb-0 px-2">
            <p className="text-xl font-bold text-yellow-600">
              {formatarPreco(preco)}
            </p>
          </CardContent>

          <CardFooter className="px-2 py-4">
            <div className="pt-2 border-t w-full text-gray-500 border-gray-600 ">
              <div className="flex justify-between ">
                <p className="flex items-center gap-1">
                  {" "}
                  <MapPin className="h-4 w-4 text-gray-500" />
                  Automático
                </p>
                <p className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {ano}
                </p>
              </div>
              <div className="flex  justify-between">
                <p className="flex items-center gap-1">
                  <Car className="h-4 w-4 text-gray-500" />
                  54.000 km
                </p>
                <p className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  Fortaleza - CE
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
}
