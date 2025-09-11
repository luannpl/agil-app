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

const veiculoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  marca: z.string().min(1, "Marca é obrigatória"),
  ano: z.coerce
    .number()
    .min(1900, "Ano inválido")
    .max(new Date().getFullYear(), "Ano inválido"),
  placa: z.string().min(1, "Placa é obrigatória"),
  valor: z
    .string()
    .min(1, "Valor é obrigatório")
    .refine((val) => {
      const valorNumerico = val.replace(/[^\d,]/g, "").replace(",", ".");
      const numero = parseFloat(valorNumerico);
      return !isNaN(numero) && numero > 0;
    }, "Valor deve ser maior que zero"),
  cor: z.string().min(1, "Cor é obrigatória"),
  quilometragem: z.coerce.number().min(1, "Quilometragem é obrigatória"),
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
    [
      "manual",
      "automatico",
      "cvt",
      "semi-automatico",
      "carburador",
      "injeção",
    ],
    {
      errorMap: () => {
        return { message: "Sistema é obrigatório" };
      },
    }
  ),
  imagem: z
    .custom<File>((val) => val instanceof File, {
      message: "Imagem deve ser um arquivo válido",
    })
    .optional(),
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
    },
  });

  const { mutate: cadastrarVeiculo, isPending } = useCreateVeiculo();
  const onSubmit = (data: VeiculoFormData) => {
    console.log(data);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "imagem") {
        // Se for o campo valor, converter de volta para número
        if (key === "valor" && typeof value === "string") {
          const valorNumerico = removerFormatacao(value);
          formData.append(key, String(valorNumerico));
        } else {
          formData.append(key, String(value));
        }
      }
    });
    console.log(files);
    if (files && files.length > 0) {
      formData.append("imagem", files[0]);
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
    <>
      <h1 className="text-2xl font-bold">Cadastrar veículo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              className={errors.nome ? "border-error border-dashed" : ""}
              placeholder="Nome do veículo"
              {...register("nome")}
            />
            {errors.nome && (
              <p className="text-sm text-error ml-2">{errors.nome.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={errors.descricao ? "border-error border-dashed" : ""}
              placeholder="Descrição do veículo"
              {...register("descricao")}
            />
            {errors.descricao && (
              <p className="text-sm text-error ml-2">
                {errors.descricao.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              className={errors.marca ? "border-error border-dashed" : ""}
              placeholder="Marca do veículo"
              {...register("marca")}
            />
            {errors.marca && (
              <p className="text-sm text-error ml-2 ">{errors.marca.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={errors.ano ? "border-error border-dashed" : ""}
              placeholder="Ano do veículo"
              {...register("ano")}
            />
            {errors.ano && (
              <p className="text-sm text-error ml-2">{errors.ano.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              className={errors.placa ? "border-error border-dashed" : ""}
              placeholder="Placa do veículo"
              {...register("placa")}
            />
            {errors.placa && (
              <p className="text-sm text-error ml-2">{errors.placa.message}</p>
            )}
          </div>
          <div className="w-full">
            <Controller
              control={control}
              name="valor"
              render={({ field }) => (
                <Input
                  className={errors.valor ? "border-error border-dashed" : ""}
                  placeholder="Valor do veículo"
                  value={field.value || ""}
                  onChange={(e) => {
                    const valorFormatado = formatarValorInput(e.target.value);
                    field.onChange(valorFormatado);
                  }}
                />
              )}
            />
            {errors.valor && (
              <p className="text-sm text-error ml-2">{errors.valor.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              className={errors.cor ? "border-error border-dashed" : ""}
              placeholder="Cor do veículo"
              {...register("cor")}
            />
            {errors.cor && (
              <p className="text-sm text-error ml-2">{errors.cor.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={
                errors.quilometragem ? "border-error border-dashed" : ""
              }
              placeholder="Quilometragem do veículo"
              {...register("quilometragem")}
            />
            {errors.quilometragem && (
              <p className="text-sm text-error ml-2">
                {errors.quilometragem.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              className={errors.localizacao ? "border-error border-dashed" : ""}
              placeholder="Localização do veículo"
              {...register("localizacao")}
            />
            {errors.localizacao && (
              <p className="text-sm text-error ml-2">
                {errors.localizacao.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Controller
              control={control}
              name="combustivel"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={
                      errors.combustivel
                        ? "border-error border-dashed w-full"
                        : "w-full"
                    }
                  >
                    <SelectValue placeholder="Escolha o combustível do veículo" />
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
              <p className="text-sm text-error ml-2">
                {errors.combustivel.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Controller
              control={control}
              name="tipo"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={
                      errors.tipo
                        ? "border-error border-dashed w-full"
                        : "w-full"
                    }
                  >
                    <SelectValue placeholder="Escolha o tipo do veículo" />
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
              <p className="text-sm text-error ml-2">{errors.tipo.message}</p>
            )}
          </div>
          <div className="w-full">
            <Controller
              control={control}
              name="sistema"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    className={
                      errors.sistema
                        ? "border-error border-dashed w-full"
                        : "w-full"
                    }
                  >
                    <SelectValue placeholder="Escolha o sistema do veículo" />
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
              <p className="text-sm text-error ml-2">
                {errors.sistema.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full">
          <UploadImage files={files} onFilesChange={setFiles} />
        </div>

        <Button
          className="cursor-pointer text-foreground"
          variant="auth"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Cadastrando..." : "Cadastrar Veículo"}
        </Button>
      </form>
    </>
  );
}
