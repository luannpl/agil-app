"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUsuarioById } from "@/hooks/useUsuario";
import { ClienteResponse } from "@/types/usuario";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  ArrowLeft,
  Shield,
  UserCog,
  ShoppingCart,
  Edit,
  Save,
  X,
  MapPin,
  CreditCard,
  Briefcase,
  Heart,
  Globe,
  Calendar,
  FileText,
  Home,
} from "lucide-react";

export default function DetalhesUsuarioPage() {
  const { id } = useParams();
  const router = useRouter();

  const idAsString = Array.isArray(id) ? id[0] : id;

  const { data: usuario, isLoading, error } = useUsuarioById(idAsString);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<ClienteResponse>>({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    rg: "",
    cnh: "",
    dataNasc: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    profissao: "",
    estadoCivil: "",
    nacionalidade: "",
    descricao: "",
  });

  useEffect(() => {
    if (!idAsString) {
      router.push("/admin/usuarios");
      return;
    }

    if (error instanceof AxiosError) {
      toast.error("Usuário não encontrado");
      router.push("/admin/usuarios/view");
    }
  }, [idAsString, error, router]);

  useEffect(() => {
    if (usuario) {
      const clienteData = usuario as ClienteResponse;
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        cpf: clienteData.cpf || "",
        rg: clienteData.rg || "",
        cnh: clienteData.cnh || "",
        dataNasc: clienteData.dataNasc || "",
        cep: clienteData.cep || "",
        endereco: clienteData.endereco || "",
        numero: clienteData.numero || "",
        complemento: clienteData.complemento || "",
        bairro: clienteData.bairro || "",
        cidade: clienteData.cidade || "",
        estado: clienteData.estado || "",
        profissao: clienteData.profissao || "",
        estadoCivil: clienteData.estadoCivil || "",
        nacionalidade: clienteData.nacionalidade || "",
        descricao: clienteData.descricao || "",
      });
    }
  }, [usuario]);

  const handleSave = () => {
    // TODO: Implementar chamada à API para atualizar usuário
    toast.success("Usuário atualizado com sucesso!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (usuario) {
      const clienteData = usuario as ClienteResponse;
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        cpf: clienteData.cpf || "",
        rg: clienteData.rg || "",
        cnh: clienteData.cnh || "",
        dataNasc: clienteData.dataNasc || "",
        cep: clienteData.cep || "",
        endereco: clienteData.endereco || "",
        numero: clienteData.numero || "",
        complemento: clienteData.complemento || "",
        bairro: clienteData.bairro || "",
        cidade: clienteData.cidade || "",
        estado: clienteData.estado || "",
        profissao: clienteData.profissao || "",
        estadoCivil: clienteData.estadoCivil || "",
        nacionalidade: clienteData.nacionalidade || "",
        descricao: clienteData.descricao || "",
      });
    }
    setIsEditing(false);
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "admin":
        return Shield;
      case "vendedor":
        return UserCog;
      case "cliente":
        return ShoppingCart;
      default:
        return User;
    }
  };

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "admin":
        return "bg-purple-500/80 text-white border-purple-400/30 hover:bg-purple-500";
      case "vendedor":
        return "bg-orange-500/80 text-white border-orange-400/30 hover:bg-orange-500";
      case "cliente":
        return "bg-green-500/80 text-white border-green-400/30 hover:bg-green-500";
      default:
        return "bg-blue-500/80 text-white border-blue-400/30 hover:bg-blue-500";
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "admin":
        return "Administrador";
      case "vendedor":
        return "Vendedor";
      case "cliente":
        return "Cliente";
      case "despachante":
        return "Despachante";
      default:
        return tipo;
    }
  };

  const isCliente = usuario?.tipo === "cliente";

  if (isLoading || !idAsString) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-32 w-32 rounded-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
    );
  }

  if (error) {
    return null;
  }

  const TipoIcon = usuario ? getTipoIcon(usuario.tipo) : User;
  const clienteData = usuario as ClienteResponse;

  return (
    <div className="min-h-screen pb-8 space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header com Gradiente */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 p-6 sm:p-8 shadow-2xl">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="relative z-10">
          {/* Breadcrumb */}
          <Link
            href="/admin/usuarios/view"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Voltar para Usuários</span>
          </Link>

          {/* Título e Badge */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 flex items-center gap-3 break-words">
                <TipoIcon className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
                <span className="truncate">{usuario?.nome}</span>
              </h1>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg truncate">{usuario?.email}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {usuario && (
                <Badge className={`${getTipoBadgeColor(usuario.tipo)} px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-nowrap`}>
                  {getTipoLabel(usuario.tipo)}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Decoração de fundo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {usuario && (
        <div className={`grid grid-cols-1 ${isCliente ? 'lg:grid-cols-1' : 'lg:grid-cols-3'} gap-6`}>
          {/* Coluna Principal - Informações do Usuário */}
          <div className={`${isCliente ? 'w-full' : 'lg:col-span-2'} space-y-6`}>
            {/* Card: Informações Pessoais */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Informações Pessoais</span>
                </h2>
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto"
                    size="sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      onClick={handleSave}
                      className="bg-green-500 hover:bg-green-600 text-white flex-1 sm:flex-none"
                      size="sm"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-none"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-green-400" />
                        Nome Completo
                      </Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="bg-white/10 border-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-green-400" />
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/10 border-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="text-sm font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4 text-green-400" />
                        Telefone
                      </Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        className="bg-white/10 border-white/20"
                      />
                    </div>

                    {/* Campos adicionais para Cliente */}
                    {isCliente && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="cpf" className="text-sm font-medium flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-green-400" />
                            CPF
                          </Label>
                          <Input
                            id="cpf"
                            value={formData.cpf}
                            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                            className="bg-white/10 border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rg" className="text-sm font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4 text-green-400" />
                            RG
                          </Label>
                          <Input
                            id="rg"
                            value={formData.rg}
                            onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                            className="bg-white/10 border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cnh" className="text-sm font-medium flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-green-400" />
                            CNH
                          </Label>
                          <Input
                            id="cnh"
                            value={formData.cnh}
                            onChange={(e) => setFormData({ ...formData, cnh: e.target.value })}
                            className="bg-white/10 border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dataNasc" className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-green-400" />
                            Data de Nascimento
                          </Label>
                          <Input
                            id="dataNasc"
                            type="date"
                            value={formData.dataNasc}
                            onChange={(e) => setFormData({ ...formData, dataNasc: e.target.value })}
                            className="bg-white/10 border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="profissao" className="text-sm font-medium flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-green-400" />
                            Profissão
                          </Label>
                          <Input
                            id="profissao"
                            value={formData.profissao}
                            onChange={(e) => setFormData({ ...formData, profissao: e.target.value })}
                            className="bg-white/10 border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="estadoCivil" className="text-sm font-medium flex items-center gap-2">
                            <Heart className="w-4 h-4 text-green-400" />
                            Estado Civil
                          </Label>
                          <Input
                            id="estadoCivil"
                            value={formData.estadoCivil}
                            onChange={(e) => setFormData({ ...formData, estadoCivil: e.target.value })}
                            className="bg-white/10 border-white/20"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nacionalidade" className="text-sm font-medium flex items-center gap-2">
                            <Globe className="w-4 h-4 text-green-400" />
                            Nacionalidade
                          </Label>
                          <Input
                            id="nacionalidade"
                            value={formData.nacionalidade}
                            onChange={(e) => setFormData({ ...formData, nacionalidade: e.target.value })}
                            className="bg-white/10 border-white/20"
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <InfoItem
                      icon={<User className="w-5 h-5" />}
                      label="Nome Completo"
                      value={usuario.nome}
                    />
                    <InfoItem
                      icon={<Mail className="w-5 h-5" />}
                      label="E-mail"
                      value={usuario.email}
                    />
                    <InfoItem
                      icon={<Phone className="w-5 h-5" />}
                      label="Telefone"
                      value={usuario.telefone}
                    />

                    {/* Campos adicionais para Cliente */}
                    {isCliente && (
                      <>
                        {clienteData.cpf && (
                          <InfoItem
                            icon={<CreditCard className="w-5 h-5" />}
                            label="CPF"
                            value={clienteData.cpf}
                          />
                        )}
                        {clienteData.rg && (
                          <InfoItem
                            icon={<FileText className="w-5 h-5" />}
                            label="RG"
                            value={clienteData.rg}
                          />
                        )}
                        {clienteData.cnh && (
                          <InfoItem
                            icon={<CreditCard className="w-5 h-5" />}
                            label="CNH"
                            value={clienteData.cnh}
                          />
                        )}
                        {clienteData.dataNasc && (
                          <InfoItem
                            icon={<Calendar className="w-5 h-5" />}
                            label="Data de Nascimento"
                            value={new Date(clienteData.dataNasc).toLocaleDateString("pt-BR")}
                          />
                        )}
                        {clienteData.profissao && (
                          <InfoItem
                            icon={<Briefcase className="w-5 h-5" />}
                            label="Profissão"
                            value={clienteData.profissao}
                          />
                        )}
                        {clienteData.estadoCivil && (
                          <InfoItem
                            icon={<Heart className="w-5 h-5" />}
                            label="Estado Civil"
                            value={clienteData.estadoCivil}
                          />
                        )}
                        {clienteData.nacionalidade && (
                          <InfoItem
                            icon={<Globe className="w-5 h-5" />}
                            label="Nacionalidade"
                            value={clienteData.nacionalidade}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Card: Endereço (apenas para Cliente) */}
            {isCliente && (
              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/20 shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 mb-6">
                  <Home className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Endereço</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cep" className="text-sm font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-400" />
                          CEP
                        </Label>
                        <Input
                          id="cep"
                          value={formData.cep}
                          onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                          className="bg-white/10 border-white/20"
                        />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="endereco" className="text-sm font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-400" />
                          Endereço
                        </Label>
                        <Input
                          id="endereco"
                          value={formData.endereco}
                          onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                          className="bg-white/10 border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="numero" className="text-sm font-medium flex items-center gap-2">
                          <Home className="w-4 h-4 text-green-400" />
                          Número
                        </Label>
                        <Input
                          id="numero"
                          value={formData.numero}
                          onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                          className="bg-white/10 border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="complemento" className="text-sm font-medium flex items-center gap-2">
                          <Home className="w-4 h-4 text-green-400" />
                          Complemento
                        </Label>
                        <Input
                          id="complemento"
                          value={formData.complemento}
                          onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                          className="bg-white/10 border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bairro" className="text-sm font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-400" />
                          Bairro
                        </Label>
                        <Input
                          id="bairro"
                          value={formData.bairro}
                          onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                          className="bg-white/10 border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cidade" className="text-sm font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-400" />
                          Cidade
                        </Label>
                        <Input
                          id="cidade"
                          value={formData.cidade}
                          onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                          className="bg-white/10 border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estado" className="text-sm font-medium flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-400" />
                          Estado
                        </Label>
                        <Input
                          id="estado"
                          value={formData.estado}
                          onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                          className="bg-white/10 border-white/20"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {clienteData.cep && (
                        <InfoItem
                          icon={<MapPin className="w-5 h-5" />}
                          label="CEP"
                          value={clienteData.cep}
                        />
                      )}
                      {clienteData.endereco && (
                        <InfoItem
                          icon={<MapPin className="w-5 h-5" />}
                          label="Endereço"
                          value={clienteData.endereco}
                        />
                      )}
                      {clienteData.numero && (
                        <InfoItem
                          icon={<Home className="w-5 h-5" />}
                          label="Número"
                          value={clienteData.numero}
                        />
                      )}
                      {clienteData.complemento && (
                        <InfoItem
                          icon={<Home className="w-5 h-5" />}
                          label="Complemento"
                          value={clienteData.complemento}
                        />
                      )}
                      {clienteData.bairro && (
                        <InfoItem
                          icon={<MapPin className="w-5 h-5" />}
                          label="Bairro"
                          value={clienteData.bairro}
                        />
                      )}
                      {clienteData.cidade && (
                        <InfoItem
                          icon={<MapPin className="w-5 h-5" />}
                          label="Cidade"
                          value={clienteData.cidade}
                        />
                      )}
                      {clienteData.estado && (
                        <InfoItem
                          icon={<MapPin className="w-5 h-5" />}
                          label="Estado"
                          value={clienteData.estado}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Coluna Lateral - Apenas para não-clientes */}
          {!isCliente && (
            <div className="space-y-6">
              {/* Card: Tipo de Usuário */}
              <div className="rounded-2xl bg-gradient-to-br from-green-600/20 to-teal-600/20 backdrop-blur-md border border-green-500/30 shadow-lg p-6 hover:shadow-xl transition-all hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-green-500/20">
                    <TipoIcon className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <span className="text-sm text-white/70 font-medium block">
                      Tipo de Usuário
                    </span>
                    <p className="text-2xl font-bold text-white">
                      {getTipoLabel(usuario.tipo)}
                    </p>
                  </div>
                </div>
                <Separator className="my-4 bg-white/10" />
                <p className="text-xs text-white/60">
                  Nível de acesso no sistema
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Componente auxiliar para exibir informações
interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  capitalize?: boolean;
}

function InfoItem({ icon, label, value, capitalize }: InfoItemProps) {
  return (
    <div className="group">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-green-400 group-hover:text-green-300 transition-colors">
          {icon}
        </div>
        <span className="text-sm text-white/60 font-medium">{label}</span>
      </div>
      <p
        className={`text-base sm:text-lg font-semibold text-white pl-7 break-words ${capitalize ? "capitalize" : ""}`}
      >
        {value || "-"}
      </p>
    </div>
  );
}