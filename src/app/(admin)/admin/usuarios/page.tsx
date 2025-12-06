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
import { Label } from "@/components/ui/label";
import { useCreateUsuario } from "@/hooks/useUsuario";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { cn } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  Lock,
  Shield,
  Calendar,
  CreditCard,
  MapPin,
  FileText,
  Info,
} from "lucide-react";
import { maskCEP, maskCPF, maskPhone } from "@/utils/masks";
import { useEffect, useState, useCallback } from "react";
import { CreateUsuarioDTO } from "@/types/usuario";

const usuarioSchema = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("Email inválido"),
    telefone: z.string().min(1, "Telefone é obrigatório"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmarSenha: z.string().min(6, "Confirmação de senha é obrigatória"),
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
    bairro: z.string().optional(),
    cidade: z.string().optional(),
    estado: z.string().optional(),
    complemento: z.string().optional(),
    descricao: z.string().optional(),
    profissao: z.string().optional(),
    estadoCivil: z.string().optional(),
    nacionalidade: z.string().optional(),
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
    setValue,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    mode: "onSubmit",
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
      confirmarSenha: "",
      tipo: undefined,
      dataNasc: "",
      cpf: "",
      rg: "",
      cnh: "",
      cep: "",
      endereco: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      complemento: "",
      descricao: "",
      profissao: "",
      estadoCivil: "",
      nacionalidade: "",
    },
  });

  const [buscandoCep, setBuscandoCep] = useState(false);

  const buscarCep = useCallback(async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    setBuscandoCep(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      // Atualiza os campos no formulário
      setValue("endereco", data.logradouro || "");
      setValue("bairro", data.bairro || "");
      setValue("cidade", data.localidade || "");
      setValue("estado", data.uf || "");

      toast.success("Endereço preenchido automaticamente!");
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      toast.error("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setBuscandoCep(false);
    }
  }, [setValue]);

  // Monitora o valor do campo CEP
  const cepValue = watch("cep");

  // Dispara busca automática ao digitar CEP válido
  useEffect(() => {
    const cepLimpo = cepValue?.replace(/\D/g, "");
    if (cepLimpo?.length === 8) {
      buscarCep(cepValue!);
    }
  }, [cepValue, buscarCep]);

  const { mutate: cadastrarUsuario, isPending } = useCreateUsuario();

  const onSubmit = (data: UsuarioFormData) => {
    const payload =
      data.tipo === "cliente"
        ? data
        : {
            nome: data.nome!,
            email: data.email!,
            telefone: data.telefone!,
            senha: data.senha!,
            tipo: data.tipo!,
          };

    cadastrarUsuario(payload as CreateUsuarioDTO, {
      onSuccess: (res) => {
        toast.success(res.message || "Usuário cadastrado com sucesso!");
        router.push("/admin/usuarios/view");
      },
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: AxiosError<any>) => {
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
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="w-full px-4 py-6 ">
        {/* Header */}
        <div className="mb-8 ">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <User className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Cadastrar Usuário
            </h1>
          </div>
          <p className="text-muted-foreground">
            Preencha todos os campos para adicionar um novo usuário ao sistema
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
                    Nome Completo
                  </Label>
                  <Input
                    id="nome"
                    type="text"
                    className={cn(
                      "transition-all duration-fast",
                      errors.nome && "border-error border-dashed"
                    )}
                    placeholder="Ex: João Silva Santos"
                    {...register("nome")}
                  />
                  {errors.nome && (
                    <p className="text-xs text-error mt-1">
                      {errors.nome.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      Email
                    </span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className={cn(
                      "transition-all duration-fast",
                      errors.email && "border-error border-dashed"
                    )}
                    placeholder="Ex: joao@exemplo.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-error mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="telefone" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      Telefone
                    </span>
                  </Label>
                  <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="telefone"
                        type="text"
                        className={cn(
                          "transition-all duration-fast",
                          errors.telefone && "border-error border-dashed"
                        )}
                        placeholder="Ex: (85) 99999-9999"
                        {...field}
                        onChange={(e) => {
                          field.onChange(maskPhone(e.target.value));
                        }}
                      />
                    )}
                  />
                  {errors.telefone && (
                    <p className="text-xs text-error mt-1">
                      {errors.telefone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="tipo" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Tipo de Usuário
                    </span>
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
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="vendedor">Vendedor</SelectItem>
                          {/* <SelectItem value="despachante">
                            Despachante
                          </SelectItem> */}
                          <SelectItem value="cliente">Cliente</SelectItem>
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
              </div>
            </div>

            {/* Seção: Credenciais de Acesso */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-foreground">
                  Credenciais de Acesso
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="senha" className="text-sm font-medium">
                    Senha
                  </Label>
                  <Input
                    id="senha"
                    type="password"
                    className={cn(
                      "transition-all duration-fast",
                      errors.senha && "border-error border-dashed"
                    )}
                    placeholder="Mínimo 6 caracteres"
                    {...register("senha")}
                  />
                  {errors.senha && (
                    <p className="text-xs text-error mt-1">
                      {errors.senha.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="confirmarSenha"
                    className="text-sm font-medium"
                  >
                    Confirmar Senha
                  </Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    className={cn(
                      "transition-all duration-fast",
                      errors.confirmarSenha && "border-error border-dashed"
                    )}
                    placeholder="Confirme a senha"
                    {...register("confirmarSenha")}
                  />
                  {errors.confirmarSenha && (
                    <p className="text-xs text-error mt-1">
                      {errors.confirmarSenha.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Seção: Informações do Cliente (Condicional) */}
            {tipoSelecionado === "cliente" && (
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Documentos Pessoais
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="dataNasc" className="text-sm font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Data de Nascimento
                      </span>
                    </Label>
                    <Input
                      id="dataNasc"
                      type="date"
                      className={cn(
                        "transition-all duration-fast",
                        errors.dataNasc && "border-error border-dashed"
                      )}
                      {...register("dataNasc")}
                    />
                    {errors.dataNasc && (
                      <p className="text-xs text-error mt-1">
                        {errors.dataNasc.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="cpf" className="text-sm font-medium">
                      CPF
                    </Label>
                    <Controller
                      name="cpf"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="cpf"
                          type="text"
                          className={cn(
                            "transition-all duration-fast",
                            errors.cpf && "border-error border-dashed"
                          )}
                          placeholder="000.000.000-00"
                          {...field}
                          onChange={(e) => {
                            field.onChange(maskCPF(e.target.value));
                          }}
                        />
                      )}
                    />
                    {errors.cpf && (
                      <p className="text-xs text-error mt-1">
                        {errors.cpf.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="rg" className="text-sm font-medium">
                      RG
                    </Label>
                    <Input
                      id="rg"
                      type="text"
                      className={cn(
                        "transition-all duration-fast",
                        errors.rg && "border-error border-dashed"
                      )}
                      placeholder="0000.0000.000"
                      {...register("rg")}
                      maxLength={11}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="cnh" className="text-sm font-medium">
                      CNH
                    </Label>
                    <Input
                      id="cnh"
                      type="text"
                      className={cn(
                        "transition-all duration-fast",
                        errors.cnh && "border-error border-dashed"
                      )}
                      placeholder="00000000000"
                      {...register("cnh")}
                      maxLength={9}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="nacionalidade"
                      className="text-sm font-medium"
                    >
                      Nacionalidade
                    </Label>
                    <Input
                      id="nacionalidade"
                      type="text"
                      className={cn(
                        "transition-all duration-fast",
                        errors.nacionalidade && "border-error border-dashed"
                      )}
                      placeholder="Brasileiro"
                      {...register("nacionalidade")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="nacionalidade"
                      className="text-sm font-medium"
                    >
                      Profissão
                    </Label>
                    <Input
                      id="profissao"
                      type="text"
                      className={cn(
                        "transition-all duration-fast",
                        errors.profissao && "border-error border-dashed"
                      )}
                      placeholder="Autonomo, etc."
                      {...register("profissao")}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="nacionalidade"
                    className="text-sm font-medium"
                  >
                    Estado Civil
                  </Label>
                  <Input
                    id="estadoCivil"
                    type="text"
                    className={cn(
                      "transition-all duration-fast",
                      errors.estadoCivil && "border-error border-dashed"
                    )}
                    placeholder="Casado, Solteiro, etc."
                    {...register("estadoCivil")}
                  />
                </div>
              </div>
            )}

            {/* Seção: Endereço (Condicional) */}
            {tipoSelecionado === "cliente" && (
              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Endereço
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Campo CEP */}
                  <div className="space-y-1.5">
                    <Label htmlFor="cep" className="text-sm font-medium">
                      CEP
                    </Label>
                    <Controller
                      name="cep"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <Input
                            id="cep"
                            type="text"
                            className={cn(
                              "transition-all duration-fast pr-10",
                              errors.cep && "border-error border-dashed"
                            )}
                            placeholder="00000-000"
                            {...field}
                            onChange={(e) => {
                              const value = maskCEP(e.target.value);
                              field.onChange(value);
                              // Busca automática quando o CEP tiver 8 dígitos
                              if (value.replace(/\D/g, "").length === 8) {
                                buscarCep(value);
                              }
                            }}
                          />
                          {buscandoCep && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                              <span className="w-4 h-4 border-2 border-muted-foreground/40 border-t-yellow-500 rounded-full animate-spin" />
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>

                  {/* Endereço */}
                  <div className="space-y-1.5">
                    <Label htmlFor="endereco" className="text-sm font-medium">
                      Endereço
                    </Label>
                    <Input
                      id="endereco"
                      type="text"
                      readOnly
                      className={cn(
                        "transition-all duration-fast bg-muted/50 cursor-not-allowed",
                        errors.endereco && "border-error border-dashed"
                      )}
                      placeholder="Rua, Avenida, etc."
                      {...register("endereco")}
                    />
                  </div>

                  {/* Número */}
                  <div className="space-y-1.5">
                    <Label htmlFor="numero" className="text-sm font-medium">
                      Número
                    </Label>
                    <Input
                      id="numero"
                      type="text"
                      className={cn(
                        "transition-all duration-fast",
                        errors.numero && "border-error border-dashed"
                      )}
                      placeholder="123"
                      {...register("numero")}
                    />
                  </div>

                  {/* Complemento */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="complemento"
                      className="text-sm font-medium"
                    >
                      Complemento
                    </Label>
                    <Input
                      id="complemento"
                      type="text"
                      className={cn(
                        "transition-all duration-fast",
                        errors.complemento && "border-error border-dashed"
                      )}
                      placeholder="Apt, Casa, etc."
                      {...register("complemento")}
                    />
                  </div>

                  {/* Bairro */}
                  <div className="space-y-1.5">
                    <Label htmlFor="bairro" className="text-sm font-medium">
                      Bairro
                    </Label>
                    <Input
                      id="bairro"
                      type="text"
                      readOnly
                      className={cn(
                        "transition-all duration-fast bg-muted/50 cursor-not-allowed",
                        errors.bairro && "border-error border-dashed"
                      )}
                      placeholder="Centro, etc."
                      {...register("bairro")}
                    />
                  </div>

                  {/* Cidade */}
                  <div className="space-y-1.5">
                    <Label htmlFor="cidade" className="text-sm font-medium">
                      Cidade
                    </Label>
                    <Input
                      id="cidade"
                      type="text"
                      readOnly
                      className={cn(
                        "transition-all duration-fast bg-muted/50 cursor-not-allowed",
                        errors.cidade && "border-error border-dashed"
                      )}
                      placeholder="Fortaleza, Maracanaú, etc."
                      {...register("cidade")}
                    />
                  </div>
                </div>

                {/* Estado */}
                <div className="space-y-1.5">
                  <Label htmlFor="estado" className="text-sm font-medium">
                    Estado
                  </Label>
                  <Input
                    id="estado"
                    type="text"
                    readOnly
                    className={cn(
                      "transition-all duration-fast bg-muted/50 cursor-not-allowed",
                      errors.estado && "border-error border-dashed"
                    )}
                    placeholder="Ceará, Maranhão, etc."
                    {...register("estado")}
                  />
                </div>

                {/* Observações */}
                <div className="space-y-1.5">
                  <Label htmlFor="descricao" className="text-sm font-medium">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Observações
                    </span>
                  </Label>
                  <Textarea
                    id="descricao"
                    className={cn(
                      "min-h-[100px] resize-none transition-all duration-fast",
                      errors.descricao && "border-error border-dashed"
                    )}
                    placeholder="Informações adicionais sobre o cliente..."
                    {...register("descricao")}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/usuarios")}
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
                "Cadastrar Usuário"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
