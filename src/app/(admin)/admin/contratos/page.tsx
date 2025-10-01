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
  Loader2,
  UserCheck,
} from "lucide-react";
import { maskCPF, maskPlaca } from "@/utils/masks";
import { useBuscarClientePorCPF } from "@/hooks/useUsuario";
import { useBuscarVeiculoPorPlaca } from "@/hooks/useVeiculos";
import { useCreateContrato } from "@/hooks/useContratos";
import { Contrato } from "@/types/contrato";
import { gerarDocumentoContrato } from "@/utils/gerarContrato";
import { ClienteResponse } from "@/types/usuario";
import { Veiculo } from "@/types/veiculo";

const contratoSchema = z.object({
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine((cpf) => {
      const cpfLimpo = cpf.replace(/\D/g, "");
      return cpfLimpo.length === 11;
    }, "CPF deve conter 11 dígitos"),
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
  totalParcelas: z.coerce
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
  sinal: z.string().optional(),
});

type ContratoFormData = z.infer<typeof contratoSchema>;

export default function CadastroContrato() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBuscandoCliente, setIsBuscandoCliente] = useState(false);
  const [clienteEncontrado, setClienteEncontrado] = useState(false);
  const [isBuscandoVeiculo, setIsBuscandoVeiculo] = useState(false);
  const [veiculoEncontrado, setVeiculoEncontrado] = useState(false);
  const [cliente, setCliente] = useState<ClienteResponse | null>(null);
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);

  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [veiculoId, setVeiculoId] = useState<number | null>(null);

  const formatarValorInput = (valor: string): string => {
    const numeroLimpo = valor.replace(/[^\d]/g, "");
    if (!numeroLimpo) return "";

    const valorNumerico = parseFloat(numeroLimpo) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorNumerico);
  };

  const desformatarValor = (valor: string): number => {
    const valorLimpo = valor.replace(/[^\d,]/g, "").replace(",", ".");
    return parseFloat(valorLimpo);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ContratoFormData>({
    mode: "onSubmit",
    resolver: zodResolver(contratoSchema),
    defaultValues: {
      status: "ativo",
      parcelaAtual: 1,
    },
  });

  const { mutate: buscarCliente } = useBuscarClientePorCPF();
  const buscarClientePorCPF = async (cpf: string) => {
    if (!cpf || cpf.replace(/\D/g, "").length !== 11) return;

    setIsBuscandoCliente(true);
    setClienteEncontrado(false);
    setUsuarioId(null);

    buscarCliente(cpf, {
      onSuccess: (cliente) => {
        if (cliente) {
          setCliente(cliente);
          setValue("cliente", cliente.nome);
          setUsuarioId(cliente.id);
          setClienteEncontrado(true);
          toast.success("Cliente encontrado com sucesso!");
        } else {
          toast.error("Cliente não encontrado");
          setValue("cliente", "");
          setClienteEncontrado(false);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error("Erro ao buscar cliente:", error);
        const message =
          error.response?.status === 404
            ? "Cliente não encontrado"
            : "Erro ao buscar cliente. Tente novamente.";
        toast.error(message);
        setValue("cliente", "");
        setClienteEncontrado(false);
      },
      onSettled: () => {
        setIsBuscandoCliente(false);
      },
    });
  };

  const { mutate: buscarVeiculo } = useBuscarVeiculoPorPlaca();
  const buscarVeiculoPorPlaca = async (placa: string) => {
    if (!placa || placa.replace(/[^A-Za-z0-9]/g, "").length < 7) return;

    setIsBuscandoVeiculo(true);
    setVeiculoEncontrado(false);
    setVeiculoId(null);

    buscarVeiculo(placa, {
      onSuccess: (veiculo) => {
        if (veiculo) {
          setVeiculo(veiculo);
          setValue("carro", veiculo.nome);
          setVeiculoId(veiculo.id);
          setVeiculoEncontrado(true);
          toast.success("Veículo encontrado com sucesso!");
        } else {
          toast.error("Veículo não encontrado");
          setValue("carro", "");
          setVeiculoEncontrado(false);
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error("Erro ao buscar veículo:", error);
        const message =
          error.response?.status === 404
            ? "Veículo não encontrado"
            : "Erro ao buscar veículo. Tente novamente.";
        toast.error(message);
        setValue("carro", "");
        setVeiculoEncontrado(false);
      },
      onSettled: () => {
        setIsBuscandoVeiculo(false);
      },
    });
  };

  const { mutate: criarContratoMutation } = useCreateContrato();

  const onSubmit = async (data: ContratoFormData) => {
    if (!usuarioId) {
      toast.error("Busque e selecione um cliente válido antes de continuar.");
      return;
    }
    if (!veiculoId) {
      toast.error("Busque e selecione um veículo válido antes de continuar.");
      return;
    }

    setIsSubmitting(true);

    const dadosContrato: Contrato = {
      banco: data.banco,
      dataPagamento: data.dataPagamento,
      status: data.status,
      descricaoEntrada: data.descricaoEntrada,
      parcelaAtual: data.parcelaAtual,
      totalParcelas: data.totalParcelas,
      valorParcela: desformatarValor(data.valorParcela),
      valorTotalFinanciamento: desformatarValor(data.valorTotalFinanciamento),
      valorFinalEntrada: desformatarValor(data.valorFinalEntrada),
      usuarioId: usuarioId,
      veiculoId: veiculoId,
    };

    const avista = data.totalParcelas > 1 ? false : true;

    const dados = {
      compradorNome: cliente?.nome || "Erro ao buscar cliente",
      compradorCPF: cliente?.cpf || "Erro ao buscar cliente",
      compradorRG: cliente?.rg || "Erro ao buscar cliente",
      compradorNacionalidade:
        cliente?.nacionalidade || "Erro ao buscar cliente",
      compradorEstadoCivil: cliente?.estadoCivil || "Erro ao buscar cliente",
      compradorProfissao: cliente?.profissao || "Erro ao buscar cliente",
      compradorEndereco: cliente?.endereco || "Erro ao buscar cliente",
      compradorEnderecoNumero: cliente?.numero || "Erro ao buscar cliente",
      compradorCEP: cliente?.cep || "Erro ao buscar cliente",
      compradorBairro: cliente?.bairro || "Erro ao buscar cliente",
      compradorCidade: cliente?.cidade || "Erro ao buscar cliente",
      compradorEstado: cliente?.estado || "Erro ao buscar cliente",
      veiculoMarca: veiculo?.marca || "Erro ao buscar veiculo",
      veiculoModelo: veiculo?.nome || "Erro ao buscar veiculo",
      veiculoAno: veiculo?.ano || 0,
      veiculoPlaca: veiculo?.placa || "Erro ao buscar veiculo",
      veiculoRenavam: veiculo?.codigoCRV || "Erro ao buscar veiculo",
      veiculoCor: veiculo?.cor || "Erro ao buscar veiculo",
      veiculoQuilometragem: veiculo?.quilometragem || 0,
      avista: avista,
      parcelado: !avista,
      entradaDescricao: data.descricaoEntrada,
      totalParcelas: data.totalParcelas,
      valorParcela: data.valorParcela,
      valorEntrada: data.valorFinalEntrada,
      valorTotal: data.valorTotalFinanciamento,
      dataContrato: new Date().toLocaleDateString("pt-BR"),
      sinal: data.sinal || "Sem sinal",
    };

    criarContratoMutation(dadosContrato, {
      onSuccess: () => {
        toast.success("Contrato realizado com sucesso!");
        gerarDocumentoContrato(dados);
        router.push("/admin/contratos/view");
      },
      onError: (error) => {
        console.error("Erro ao criar contrato:", error);
        toast.error("Erro ao cadastrar contrato. Tente novamente.");
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
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
            {/* Seção: Informações do Cliente */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Informações do Cliente
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cpf" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      CPF do Cliente
                    </span>
                  </Label>
                  <div className="relative">
                    <Controller
                      control={control}
                      name="cpf"
                      render={({ field }) => (
                        <Input
                          id="cpf"
                          className={cn(
                            "transition-all duration-fast pr-10",
                            errors.cpf && "border-error border-dashed"
                          )}
                          placeholder="000.000.000-00"
                          value={maskCPF(field.value || "")}
                          onChange={(e) => {
                            const cpfLimpo = e.target.value;
                            field.onChange(cpfLimpo);
                            if (cpfLimpo.length === 14) {
                              buscarClientePorCPF(cpfLimpo);
                            }
                          }}
                          maxLength={14}
                        />
                      )}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {isBuscandoCliente && (
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      )}
                      {clienteEncontrado && !isBuscandoCliente && (
                        <UserCheck className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  {errors.cpf && (
                    <p className="text-xs text-error mt-1">
                      {errors.cpf.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cliente" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Nome do Cliente
                    </span>
                  </Label>
                  <Input
                    id="cliente"
                    className={cn(
                      "transition-all duration-fast bg-muted",
                      errors.cliente && "border-error border-dashed"
                    )}
                    placeholder="Busque pelo CPF"
                    readOnly
                    {...register("cliente")}
                  />
                  {errors.cliente && (
                    <p className="text-xs text-error mt-1">
                      {errors.cliente.message}
                    </p>
                  )}
                  {clienteEncontrado && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" />
                      Cliente encontrado
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção: Informações do Veículo */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Car className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Informações do Veículo
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="placa" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      Placa do Veículo
                    </span>
                  </Label>
                  <div className="relative">
                    <Controller
                      control={control}
                      name="placa"
                      render={({ field }) => (
                        <Input
                          id="placa"
                          className={cn(
                            "transition-all duration-fast uppercase pr-10",
                            errors.placa && "border-error border-dashed"
                          )}
                          placeholder="ABC-1234 ou ABC1D23"
                          value={maskPlaca(field.value || "")}
                          onChange={(e) => {
                            const valorDigitado = e.target.value;
                            field.onChange(valorDigitado); // mantém exatamente como digitado

                            // remove tudo exceto letras, números e hífen
                            const placaLimpa = valorDigitado.replace(
                              /[^A-Za-z0-9-]/g,
                              ""
                            );
                            if (placaLimpa.replace("-", "").length >= 7) {
                              buscarVeiculoPorPlaca(placaLimpa);
                            }
                          }}
                          maxLength={8}
                        />
                      )}
                    />

                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      {isBuscandoVeiculo && (
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      )}
                      {veiculoEncontrado && !isBuscandoVeiculo && (
                        <Car className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  {errors.placa && (
                    <p className="text-xs text-error mt-1">
                      {errors.placa.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="carro" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Car className="w-4 h-4" />
                      Modelo do Veículo
                    </span>
                  </Label>
                  <Input
                    id="carro"
                    className={cn(
                      "transition-all duration-fast bg-muted",
                      errors.carro && "border-error border-dashed"
                    )}
                    placeholder="Busque pela placa"
                    readOnly
                    {...register("carro")}
                  />
                  {errors.carro && (
                    <p className="text-xs text-error mt-1">
                      {errors.carro.message}
                    </p>
                  )}
                  {veiculoEncontrado && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <Car className="w-3 h-3" />
                      Veículo encontrado
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
                <div className="space-y-1.5 ">
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
                  <Label
                    htmlFor="totalParcelas"
                    className="text-sm font-medium"
                  >
                    Total de Parcelas
                  </Label>
                  <Input
                    id="totalParcelas"
                    type="number"
                    min="1"
                    className={cn(
                      "transition-all duration-fast",
                      errors.totalParcelas && "border-error border-dashed"
                    )}
                    placeholder="Ex: 48"
                    {...register("totalParcelas")}
                  />
                  {errors.totalParcelas && (
                    <p className="text-xs text-error mt-1">
                      {errors.totalParcelas.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sinal" className="text-sm font-medium">
                    Sinal
                  </Label>
                  <Input
                    id="sinal"
                    type="text"
                    className={cn(
                      "transition-all duration-fast",
                      errors.sinal && "border-error border-dashed"
                    )}
                    placeholder="R$ 5.000,00 + Veículo"
                    {...register("sinal")}
                  />
                  {errors.sinal && (
                    <p className="text-xs text-error mt-1">
                      {errors.sinal.message}
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
              disabled={
                isSubmitting || !clienteEncontrado || !veiculoEncontrado
              }
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
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
