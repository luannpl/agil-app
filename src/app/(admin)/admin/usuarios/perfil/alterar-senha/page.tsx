"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Lock, Shield, Key, Eye, EyeOff } from "lucide-react";
import { useAlterarSenha } from "@/hooks/useUsuario";
import { AxiosError } from "axios";

const alterarSenhaSchema = z
  .object({
    senhaAtual: z.string().min(1, "Senha atual é obrigatória"),
    novaSenha: z.string().min(4, "Nova senha deve ter no mínimo 4 caracteres"),
    confirmarNovaSenha: z
      .string()
      .min(4, "Confirmação da nova senha é obrigatória"),
  })
  .refine((data) => data.novaSenha === data.confirmarNovaSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarNovaSenha"],
  })
  .refine((data) => data.senhaAtual !== data.novaSenha, {
    message: "A nova senha deve ser diferente da senha atual",
    path: ["novaSenha"],
  });

type AlterarSenhaFormData = z.infer<typeof alterarSenhaSchema>;

export default function AlterarSenha() {
  const router = useRouter();
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AlterarSenhaFormData>({
    mode: "onSubmit",
    resolver: zodResolver(alterarSenhaSchema),
  });

  const { mutate: alterarSenha, isPending } = useAlterarSenha();

  const onSubmit = async (data: AlterarSenhaFormData) => {
    alterarSenha(data, {
      onSuccess: () => {
        toast.success("Senha alterada com sucesso!");
        reset();
        router.push("/admin/usuarios/perfil");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: AxiosError<any>) => {
        const responseData = error.response?.data;

        const mensagem =
          responseData?.error ||
          responseData?.errors?.[0]?.message ||
          responseData?.message ||
          "Erro ao alterar a senha. Tente novamente.";
        toast.error(mensagem);
        reset();
      },
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="w-full px-4 py-6 ">
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Shield className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Alterar Senha
            </h1>
          </div>
          <p className="text-muted-foreground text-sm lg:text-base ">
            Mantenha sua conta segura alterando sua senha regularmente
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Verificação de Segurança
                </h2>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="senhaAtual" className="text-sm font-medium">
                  Senha Atual
                </Label>
                <div className="relative">
                  <Input
                    id="senhaAtual"
                    type={showSenhaAtual ? "text" : "password"}
                    className={cn(
                      "transition-all duration-fast pr-10",
                      errors.senhaAtual && "border-error border-dashed"
                    )}
                    placeholder="Digite sua senha atual"
                    {...register("senhaAtual")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showSenhaAtual ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.senhaAtual && (
                  <p className="text-xs text-error mt-1">
                    {errors.senhaAtual.message}
                  </p>
                )}
              </div>
            </div>

            {/* Seção: Nova Senha */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Key className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Nova Senha
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="novaSenha" className="text-sm font-medium">
                    Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="novaSenha"
                      type={showNovaSenha ? "text" : "password"}
                      className={cn(
                        "transition-all duration-fast pr-10",
                        errors.novaSenha && "border-error border-dashed"
                      )}
                      placeholder="Digite a nova senha"
                      {...register("novaSenha")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNovaSenha(!showNovaSenha)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showNovaSenha ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.novaSenha && (
                    <p className="text-xs text-error mt-1">
                      {errors.novaSenha.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="confirmarNovaSenha"
                    className="text-sm font-medium"
                  >
                    Confirmar Nova Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmarNovaSenha"
                      type={showConfirmarSenha ? "text" : "password"}
                      className={cn(
                        "transition-all duration-fast pr-10",
                        errors.confirmarNovaSenha &&
                          "border-error border-dashed"
                      )}
                      placeholder="Confirme a nova senha"
                      {...register("confirmarNovaSenha")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmarSenha ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmarNovaSenha && (
                    <p className="text-xs text-error mt-1">
                      {errors.confirmarNovaSenha.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Dicas de Segurança */}
              <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                <h3 className="text-sm font-medium text-foreground mb-2">
                  Dicas para uma senha segura:
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Use pelo menos 8 caracteres</li>
                  <li>
                    • Combine letras maiúsculas, minúsculas, números e símbolos
                  </li>
                  <li>
                    • Evite informações pessoais como nome, data de nascimento
                  </li>
                  <li>• Não reutilize senhas de outras contas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
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
                  Alterando...
                </span>
              ) : (
                "Alterar Senha"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
