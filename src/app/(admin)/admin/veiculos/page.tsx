"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateVeiculo } from "@/hooks/useVeiculos";
import { AxiosError } from "axios";
import UploadImage from "@/components/admin/uploadImage/uploadImage";
import { formatarPreco } from "@/utils/formatarPreco";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Car,
  DollarSign,
  MapPin,
  Fuel,
  Settings2,
  Info,
  Shield,
  FileCheck,
} from "lucide-react";
import { formatarQuilometragem } from "@/utils/formatarQuilometragem";
import { maskPlaca } from "@/utils/masks";

const veiculoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  marca: z.string().min(1, "Marca é obrigatória"),
  ano: z
    .string()
    .regex(/^\d{4}$/, "O ano deve conter exatamente 4 dígitos.")
    .refine((val) => {
      const year = parseInt(val, 10);
      return year >= 1900 && year <= new Date().getFullYear();
    }, `O ano deve ser entre 1900 e ${new Date().getFullYear()}.`),
  placa: z
    .string()
    .regex(
      /^([A-Z]{3}-?\d{4}|[A-Z]{3}-?\d[A-Z]\d{2})$/,
      "A placa deve estar no formato ABC-1234 ou ABC-1D23"
    )
    .transform((val) => val.toUpperCase()),

  valor: z
    .string()
    .min(1, "Valor é obrigatório")
    .refine((val) => {
      const valorNumerico = val.replace(/[^\d,]/g, "").replace(",", ".");
      const numero = parseFloat(valorNumerico);
      return !isNaN(numero) && numero > 0;
    }, "Valor deve ser maior que zero"),
  cor: z.string().min(1, "Cor é obrigatória"),
  quilometragem: z
    .string()
    .min(1, "Quilometragem é obrigatória")
    .refine((val) => {
      const valorNumerico = parseInt(val.replace(/\./g, ""), 10);
      return !isNaN(valorNumerico) && valorNumerico > 0;
    }, "Quilometragem deve ser maior que zero"),
  localizacao: z.string().min(1, "Localização é obrigatória"),
  combustivel: z.enum(
    ["gasolina", "diesel", "etanol", "flex", "eletrico", "hibrido"],
    {
      errorMap: () => {
        return { message: "Combustível é obrigatório" };
      },
    }
  ),
  tipo: z.enum(["carro", "moto", "caminhao"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_type") {
        return { message: "Tipo deve ser carro, moto ou caminhão" };
      }
      return { message: "Tipo é obrigatório" };
    },
  }),
  sistema: z.enum(
    ["manual", "automatico", "cvt", "semi-automatico", "carburador", "injeção"],
    {
      errorMap: () => {
        return { message: "Sistema é obrigatório" };
      },
    }
  ),
  quitado: z.boolean(),
  rastreador: z.boolean(),
  seguro: z.boolean(),
  regularizado: z.boolean(),
  transferido: z.boolean(),
  codigoCRV: z.string().optional(),
  infoAdicionais: z.string().optional(),
});

type VeiculoFormData = z.infer<typeof veiculoSchema>;

export default function CadastroVeiculo() {
  const router = useRouter();
  const [files, setFiles] = useState<File[] | undefined>();

  // Função para remover formatação e extrair valor numérico
  const removerFormatacao = (valorFormatado: string): number => {
    const valorNumerico = valorFormatado
      .replace(/[^\d,]/g, "") // Remove tudo exceto dígitos e vírgula
      .replace(",", "."); // Troca vírgula por ponto
    return parseFloat(valorNumerico) || 0;
  };

  // Função para formatar valor enquanto digita
  const formatarValorInput = (valor: string): string => {
    const numeroLimpo = valor.replace(/[^\d]/g, ""); // Remove tudo que não é dígito
    if (!numeroLimpo) return "";

    const valorNumerico = parseFloat(numeroLimpo) / 100; // Divide por 100 para considerar centavos
    return formatarPreco(valorNumerico);
  };

  // Função para formatar a placa enquanto digita

  // Função para formatar a quilometragem enquanto digita
  const formatarQuilometragemInput = (valor: string): string => {
    const numeroLimpo = valor.replace(/[^\d]/g, "");
    if (!numeroLimpo) return "";
    return formatarQuilometragem(parseInt(numeroLimpo, 10));
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VeiculoFormData>({
    mode: "onSubmit",
    resolver: zodResolver(veiculoSchema),
    defaultValues: {
      localizacao: "Fortaleza - CE",
      rastreador: false,
      seguro: false,
      regularizado: false,
      transferido: false,
      quitado: false,
    },
  });

  const { mutate: cadastrarVeiculo, isPending } = useCreateVeiculo();

  const onSubmit = (data: VeiculoFormData) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "imagens") {
        if (key === "valor" && typeof value === "string") {
          const valorNumerico = removerFormatacao(value);
          formData.append(key, String(valorNumerico));
        } else if (key === "quilometragem" && typeof value === "string") {
          const valorNumerico = parseInt(value.replace(/\./g, ""), 10);
          formData.append(key, String(valorNumerico));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    console.log(files);
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("imagens", file);
      });
    }

    cadastrarVeiculo(formData, {
      onSuccess: (res) => {
        toast.success(res.message || "Veículo cadastrado com sucesso!");
        router.push("/admin/veiculos/view");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: AxiosError<any>) => {
        toast.error(
          error?.response?.data?.message || "Erro ao cadastrar o veículo."
        );
      },
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="w-full px-4 py-4">
        {/* Header */}
        <div className="mb-8 ">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Car className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Cadastrar Veículo
            </h1>
          </div>
          <p className="text-muted-foreground">
            Preencha todos os campos para adicionar um novo veículo ao sistema
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Card Principal */}
          <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 lg:p-8 space-y-6">
            {/* Seção: Informações Básicas */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Informações Básicas
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="nome" className="text-sm font-medium">
                    Nome do Veículo
                  </Label>
                  <Input
                    id="nome"
                    className={cn(
                      "transition-all duration-fast",
                      errors.nome && "border-error border-dashed"
                    )}
                    placeholder="Ex: Honda Civic 2020"
                    {...register("nome")}
                  />
                  {errors.nome && (
                    <p className="text-xs text-error mt-1">
                      {errors.nome.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="descricao" className="text-sm font-medium">
                    Descrição
                  </Label>
                  <Input
                    id="descricao"
                    className={cn(
                      "transition-all duration-fast",
                      errors.descricao && "border-error border-dashed"
                    )}
                    placeholder="Ex: Sedan executivo completo"
                    {...register("descricao")}
                  />
                  {errors.descricao && (
                    <p className="text-xs text-error mt-1">
                      {errors.descricao.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="marca" className="text-sm font-medium">
                    Marca
                  </Label>
                  <Input
                    id="marca"
                    className={cn(
                      "transition-all duration-fast",
                      errors.marca && "border-error border-dashed"
                    )}
                    placeholder="Ex: Honda"
                    {...register("marca")}
                  />
                  {errors.marca && (
                    <p className="text-xs text-error mt-1">
                      {errors.marca.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ano" className="text-sm font-medium">
                    Ano
                  </Label>
                  <Input
                    id="ano"
                    maxLength={4}
                    className={cn(
                      "transition-all duration-fast",
                      errors.ano && "border-error border-dashed"
                    )}
                    placeholder="Ex: 2020"
                    {...register("ano")}
                  />
                  {errors.ano && (
                    <p className="text-xs text-error mt-1">
                      {errors.ano.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção: Detalhes do Veículo */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Settings2 className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Detalhes do Veículo
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="placa" className="text-sm font-medium">
                    Placa
                  </Label>
                  <Controller
                    control={control}
                    name="placa"
                    render={({ field }) => (
                      <Input
                        id="placa"
                        className={cn(
                          "transition-all duration-fast uppercase",
                          errors.placa && "border-error border-dashed"
                        )}
                        placeholder="Ex: ABC-1234"
                        value={field.value || ""}
                        onChange={(e) => {
                          const valorFormatado = maskPlaca(e.target.value);
                          field.onChange(valorFormatado);
                        }}
                      />
                    )}
                  />
                  {errors.placa && (
                    <p className="text-xs text-error mt-1">
                      {errors.placa.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="valor" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Valor
                    </span>
                  </Label>
                  <Controller
                    control={control}
                    name="valor"
                    render={({ field }) => (
                      <Input
                        id="valor"
                        className={cn(
                          "transition-all duration-fast",
                          errors.valor && "border-error border-dashed"
                        )}
                        placeholder="R$ 0,00"
                        value={field.value || ""}
                        onChange={(e) => {
                          const valorFormatado = formatarValorInput(
                            e.target.value
                          );
                          field.onChange(valorFormatado);
                        }}
                      />
                    )}
                  />
                  {errors.valor && (
                    <p className="text-xs text-error mt-1">
                      {errors.valor.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cor" className="text-sm font-medium">
                    Cor
                  </Label>
                  <Input
                    id="cor"
                    className={cn(
                      "transition-all duration-fast",
                      errors.cor && "border-error border-dashed"
                    )}
                    placeholder="Ex: Prata"
                    {...register("cor")}
                  />
                  {errors.cor && (
                    <p className="text-xs text-error mt-1">
                      {errors.cor.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="quilometragem"
                    className="text-sm font-medium"
                  >
                    Quilometragem
                  </Label>
                  <Controller
                    control={control}
                    name="quilometragem"
                    render={({ field }) => (
                      <Input
                        id="quilometragem"
                        className={cn(
                          "transition-all duration-fast",
                          errors.quilometragem && "border-error border-dashed"
                        )}
                        placeholder="Ex: 50.000"
                        value={field.value || ""}
                        onChange={(e) => {
                          const valorFormatado = formatarQuilometragemInput(
                            e.target.value
                          );
                          field.onChange(valorFormatado);
                        }}
                      />
                    )}
                  />
                  {errors.quilometragem && (
                    <p className="text-xs text-error mt-1">
                      {errors.quilometragem.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="localizacao" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Localização
                    </span>
                  </Label>
                  <Input
                    id="localizacao"
                    className={cn(
                      "transition-all duration-fast",
                      errors.localizacao && "border-error border-dashed"
                    )}
                    placeholder="Ex: São Paulo - SP"
                    {...register("localizacao")}
                  />
                  {errors.localizacao && (
                    <p className="text-xs text-error mt-1">
                      {errors.localizacao.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="codigoCRV" className="text-sm font-medium">
                    Código CRV
                  </Label>
                  <Input
                    id="codigoCRV"
                    className={cn(
                      "transition-all duration-fast",
                      errors.codigoCRV && "border-error border-dashed"
                    )}
                    placeholder="Ex: 123456789"
                    {...register("codigoCRV")}
                  />
                  {errors.codigoCRV && (
                    <p className="text-xs text-error mt-1">
                      {errors.codigoCRV.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção: Especificações Técnicas */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Fuel className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Especificações Técnicas
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="combustivel" className="text-sm font-medium">
                    Combustível
                  </Label>
                  <Controller
                    control={control}
                    name="combustivel"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="combustivel"
                          className={cn(
                            "transition-all duration-fast w-full",
                            errors.combustivel && "border-error border-dashed"
                          )}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gasolina">Gasolina</SelectItem>
                          <SelectItem value="diesel">Diesel</SelectItem>
                          <SelectItem value="etanol">Etanol</SelectItem>
                          <SelectItem value="flex">Flex</SelectItem>
                          <SelectItem value="eletrico">Elétrico</SelectItem>
                          <SelectItem value="hibrido">Híbrido</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.combustivel && (
                    <p className="text-xs text-error mt-1">
                      {errors.combustivel.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="tipo" className="text-sm font-medium">
                    Tipo de Veículo
                  </Label>
                  <Controller
                    control={control}
                    name="tipo"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="tipo"
                          className={cn(
                            "transition-all duration-fast w-full",
                            errors.tipo && "border-error border-dashed"
                          )}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="carro">Carro</SelectItem>
                          <SelectItem value="moto">Moto</SelectItem>
                          <SelectItem value="caminhao">Caminhão</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.tipo && (
                    <p className="text-xs text-error mt-1">
                      {errors.tipo.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="sistema" className="text-sm font-medium">
                    Sistema/Transmissão
                  </Label>
                  <Controller
                    control={control}
                    name="sistema"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="sistema"
                          className={cn(
                            "transition-all duration-fast w-full",
                            errors.sistema && "border-error border-dashed"
                          )}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="automatico">Automático</SelectItem>
                          <SelectItem value="cvt">CVT</SelectItem>
                          <SelectItem value="semi-automatico">
                            Semi-Automático
                          </SelectItem>
                          <SelectItem value="carburador">Carburador</SelectItem>
                          <SelectItem value="injeção">Injeção</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.sistema && (
                    <p className="text-xs text-error mt-1">
                      {errors.sistema.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção: Segurança e Documentação */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Segurança e Documentação
                </h2>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  <Controller
                    control={control}
                    name="rastreador"
                    render={({ field }) => (
                      <div className="flex items-center  space-x-3">
                        <Label
                          htmlFor="rastreador"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Rastreador
                        </Label>
                        <Switch
                          id="rastreador"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="seguro"
                    render={({ field }) => (
                      <div className="flex items-center  space-x-3">
                        <Label
                          htmlFor="seguro"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Seguro
                        </Label>
                        <Switch
                          id="seguro"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="regularizado"
                    render={({ field }) => (
                      <div className="flex items-center  space-x-3">
                        <Label
                          htmlFor="regularizado"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Regularizado
                        </Label>
                        <Switch
                          id="regularizado"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="transferido"
                    render={({ field }) => (
                      <div className="flex items-center  space-x-3">
                        <Label
                          htmlFor="transferido"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Transferido
                        </Label>
                        <Switch
                          id="transferido"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="quitado"
                    render={({ field }) => (
                      <div className="flex items-center  space-x-3">
                        <Label
                          htmlFor="quitado"
                          className="text-sm font-medium cursor-pointer"
                        >
                          Quitado
                        </Label>
                        <Switch
                          id="quitado"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-yellow-500"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Seção: Informações Adicionais e Imagem */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <FileCheck className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Informações Adicionais
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="infoAdicionais"
                    className="text-sm font-medium"
                  >
                    Observações
                  </Label>
                  <Textarea
                    id="infoAdicionais"
                    className={cn(
                      "min-h-[165px] resize-none transition-all duration-fast",
                      errors.infoAdicionais && "border-error border-dashed"
                    )}
                    placeholder="Adicione informações complementares sobre o veículo..."
                    {...register("infoAdicionais")}
                  />
                  {errors.infoAdicionais && (
                    <p className="text-xs text-error mt-1">
                      {errors.infoAdicionais.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    Imagem do Veículo
                  </Label>
                  <UploadImage files={files} onFilesChange={setFiles} />
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/veiculos/view")}
              className="w-full sm:w-auto order-2 sm:order-1"
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition-all duration-200 order-1 sm:order-2"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Cadastrando...
                </span>
              ) : (
                "Cadastrar Veículo"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
