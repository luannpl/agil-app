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
import { Textarea } from "@/components/ui/textarea";
import { useCreateUsuario } from "@/hooks/useUsuario";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const usuarioSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(1, "Telefone é obrigatório"),
    senha: z.string().min(4, "Senha deve ter no mínimo 4 caracteres"),
    confirmarSenha: z.string().min(4, "Confirmação de senha é obrigatória"),
    tipo: z.enum(["admin", "vendedor", "despachante", "cliente"], {
      errorMap: () => {
        return { message: "Tipo é obrigatório" };
      },
    }),
    dataNasc: z.string().optional(),
    cpf: z.string().optional(),
    rg: z.string().optional(),
    cnh: z.string().optional(),
    cep: z.string().optional(),
    endereco: z.string().optional(),
    numero: z.string().optional(),
    complemento: z.string().optional(),
    descricao: z.string().optional(),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"], // Define qual campo receberá a mensagem de erro e o foco
  });

type UsuarioFormData = z.infer<typeof usuarioSchema>;
export default function CadastroUsuario() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    mode: "onSubmit",
    resolver: zodResolver(usuarioSchema),
  });

  const { mutate: cadastrarUsuario, isPending } = useCreateUsuario();

  const onSubmit = (data: UsuarioFormData) => {
    cadastrarUsuario(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Usuário cadastrado com sucesso!");
        router.push("/admin/usuarios");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: AxiosError<any>) => {
        // Tenta extrair a mensagem de erro de várias formas
        const responseData = error.response?.data;

        const mensagem =
          responseData?.error ||
          responseData?.errors?.[0]?.message ||
          responseData?.message ||
          "Erro ao cadastrar usuário";

        toast.error(mensagem);
      },
    });
  };

  const tipoSelecionado = watch("tipo");

  return (
    <>
      <h1 className="text-2xl font-bold text-foreground">Cadastrar usuário</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              className={errors.nome ? "border-error border-dashed" : ""}
              placeholder="Nome do usuário"
              type="text"
              {...register("nome")}
            />
            {errors.nome && (
              <p className="text-sm text-error ml-2">{errors.nome.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={errors.email ? "border-error border-dashed" : ""}
              placeholder="Email do usuário"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-error ml-2">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              className={errors.telefone ? "border-error border-dashed" : ""}
              placeholder="Telefone do usuário"
              type="text"
              {...register("telefone")}
            />
            {errors.telefone && (
              <p className="text-sm text-error ml-2">
                {errors.telefone.message}
              </p>
            )}
          </div>
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
                    <SelectValue placeholder="Escolha o tipo do usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="vendedor">Vendedor</SelectItem>
                    <SelectItem value="despachante">Despachante</SelectItem>
                    <SelectItem value="cliente">Cliente</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tipo && (
              <p className="text-sm text-error ml-2">{errors.tipo.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full">
            <Input
              className={errors.senha ? "border-error border-dashed" : ""}
              placeholder="Senha do usuário"
              type="password"
              {...register("senha")}
            />
            {errors.senha && (
              <p className="text-sm text-error ml-2">{errors.senha.message}</p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={
                errors.confirmarSenha ? "border-error border-dashed" : ""
              }
              placeholder="Confirme a senha do usuário"
              type="password"
              {...register("confirmarSenha")}
            />
            {errors.confirmarSenha && (
              <p className="text-sm text-error ml-2">
                {errors.confirmarSenha.message}
              </p>
            )}
          </div>
        </div>
        {tipoSelecionado === "cliente" && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Input
                className={errors.dataNasc ? "border-error border-dashed" : ""}
                placeholder="Data de Nascimento"
                type="date"
                {...register("dataNasc")}
              />
              {errors.dataNasc && (
                <p className="text-sm text-error ml-2">
                  {errors.dataNasc.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                className={errors.cpf ? "border-error border-dashed" : ""}
                placeholder="CPF"
                type="text"
                {...register("cpf")}
              />
              {errors.cpf && (
                <p className="text-sm text-error ml-2">{errors.cpf.message}</p>
              )}
            </div>
          </div>
        )}

        {tipoSelecionado === "cliente" && (
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <Input
                className={errors.rg ? "border-error border-dashed" : ""}
                placeholder="RG"
                type="text"
                {...register("rg")}
              />
            </div>
            <div className="w-full">
              <Input
                className={errors.cnh ? "border-error border-dashed" : ""}
                placeholder="CNH"
                type="text"
                {...register("cnh")}
              />
            </div>
          </div>
        )}

        {tipoSelecionado === "cliente" && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <Input
                  className={errors.cep ? "border-error border-dashed" : ""}
                  placeholder="CEP"
                  type="text"
                  {...register("cep")}
                />
              </div>
              <div className="w-full">
                <Input
                  className={
                    errors.endereco ? "border-error border-dashed" : ""
                  }
                  placeholder="Endereço"
                  type="text"
                  {...register("endereco")}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <Input
                  className={errors.numero ? "border-error border-dashed" : ""}
                  placeholder="Número"
                  type="text"
                  {...register("numero")}
                />
              </div>
              <div className="w-full">
                <Input
                  className={
                    errors.complemento ? "border-error border-dashed" : ""
                  }
                  placeholder="Complemento"
                  type="text"
                  {...register("complemento")}
                />
              </div>
            </div>

            <div className="w-full">
              <Textarea
                className={errors.descricao ? "border-error border-dashed" : ""}
                placeholder="Descrição"
                {...register("descricao")}
              />
            </div>
          </div>
        )}

        <Button
          className="cursor-pointer text-white w-full"
          variant="auth"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Cadastrando..." : "Cadastrar Usuário"}
        </Button>
      </form>
    </>
  );
}
