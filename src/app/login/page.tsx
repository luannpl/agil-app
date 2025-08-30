"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLoginUsuario } from "@/hooks/useUsuario";
import { LoginForm } from "@/types/usuario";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useEffect } from "react"; // Importe o useEffect
import { Skeleton } from "@/components/ui/skeleton";

const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  senha: z.string().min(1, "Senha é obrigatória"),
});

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading, refetchUser } = useAuth(); // Pegue o isLoading também

  // Use useEffect para o redirecionamento
  useEffect(() => {
    // Só redirecione se o carregamento terminou e o usuário existe
    if (!isLoading && user) {
      router.push("/admin/");
    }
  }, [user, isLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });
  const { mutate: login, isPending } = useLoginUsuario();
  const handleLogin = (data: LoginForm) => {
    login(data, {
      onSuccess: async () => {
        await refetchUser();
        router.replace("/admin/");
      },
      onError: (error) => {
        if (error.response?.status === 401) {
          toast.error("Email ou senha inválidos");
        } else {
          toast.error("Erro ao fazer login");
        }
      },
    });
  };

  // Se estiver carregando ou se o usuário já estiver logado (e o redirect vai acontecer),
  // mostre um loader para evitar um "flash" do formulário.
  if (isLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen md:flex-row bg-whiteF">
      <div className="relative hidden flex-1 md:block">
        <Image
          src="/agil-logo.webp"
          alt="Logo Agil"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex items-center justify-center flex-1 p-6 bg-gradient-to-br from-stone-900 to-yellow-600/80 md:p-10">
        <Card className="w-full max-w-sm shadow-yellow-500/50 bg-stone-950 py-8">
          <CardHeader>
            <CardTitle>Entre na sua conta</CardTitle>
            <CardDescription>
              Digite seu email e senha para acessar sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500"
                    id="email"
                    type="text"
                    placeholder="agil@email.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-error ml-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                  </div>
                  <Input
                    className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500"
                    id="senha"
                    type="password"
                    placeholder="senha"
                    {...register("senha")}
                  />
                  {errors.senha && (
                    <p className="text-sm text-error ml-2">
                      {errors.senha.message}
                    </p>
                  )}
                </div>
                <div className="flex-col gap-2">
                  <Button
                    type="submit"
                    className="w-full cursor-pointer text-foreground"
                    variant="auth"
                    disabled={isPending}
                  >
                    {isPending ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-center gap-2">
            <p className="text-sm text-muted-foreground">Agil Veiculos Admin</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
