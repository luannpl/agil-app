"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParcelas, useUpdateStatusParcela } from "@/hooks/useContratos";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FileText,
  ArrowLeft,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Hash,
  Circle,
  RefreshCcw,
  MessageCircleReply,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";
import { useUpdateValorParcelaAtrasada } from "@/hooks/usePagamentos";

export default function ParcelasContrato() {
  const { id } = useParams();
  const router = useRouter();

  const idAsString = Array.isArray(id) ? id[0] : id;

  const { data: parcelas, isLoading, error } = useParcelas(idAsString);
  const parcelaData = parcelas?.pagamentos;

  // Estados para o Dialog de PIX
  const [isPixDialogOpen, setIsPixDialogOpen] = useState(false);
  const [pixKey, setPixKey] = useState("");
  const [selectedParcela, setSelectedParcela] = useState<{
    id: string;
    telefone: string;
    nome: string;
    valor: number;
    vencimento: string | Date;
    parcela: number;
    veiculo?: string;
  } | null>(null);

  useEffect(() => {
    if (!idAsString) {
      router.push("/admin/contratos/view");
      return;
    }

    if (error instanceof AxiosError) {
      toast.error("Parcelas não encontradas");
      router.push("/admin/contratos/view");
    }
  }, [idAsString, error, router]);

  const { mutate: updateStatus } = useUpdateStatusParcela(idAsString!);

  function handleMarcarComoPago(parcelaId: string) {
    updateStatus(
      { parcelaId, status: "PAGO" },
      {
        onSuccess: () => {
          toast.success("Parcela marcada como paga!");
        },
        onError: () => {
          toast.error("Erro ao marcar parcela como paga!");
        },
      }
    );
  }

  // Função para obter badge de status
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PAGO: {
        variant: "pago",
        color: "bg-green-500",
        icon: CheckCircle,
        label: "Pago",
      },
      PENDENTE: {
        variant: "auth",
        color: "bg-yellow-500",
        icon: Clock,
        label: "Pendente",
      },
      ATRASADO: {
        variant: "destructive",
        color: "bg-red-500",
        icon: AlertCircle,
        label: "Atrasado",
      },
      cancelado: {
        variant: "outline",
        color: "bg-gray-500",
        icon: XCircle,
        label: "Cancelado",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.PENDENTE;
    const Icon = config.icon;

    return (
      <Badge
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        variant={config.variant as any}
        className="flex items-center gap-1 w-fit"
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const { mutate: recalculateParcela } = useUpdateValorParcelaAtrasada();

  // Função para abrir o Dialog de PIX e recalcular
  const handleOpenPixDialog = (
    parcelaId: string,
    telefone: string,
    nome: string,
    valor: number,
    vencimento: string | Date,
    parcela: number,
    veiculo?: string
  ) => {
    // Primeiro, recalcula a parcela
    toast.loading("Recalculando valor da parcela...");
    
    recalculateParcela(parcelaId, {
      onSuccess: () => {
        toast.dismiss();
        toast.success("Valor recalculado com sucesso!");
        
        // Depois abre o Dialog
        setSelectedParcela({
          id: parcelaId,
          telefone,
          nome,
          valor,
          vencimento,
          parcela,
          veiculo,
        });
        setPixKey(""); // Limpa o campo
        setIsPixDialogOpen(true);
      },
      onError: () => {
        toast.dismiss();
        toast.error("Erro ao recalcular. Tente novamente.");
      },
    });
  };

  // Função para enviar mensagem com PIX
  const handleSendMessageWithPix = () => {
    if (!selectedParcela) return;
    
    if (!pixKey.trim()) {
      toast.error("Por favor, insira a chave PIX");
      return;
    }

    const numeroLimpo = selectedParcela.telefone.replace(/\D/g, "");
    const numeroComDDI = numeroLimpo.startsWith("55")
      ? numeroLimpo
      : `55${numeroLimpo}`;

    const valorFormatado = selectedParcela.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const vencimentoFormatado = dayjs(selectedParcela.vencimento).format("DD/MM/YYYY");

    const message = [
      `Prezado(a) ${selectedParcela.nome},`,
      ``,
      `Segue a chave Pix para pagamento da sua ${selectedParcela.parcela}ª parcela referente ao veículo ${selectedParcela.veiculo}:`,
      ``,
      `*Chave Pix*: ${pixKey}`,
      `*Valor*: ${valorFormatado}`,
      `*Vencimento*: ${vencimentoFormatado}`,
      ``,
      `Após o pagamento, por gentileza, envie o comprovante.`,
    ].join("\n");

    const url = `https://wa.me/${numeroComDDI}?text=${encodeURIComponent(
      message
    )}`;
    
    window.open(url, "_blank");
    
    // Fecha o Dialog
    setIsPixDialogOpen(false);
    setPixKey("");
    setSelectedParcela(null);
    
    toast.success("Mensagem enviada com sucesso!");
  };
  
  const handleRefreshParcela = (parcelaId: string) => {
    recalculateParcela(parcelaId, {
      onSuccess: () => {
        toast.success("Valor da parcela recalculado com sucesso!");
      },
      onError: () => {
        toast.error("Erro ao recalcular valor da parcela!");
      },
    });
  };

  // Calcular estatísticas
  const calcularEstatisticas = () => {
    if (!parcelaData)
      return {
        total: 0,
        pagas: 0,
        pendentes: 0,
        atrasadas: 0,
        valorTotal: 0,
        valorPago: 0,
      };

    const pagas = parcelaData.filter((p) => p.status === "PAGO").length;
    const pendentes = parcelaData.filter((p) => p.status === "PENDENTE").length;
    const atrasadas = parcelaData.filter((p) => p.status === "ATRASADO").length;
    const valorTotal = parcelaData.reduce((acc, p) => acc + p.valorParcela!, 0);
    const valorPago = parcelaData
      .filter((p) => p.status === "PAGO")
      .reduce((acc, p) => acc + p.valorParcela!, 0);

    return {
      total: parcelaData.length,
      pagas,
      pendentes,
      atrasadas,
      valorTotal,
      valorPago,
    };
  };

  const stats = calcularEstatisticas();

  if (isLoading || !idAsString) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-32 w-32 rounded-full" />
      </div>
    );
  }

  if (error) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="w-full px-4 py-0">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/contratos/view")}
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Contratos
          </Button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Parcelas do Contrato
            </h1>
          </div>
          <p className="text-muted-foreground ">
            Visualize e gerencie todas as parcelas deste contrato
          </p>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-4">
              <CardTitle className="text-sm font-medium">
                Total
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Hash className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">parcelas</p>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-4">
              <CardTitle className="text-sm font-medium">
                Pagas
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-green-600">
                {stats.pagas}
              </div>
              <p className="text-xs text-muted-foreground mt-1">confirmadas</p>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-4">
              <CardTitle className="text-sm font-medium">
                Pendentes
              </CardTitle>
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pendentes}
              </div>
              <p className="text-xs text-muted-foreground mt-1">aguardando</p>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-4">
              <CardTitle className="text-sm font-medium">
                Atrasadas
              </CardTitle>
              <div className="p-2 rounded-lg bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold text-red-600">
                {stats.atrasadas}
              </div>
              <p className="text-xs text-muted-foreground mt-1">vencidas</p>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-4">
              <CardTitle className="text-sm font-medium">
                Valor Total
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-500/10">
                <DollarSign className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-xl font-bold">
                {stats.valorTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">do contrato</p>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 p-4">
              <CardTitle className="text-sm font-medium">
                Valor Pago
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500/10">
                <DollarSign className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-xl font-bold text-green-600">
                {stats.valorPago.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">recebido</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Parcelas */}
        <div className="bg-card rounded-xl shadow-lg overflow-hidden">
          {parcelaData && parcelaData.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[80px]">
                      <span className="flex items-center gap-1">
                        <Hash className="w-4 h-4" />
                        Nº
                      </span>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Vencimento
                      </span>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Valor
                      </span>
                    </TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[120px]">
                      Data Pagamento
                    </TableHead>
                    <TableHead className="text-center min-w-[100px]">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parcelaData.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="font-mono">#{p.numeroParcela}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(p.dataVencimento!).toLocaleDateString(
                          "pt-BR"
                        )}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {p.valorParcela!.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell>{getStatusBadge(p.status)}</TableCell>
                      <TableCell>
                        {p.dataVencimento
                          ? new Date(p.dataVencimento).toLocaleDateString(
                              "pt-BR"
                            )
                          : "-"}
                      </TableCell>
                      <TableCell className="text-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={p.status === "PAGO"}
                                    title={
                                      p.status === "PAGO"
                                        ? "Pago"
                                        : "Marcar como Pago"
                                    }
                                  >
                                    {p.status === "PAGO" ? (
                                      <CheckCircle className="text-green-500 w-5 h-5" />
                                    ) : (
                                      <Circle className="text-gray-400 w-5 h-5" />
                                    )}
                                  </Button>
                                </AlertDialogTrigger>

                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Confirmar pagamento
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Tem certeza que deseja marcar esta parcela
                                      como <strong>paga</strong>? Essa ação não
                                      poderá ser desfeita.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>

                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleMarcarComoPago(p.id!)
                                      }
                                      className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-amber-100"
                                    >
                                      Confirmar
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TooltipTrigger>
                            <TooltipContent className="bg-yellow-500">
                              <p className="text-white">
                                Confirmar pagamento da parcela
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                  handleOpenPixDialog(
                                    p.id!,
                                    parcelas.contrato.usuario?.telefone || "",
                                    "Cliente",
                                    p.valorParcela!,
                                    p.dataVencimento!,
                                    p.numeroParcela,
                                    parcelas.contrato.veiculo?.nome
                                  )
                                }
                              >
                                <MessageCircleReply className="w-5 h-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-green-500">
                              <p className="text-white">
                                Enviar parcela para o cliente
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => handleRefreshParcela(p.id!)}
                              >
                                <RefreshCcw className="w-5 h-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-red-500">
                              <p className="text-white">
                                Recalcular juros da parcela
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Nenhuma parcela encontrada
              </h3>
              <p className="text-muted-foreground">
                Este contrato não possui parcelas cadastradas.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog para inserir PIX */}
      <Dialog open={isPixDialogOpen} onOpenChange={setIsPixDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-yellow-500" />
              </div>
              Inserir Chave PIX
            </DialogTitle>
            <DialogDescription>
              Insira a chave PIX para enviar ao cliente. O valor da parcela foi recalculado automaticamente.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedParcela && (
              <div className="rounded-lg bg-yellow-500/10 border border-yellow-500/20 p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Parcela:</span>
                  <span className="font-semibold">#{selectedParcela.parcela}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Valor:</span>
                  <span className="font-bold text-yellow-600">
                    {selectedParcela.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Vencimento:</span>
                  <span className="font-semibold">
                    {dayjs(selectedParcela.vencimento).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="pix-key" className="text-sm font-medium">
                Chave PIX
              </Label>
              <Input
                id="pix-key"
                placeholder="Digite a chave PIX (CPF, CNPJ, Email, Telefone ou Chave Aleatória)"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
                className="w-full"
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Esta chave será enviada ao cliente via WhatsApp
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsPixDialogOpen(false);
                setPixKey("");
                setSelectedParcela(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              onClick={handleSendMessageWithPix}
              disabled={!pixKey.trim()}
            >
              <MessageCircleReply className="w-4 h-4 mr-2" />
              Enviar Cobrança
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
