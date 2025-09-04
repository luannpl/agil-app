"use client";

import {
  Calendar,
  Fuel,
  Gauge,
  MapPin,
  Phone,
  Mail,
  Cog,
  MessageCircleMore,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVeiculo } from "@/hooks/useVeiculos";
import { formatarPreco } from "@/utils/formatarPreco";
import { use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function VehicleDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: veiculo, isLoading } = useVeiculo(id);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-14">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna principal - Imagens e detalhes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galeria de imagens */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    key={veiculo?.id}
                    src={veiculo?.imagem || "/placeholder.svg"}
                    alt={veiculo?.nome}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                {/* <div className="grid grid-cols-4 gap-2 p-4">
                  {veiculo?.imagens.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-200 rounded overflow-hidden cursor-pointer hover:opacity-80"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${vehicleData.name} - ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div> */}
              </CardContent>
            </Card>

            {/* Informações do veículo */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-500 mb-2">
                      {veiculo?.marca} {veiculo?.nome}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {veiculo?.localizacao}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-yellow-600">
                      {veiculo && <span>{formatarPreco(veiculo.valor)}</span>}
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {veiculo?.ano}
                    </Badge>
                  </div>
                </div>

                {/* Especificações principais */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-demo rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Ano</div>
                      <div className="font-semibold">{veiculo?.ano}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-demo rounded-lg">
                    <Gauge className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">KM</div>
                      <div className="font-semibold">
                        {veiculo?.quilometragem.toLocaleString("pt-BR")}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-demo rounded-lg">
                    <Fuel className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Combustível</div>
                      <div className="font-semibold capitalize">
                        {veiculo?.combustivel}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-demo rounded-lg">
                    <Cog className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Câmbio</div>
                      <div className="font-semibold capitalize">
                        {veiculo?.sistema}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                  <p className="text-gray-500 leading-relaxed">
                    {veiculo?.descricao}
                  </p>
                </div>

                {/* Características */}
                {/* <div>
                  <h3 className="text-lg font-semibold mb-3">Características</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {vehicleData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contato */}
          <div className="space-y-6">
            <Card className="top-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Comprar Agora</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <MessageCircleMore className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Telefone</div>
                      <div className="font-semibold">
                        {veiculo ? veiculo.usuario?.telefone : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <Mail className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">E-mail</div>
                      <div className="font-semibold text-sm">
                        {veiculo ? veiculo.usuario?.email : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 flex flex-col gap-0.5">
                  <Link
                    href={`https://wa.me//55${veiculo?.usuario?.telefone}?text=Olá,%20vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20o%20${veiculo?.marca}%20${veiculo?.nome}`}
                  >
                    <Button
                      variant="auth"
                      className="w-full font-semibold py-3"
                    >
                      <MessageCircleMore className="w-5 h-5 " /> WhatsApp
                    </Button>
                  </Link>
                  <a
                    href={`tel:+55${veiculo?.usuario?.telefone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 " />
                      Ligar agora
                    </Button>
                  </a>

                  {/* <Button variant="outline" className="w-full ">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar e-mail
                  </Button> */}
                </div>

                {/* <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="text-sm text-yellow-800 font-medium mb-1">💡 Dica importante</div>
                  <div className="text-sm text-yellow-700">
                    Sempre verifique a documentação e faça uma vistoria antes de fechar negócio.
                  </div>
                </div> */}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Entre em Contato</h3>

                <div className="text-sm text-gray-500">
                  <form action="">
                    <Label className="mb-2">Nome</Label>
                    <Input
                      className="mb-4"
                      type="text"
                      placeholder="Digite seu nome"
                    />
                    <Label className="mb-2">Email</Label>
                    <Input
                      className="mb-4"
                      type="email"
                      placeholder="Digite seu email"
                    />
                    <Label className="mb-2">Telefone</Label>
                    <Input
                      className="mb-4"
                      type="text"
                      placeholder="Digite seu telefone"
                    />
                    <Label className="mb-2">Mensagem</Label>
                    <Textarea
                      className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500 min-h-[120px] mb-4"
                      placeholder="Escreva sua mensagem aqui..."
                    ></Textarea>
                    <Button variant="outline" className="w-full bg-transparent">
                      Enviar Mensagem
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
