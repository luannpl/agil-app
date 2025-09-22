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

export default function CardVeiculos(props: Veiculo) {
  return (
    <>
      <Link href={`/veiculos/${props.id}`}>
        <Card className="h-full overflow-hidden hover:shadow-xl hover:shadow-yellow-500/20 transition-shadow duration-300 bg-gradient-to-br from-zinc-900 to-zinc-800 ">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={props.imagem || "https://via.placeholder.com/400x300"}
              alt={props.nome}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
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
