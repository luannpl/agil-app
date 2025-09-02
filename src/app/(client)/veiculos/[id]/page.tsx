"use client";

import { Calendar, Fuel, Gauge, MapPin, Phone, Mail, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVeiculo } from "@/hooks/useVeiculos";
import { formatarPreco } from "@/utils/formatarPreco";
import { use } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    key={veiculo?.id}
                    src={veiculo?.imagem || "/placeholder.svg"}
                    alt={veiculo?.nome}
                    className="w-full h-full object-cover"
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
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {veiculo?.marca} {veiculo?.nome}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      Fortaleza - CE
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
                      <div className="font-semibold">{veiculo?.tipo}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-demo rounded-lg">
                    <Cog className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Câmbio</div>
                      <div className="font-semibold">{veiculo?.tipo}</div>
                    </div>
                  </div>
                </div>

                {/* Descrição */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Descrição</h3>
                  <p className="text-gray-600 leading-relaxed">
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
                <h3 className="text-lg font-semibold mb-4">Entre em contato</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Telefone</div>
                      <div className="font-semibold">telefone</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">E-mail</div>
                      <div className="font-semibold text-sm">email</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar agora
                  </Button>

                  <Button variant="outline" className="w-full ">
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar e-mail
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full font-semibold py-3 bg-transparent"
                  >
                    💬 WhatsApp
                  </Button>
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
                <h3 className="text-lg font-semibold mb-4">
                  Simule seu financiamento
                </h3>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-demo rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      {veiculo && <span>{formatarPreco(veiculo.valor)}</span>}
                    </div>
                    <div className="text-sm text-gray-500">
                      Entrada sugerida (15%)
                    </div>
                  </div>
                  <div className="text-center p-4 bg-demo rounded-lg">
                    <div className="text-2xl font-bold text-gray-800">
                      {veiculo && <span>{formatarPreco(veiculo.valor)}</span>}
                    </div>
                    <div className="text-sm text-gray-500">48x sem juros*</div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Simular financiamento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
