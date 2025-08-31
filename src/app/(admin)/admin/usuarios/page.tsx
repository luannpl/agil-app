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
import { useCreateUsuario } from "@/hooks/useUsuario";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const usuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(4, "Senha deve ter no mínimo 4 caracteres"),
  tipo: z.enum(["admin", "vendedor", "despachante", "cliente"], {
    errorMap: () => {
      return { message: "Tipo é obrigatório" };
    },
  }),
});

type UsuarioFormData = z.infer<typeof usuarioSchema>;
export default function CadastroUsuario() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    mode: "onSubmit",
    resolver: zodResolver(usuarioSchema),
  });

  const { mutate: cadastrarUsuario, isPending } = useCreateUsuario();

  const onSubmit = (data: UsuarioFormData) => {
    console.log(data);
    cadastrarUsuario(data, {
      onSuccess: (res) => {
        toast.success(res.message || "Usuário cadastrado com sucesso!");
        router.push("/admin/usuarios");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: AxiosError<any>) => {
        toast.error(
          error?.response?.data?.message || "Erro ao cadastrar usuário"
        );
      },
    });
  };
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
