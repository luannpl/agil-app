"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useVeiculo } from "@/hooks/useVeiculos";
import { formatarPreco } from "@/utils/formatarPreco";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  Car,
  Calendar,
  Palette,
  MapPin,
  Gauge,
  DollarSign,
  Fuel,
  Settings,
  ArrowLeft,
  Tag,
  FileText,
  Hash,
} from "lucide-react";

export default function DetalhesVeiculoPage() {
  const { id } = useParams();
  const router = useRouter();

  const idAsString = Array.isArray(id) ? id[0] : id;

  const { data: veiculo, isLoading, error } = useVeiculo(idAsString);

  useEffect(() => {
    if (!idAsString) {
      router.push("/admin/veiculos");
      return;
    }

    if (error instanceof AxiosError) {
      toast.error("Veículo não encontrado");
      router.push("/admin/veiculos/view");
    }
  }, [idAsString, error, router]);

  if (isLoading || !idAsString) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-32 w-32 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="min-h-screen pb-8 space-y-6">
      {/* Header com Gradiente */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow  -600 via-yellow-600 to-yellow-600 p-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative z-10">
          {/* Breadcrumb */}
          <Link
            href="/admin/veiculos/view"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Voltar para Veículos</span>
          </Link>

          {/* Título e Badge */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Car className="w-10 h-10" />
                {veiculo?.nome}
              </h1>
              <p className="text-white/90 text-lg">{veiculo?.descricao}</p>
            </div>
            <div className="flex gap-2">
              {!veiculo?.vendido ? (
                <Badge className="bg-green-500/80 text-white border-green-400/30 hover:bg-green-500 px-4 py-2 text-sm">
                  Disponível
                </Badge>
              ) : (
                <Badge className="bg-red-500/80 text-white border-red-400/30 hover:bg-red-500 px-4 py-2 text-sm">
                  Vendido
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Decoração de fundo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {veiculo && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna Principal - Informações Básicas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card: Informações Básicas */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-400" />
                Informações Básicas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<Car className="w-5 h-5 text-yellow-400" />}
                  label="Marca"
                  value={veiculo.marca}
                />
                <InfoItem
                  icon={<Hash className="w-5 h-5 text-yellow-400" />}
                  label="Placa"
                  value={veiculo.placa}
                />
                <InfoItem
                  icon={<Calendar className="w-5 h-5 text-yellow-400" />}
                  label="Ano"
                  value={veiculo.ano.toString()}
                />
                <InfoItem
                  icon={<Palette className="w-5 h-5 text-yellow-400" />}
                  label="Cor"
                  value={veiculo.cor}
                />
              </div>
            </div>

            {/* Card: Especificações Técnicas */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-yellow-400" />
                Especificações Técnicas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<Fuel className="w-5 h-5 text-yellow-400" />}
                  label="Combustível"
                  value={veiculo.combustivel}
                  capitalize
                />
                <InfoItem
                  icon={<Settings className="w-5 h-5 text-yellow-400" />}
                  label="Sistema"
                  value={veiculo.sistema}
                  capitalize
                />
                <InfoItem
                  icon={<Gauge className="w-5 h-5  text-yellow-400" />}
                  label="Quilometragem"
                  value={`${veiculo.quilometragem.toLocaleString("pt-BR")} km`}
                />
                <InfoItem
                  icon={<Tag className="w-5 h-5 text-yellow-400" />}
                  label="Tipo"
                  value={veiculo.tipo}
                  capitalize
                />
              </div>
            </div>
          </div>

          {/* Coluna Lateral - Detalhes Comerciais */}
          <div className="space-y-6">
            {/* Card: Valor */}
            <div className="rounded-2xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md border border-green-500/30 shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-green-500/20">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <span className="text-sm text-white/70 font-medium">
                  Valor do Veículo
                </span>
              </div>
              <p className="text-4xl font-bold text-white mb-4">
                {formatarPreco(veiculo.valor)}
              </p>
              <Separator className="my-4 bg-white/10" />
              <p className="text-xs text-white/60">
                Preço sujeito a negociação
              </p>
            </div>

            {/* Card: Localização */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-blue-500/30 shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-sm text-white/70 font-medium">
                  Localização
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-4">
                {veiculo.localizacao}
              </p>
              <Separator className="my-4 bg-white/10" />
              <p className="text-xs text-white/60">
                Endereço do veículo
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para exibir informações
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  capitalize?: boolean;
}

function InfoItem({ icon, label, value, capitalize }: InfoItemProps) {
  return (
    <div className="group">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
          {icon}
        </div>
        <span className="text-sm text-white/60 font-medium">{label}</span>
      </div>
      <p
        className={`text-lg font-semibold text-white pl-7 ${capitalize ? "capitalize" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
