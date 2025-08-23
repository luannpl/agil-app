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
import React from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateVeiculo } from "@/hooks/useVeiculos";
import { AxiosError } from "axios";
import UploadImage from "@/components/admin/uploadImage/uploadImage";

const veiculoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  marca: z.string().min(1, "Marca é obrigatória"),
  ano: z.coerce
    .number()
    .min(1900, "Ano inválido")
    .max(new Date().getFullYear(), "Ano inválido"),
  placa: z.string().min(1, "Placa é obrigatória"),
  valor: z.coerce.number().min(1, "Valor é obrigatório"),
  cor: z.string().min(1, "Cor é obrigatória"),
  quilometragem: z.coerce.number().min(1, "Quilometragem é obrigatória"),
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
      "injetado",
    ],
    {
      errorMap: () => {
        return { message: "Sistema é obrigatório" };
      },
    }
  ),
});

type VeiculoFormData = z.infer<typeof veiculoSchema>;

export default function CadastroVeiculo() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VeiculoFormData>({
    mode: "onSubmit",
    resolver: zodResolver(veiculoSchema),
  });

  const { mutate: cadastrarVeiculo, isPending } = useCreateVeiculo();
  const onSubmit = (data: VeiculoFormData) => {
    console.log(data);
    cadastrarVeiculo(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Veículo cadastrado com sucesso!");
        router.push("/veiculos/view");
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
        <div className="flex gap-4">
          <div className="w-full">
            <Input
              className={errors.nome ? "border-error border-dashed" : ""}
              placeholder="Digite o nome do veículo"
              {...register("nome")}
            />
            {errors.nome && (
              <p className="text-sm text-error ml-2">{errors.nome.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={errors.descricao ? "border-error border-dashed" : ""}
              placeholder="Digite a descrição do veículo"
              {...register("descricao")}
            />
            {errors.descricao && (
              <p className="text-sm text-error ml-2">
                {errors.descricao.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <Input
              className={errors.marca ? "border-error border-dashed" : ""}
              placeholder="Digite a marca do veículo"
              {...register("marca")}
            />
            {errors.marca && (
              <p className="text-sm text-error ml-2 ">{errors.marca.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={errors.ano ? "border-error border-dashed" : ""}
              placeholder="Digite o ano do veículo"
              {...register("ano")}
            />
            {errors.ano && (
              <p className="text-sm text-error ml-2">{errors.ano.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <Input
              className={errors.placa ? "border-error border-dashed" : ""}
              placeholder="Digite a placa do veículo"
              {...register("placa")}
            />
            {errors.placa && (
              <p className="text-sm text-error ml-2">{errors.placa.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={errors.valor ? "border-error border-dashed" : ""}
              placeholder="Digite o valor do veículo"
              {...register("valor")}
            />
            {errors.valor && (
              <p className="text-sm text-error ml-2">{errors.valor.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <Input
              className={errors.cor ? "border-error border-dashed" : ""}
              placeholder="Digite a cor do veículo"
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
              placeholder="Digite a quilometragem do veículo"
              {...register("quilometragem")}
            />
            {errors.quilometragem && (
              <p className="text-sm text-error ml-2">
                {errors.quilometragem.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-4">
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
          <UploadImage />
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
