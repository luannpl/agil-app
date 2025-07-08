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

const veiculoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  placa: z.string().min(1, "Placa é obrigatória"),
  modelo: z.string().min(1, "Modelo é obrigatório"),
  ano: z.string().min(4, "Ano é obrigatório").max(4, "Ano deve ter 4 dígitos"),
  valor: z.string().min(1, "Valor é obrigatório"),
  cor: z.string().min(1, "Cor é obrigatória"),
  tipo: z.enum(["carro", "moto", "caminhao"], {
    errorMap: (issue) => {
      if (issue.code === "invalid_type") {
        return { message: "Tipo deve ser carro, moto ou caminhão" };
      }
      return { message: "Tipo é obrigatório" };
    },
  }),
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
    mode: "all",
    resolver: zodResolver(veiculoSchema),
  });

  const { mutate: cadastrarVeiculo, isPending } = useCreateVeiculo();
  const onSubmit = (data: VeiculoFormData) => {
    cadastrarVeiculo(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Veículo cadastrado com sucesso!");
        router.push("/auth/signin");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: AxiosError<any>) => {
        toast.error(error?.response?.data?.message || "Erro ao cadastrar o veículo.");
      },
    });
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Cadastrar veículo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input placeholder="Digite o nome do veículo" {...register("nome")} />
            {errors.nome && (
              <p className="text-sm text-red-500 ml-2">{errors.nome.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input placeholder="Digite a placa do veículo" {...register("placa")} />
            {errors.placa && (
              <p className="text-sm text-red-500 ml-2">{errors.placa.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input placeholder="Digite o modelo do veículo" {...register("modelo")} />
            {errors.modelo && (
              <p className="text-sm text-red-500 ml-2 ">{errors.modelo.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input placeholder="Digite o ano do veículo" {...register("ano")} />
            {errors.ano && (
              <p className="text-sm text-red-500 ml-2">{errors.ano.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-full">
            <Input placeholder="Digite o valor do veículo" {...register("valor")} />
            {errors.valor && (
              <p className="text-sm text-red-500 ml-2">{errors.valor.message}</p>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input placeholder="Digite a cor do veículo" {...register("cor")} />
            {errors.cor && (
              <p className="text-sm text-red-500 ml-2">{errors.cor.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <Controller
            control={control}
            name="tipo"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
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
            <p className="text-sm text-red-500 ml-2">{errors.tipo.message}</p>
          )}
        </div>

        <Button className="cursor-pointer text-foreground" variant="default" type="submit" disabled={isPending}>
          {isPending ? "Cadastrando..." : "Cadastrar Veículo"}
        </Button>
      </form>
    </>
  );
}
