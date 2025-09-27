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
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  FileText,
  Users,
  Car,
  CreditCard,
  Calendar,
  DollarSign,
  Building,
  Hash,
  CheckCircle,
  Info,
} from "lucide-react";

const contratoSchema = z.object({
  cliente: z.string().min(1, "Cliente é obrigatório"),
  carro: z.string().min(1, "Carro é obrigatório"),
  placa: z.string().min(1, "Placa é obrigatória"),
  banco: z.string().min(1, "Banco é obrigatório"),
  dataPagamento: z.string().min(1, "Data de pagamento é obrigatória"),
  valorParcela: z
    .string()
    .min(1, "Valor da parcela é obrigatório")
    .refine((val) => {
      const valorNumerico = val.replace(/[^\d,]/g, "").replace(",", ".");
      const numero = parseFloat(valorNumerico);
      return !isNaN(numero) && numero > 0;
    }, "Valor deve ser maior que zero"),
  parcelaAtual: z.coerce.number().min(1, "Parcela atual deve ser no mínimo 1"),
  status: z.enum(["ativo", "pago", "atrasado", "cancelado"], {
    errorMap: () => {
      return { message: "Status é obrigatório" };
    },
  }),
  numeroParcela: z.coerce
    .number()
    .min(1, "Número de parcelas deve ser no mínimo 1"),
  valorTotalFinanciamento: z
    .string()
    .min(1, "Valor total do financiamento é obrigatório")
    .refine((val) => {
      const valorNumerico = val.replace(/[^\d,]/g, "").replace(",", ".");
      const numero = parseFloat(valorNumerico);
      return !isNaN(numero) && numero > 0;
    }, "Valor deve ser maior que zero"),
  valorFinalEntrada: z
    .string()
    .min(1, "Valor final da entrada é obrigatório")
    .refine((val) => {
      const valorNumerico = val.replace(/[^\d,]/g, "").replace(",", ".");
      const numero = parseFloat(valorNumerico);
      return !isNaN(numero) && numero >= 0;
    }, "Valor da entrada deve ser válido"),
  descricaoEntrada: z.string().min(1, "Descrição da entrada é obrigatória"),
});

type ContratoFormData = z.infer<typeof contratoSchema>;

export default function CadastroContrato() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para formatar valor enquanto digita
  const formatarValorInput = (valor: string): string => {
    const numeroLimpo = valor.replace(/[^\d]/g, "");
    if (!numeroLimpo) return "";

    const valorNumerico = parseFloat(numeroLimpo) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorNumerico);
  };

  // Função para remover formatação
  //   const removerFormatacao = (valorFormatado: string): number => {
  //     const valorNumerico = valorFormatado
  //       .replace(/[^\d,]/g, "")
  //       .replace(",", ".");
  //     return parseFloat(valorNumerico) || 0;
  //   };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContratoFormData>({
    mode: "onSubmit",
    resolver: zodResolver(contratoSchema),
    defaultValues: {
      status: "ativo",
      parcelaAtual: 1,
    },
  });

  const onSubmit = async (data: ContratoFormData) => {
    setIsSubmitting(true);
    console.log("Dados do formulário:", data);

    try {
      // Aqui você colocaria sua lógica de API para criar o contrato
      // Exemplo:
      // const response = await criarContratoAPI(data);

      // Simulando requisição
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Contrato cadastrado com sucesso!");
      router.push("/admin/contratos");
    } catch (error) {
      toast.error("Erro ao cadastrar contrato. Tente novamente." + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="w-full px-4 py-6 ">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Cadastrar Contrato
            </h1>
          </div>
          <p className="text-muted-foreground text-sm lg:text-base ml-11">
            Preencha todos os campos para criar um novo contrato de
            financiamento
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Card Principal */}
          <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 space-y-6">
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
                  <Label htmlFor="cliente" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Cliente
                    </span>
                  </Label>
                  <Input
                    id="cliente"
                    className={cn(
                      "transition-all duration-fast",
                      errors.cliente && "border-error border-dashed"
                    )}
                    placeholder="Nome do cliente"
                    {...register("cliente")}
                  />
                  {errors.cliente && (
                    <p className="text-xs text-error mt-1">
                      {errors.cliente.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="carro" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      Veículo
                    </span>
                  </Label>
                  <Input
                    id="carro"
                    className={cn(
                      "transition-all duration-fast",
                      errors.carro && "border-error border-dashed"
                    )}
                    placeholder="Modelo do veículo"
                    {...register("carro")}
                  />
                  {errors.carro && (
                    <p className="text-xs text-error mt-1">
                      {errors.carro.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="placa" className="text-sm font-medium">
                    Placa
                  </Label>
                  <Input
                    id="placa"
                    className={cn(
                      "transition-all duration-fast uppercase",
                      errors.placa && "border-error border-dashed"
                    )}
                    placeholder="ABC-1234"
                    {...register("placa")}
                  />
                  {errors.placa && (
                    <p className="text-xs text-error mt-1">
                      {errors.placa.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="banco" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      Banco
                    </span>
                  </Label>
                  <Input
                    id="banco"
                    className={cn(
                      "transition-all duration-fast",
                      errors.banco && "border-error border-dashed"
                    )}
                    placeholder="Nome do banco"
                    {...register("banco")}
                  />
                  {errors.banco && (
                    <p className="text-xs text-error mt-1">
                      {errors.banco.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção: Dados do Financiamento */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Dados do Financiamento
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="dataPagamento"
                    className="text-sm font-medium"
                  >
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Data de Pagamento
                    </span>
                  </Label>
                  <Input
                    id="dataPagamento"
                    type="date"
                    className={cn(
                      "transition-all duration-fast",
                      errors.dataPagamento && "border-error border-dashed"
                    )}
                    {...register("dataPagamento")}
                  />
                  {errors.dataPagamento && (
                    <p className="text-xs text-error mt-1">
                      {errors.dataPagamento.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="valorParcela" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Valor da Parcela
                    </span>
                  </Label>
                  <Controller
                    control={control}
                    name="valorParcela"
                    render={({ field }) => (
                      <Input
                        id="valorParcela"
                        className={cn(
                          "transition-all duration-fast",
                          errors.valorParcela && "border-error border-dashed"
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
                  {errors.valorParcela && (
                    <p className="text-xs text-error mt-1">
                      {errors.valorParcela.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="parcelaAtual" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      Parcela Atual
                    </span>
                  </Label>
                  <Input
                    id="parcelaAtual"
                    type="number"
                    min="1"
                    className={cn(
                      "transition-all duration-fast",
                      errors.parcelaAtual && "border-error border-dashed"
                    )}
                    placeholder="1"
                    {...register("parcelaAtual")}
                  />
                  {errors.parcelaAtual && (
                    <p className="text-xs text-error mt-1">
                      {errors.parcelaAtual.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="status" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Status
                    </span>
                  </Label>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="status"
                          className={cn(
                            "transition-all duration-fast w-full",
                            errors.status && "border-error border-dashed"
                          )}
                        >
                          <SelectValue placeholder="Selecione o status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ativo">Ativo</SelectItem>
                          <SelectItem value="pago">Pago</SelectItem>
                          <SelectItem value="atrasado">Atrasado</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status && (
                    <p className="text-xs text-error mt-1">
                      {errors.status.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="numeroParcela"
                    className="text-sm font-medium"
                  >
                    Total de Parcelas
                  </Label>
                  <Input
                    id="numeroParcela"
                    type="number"
                    min="1"
                    className={cn(
                      "transition-all duration-fast",
                      errors.numeroParcela && "border-error border-dashed"
                    )}
                    placeholder="Ex: 48"
                    {...register("numeroParcela")}
                  />
                  {errors.numeroParcela && (
                    <p className="text-xs text-error mt-1">
                      {errors.numeroParcela.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="valorTotalFinanciamento"
                    className="text-sm font-medium"
                  >
                    Valor Total do Financiamento
                  </Label>
                  <Controller
                    control={control}
                    name="valorTotalFinanciamento"
                    render={({ field }) => (
                      <Input
                        id="valorTotalFinanciamento"
                        className={cn(
                          "transition-all duration-fast",
                          errors.valorTotalFinanciamento &&
                            "border-error border-dashed"
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
                  {errors.valorTotalFinanciamento && (
                    <p className="text-xs text-error mt-1">
                      {errors.valorTotalFinanciamento.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção: Entrada */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Entrada
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="valorFinalEntrada"
                    className="text-sm font-medium"
                  >
                    Valor Final da Entrada
                  </Label>
                  <Controller
                    control={control}
                    name="valorFinalEntrada"
                    render={({ field }) => (
                      <Input
                        id="valorFinalEntrada"
                        className={cn(
                          "transition-all duration-fast",
                          errors.valorFinalEntrada &&
                            "border-error border-dashed"
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
                  {errors.valorFinalEntrada && (
                    <p className="text-xs text-error mt-1">
                      {errors.valorFinalEntrada.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="descricaoEntrada"
                    className="text-sm font-medium"
                  >
                    Descrição da Entrada
                  </Label>
                  <Input
                    id="descricaoEntrada"
                    className={cn(
                      "transition-all duration-fast",
                      errors.descricaoEntrada && "border-error border-dashed"
                    )}
                    placeholder="Ex: R$ 5.000 em dinheiro + Fiat Uno 2015"
                    {...register("descricaoEntrada")}
                  />
                  {errors.descricaoEntrada && (
                    <p className="text-xs text-error mt-1">
                      {errors.descricaoEntrada.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/contratos")}
              className="w-full sm:w-auto order-2 sm:order-1"
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition-all duration-200 order-1 sm:order-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Cadastrando...
                </span>
              ) : (
                "Cadastrar Contrato"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
