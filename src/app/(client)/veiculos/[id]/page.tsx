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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useVeiculo } from "@/hooks/useVeiculos";
import { formatarPreco } from "@/utils/formatarPreco";
import { use, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { useForm } from "react-hook-form";
import { Contato } from "@/types/contato";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateContato } from "@/hooks/useContato";
import { toast } from "sonner";

const contatoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  mensagem: z.string().min(1, "Mensagem é obrigatória"),
});

export default function VehicleDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: veiculo, isLoading } = useVeiculo(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    veiculo?.imagens && veiculo.imagens.length > 0
      ? veiculo.imagens
      : [{ url: "/agil-logo.png" }];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Contato>({
    mode: "onSubmit",
    resolver: zodResolver(contatoSchema),
  });
  const { mutate: createContato, isPending } = useCreateContato();
  const handleCreateContato = (data: Contato) => {
    createContato(data, {
      onSuccess: async () => {
        toast.success("Contato enviado com sucesso");
      },
      onError: () => {
        toast.error("Erro ao enviar contato");
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  return (
    <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 py-14">
      <div className="container flex flex-col justify-between items-center px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna principal - Imagens e detalhes */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galeria de imagens */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden group">
                  {/* Imagem atual */}
                  {images.map((imagem, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <img
                        src={imagem.url || "/agil-logo.png"}
                        alt={`${veiculo?.nome} - Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}

                  {/* Botão Anterior */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                        aria-label="Imagem anterior"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>

                      {/* Botão Próximo */}
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
                        aria-label="Próxima imagem"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>

                      {/* Contador de imagens */}
                      <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm z-10">
                        {currentImageIndex + 1} / {images.length}
                      </div>

                      {/* Indicadores */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === currentImageIndex
                                ? "bg-yellow-500 w-8"
                                : "bg-white/50 hover:bg-white/75 w-2"
                            }`}
                            aria-label={`Ir para imagem ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Miniaturas das imagens */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 p-4">
                    {images.map((imagem, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`aspect-video bg-gray-200 rounded overflow-hidden cursor-pointer transition-all duration-300 ${
                          index === currentImageIndex
                            ? "ring-2 ring-yellow-500 opacity-100"
                            : "opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={imagem.url || "/agil-logo.png"}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
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
                  <form
                    onSubmit={handleSubmit(handleCreateContato)}
                    className="flex flex-col"
                  >
                    <Label className="mb-2">Nome</Label>
                    <Input
                      className="mb-4"
                      type="text"
                      placeholder="Digite seu nome"
                      {...register("nome")}
                    />
                    <Label className="mb-2">Email</Label>
                    <Input
                      className="mb-4"
                      type="email"
                      placeholder="Digite seu email"
                      {...register("email")}
                    />
                    <Label className="mb-2">Telefone</Label>
                    <Input
                      className="mb-4"
                      type="text"
                      placeholder="Digite seu telefone"
                      {...register("telefone")}
                    />
                    <Label className="mb-2">Mensagem</Label>
                    <Textarea
                      className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500 min-h-[120px] mb-4"
                      placeholder="Escreva sua mensagem aqui..."
                      {...register("mensagem")}
                    ></Textarea>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      disabled={isPending}
                    >
                      {isPending ? "Enviando..." : "Enviar Mensagem"}
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
