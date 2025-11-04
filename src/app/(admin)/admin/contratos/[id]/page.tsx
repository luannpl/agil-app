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
import { useParcelas, useUpdateStatusParcela } from "@/hooks/useContratos";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";

export default function ParcelasContrato() {
  const { id } = useParams();
  const router = useRouter();

  const idAsString = Array.isArray(id) ? id[0] : id;

  const { data: parcelas, isLoading, error } = useParcelas(idAsString);
  const parcelaData = parcelas?.pagamentos;

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

  const handleMessage = (
    telefone: string,
    nome: string,
    valor: number,
    vencimento: string | Date,
    parcela: number,
    veiculo?: string
  ) => {
    const numeroLimpo = telefone.replace(/\D/g, "");
    const numeroComDDI = numeroLimpo.startsWith("55")
      ? numeroLimpo
      : `55${numeroLimpo}`;

    const valorFormatado = valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const vencimentoFormatado = dayjs(vencimento).format("DD/MM/YYYY");

    const message = [
      `Prezado(a) ${nome},`,
      ``,
      `Segue a chave Pix para pagamento da sua ${parcela}ª parcela referente ao veiculo ${veiculo}:`,
      ``,
      `*Chave Pix*: 49.506.679/0001-84`,
      `*Valor*: ${valorFormatado}`,
      `*Vencimento*: ${vencimentoFormatado}`,
      ``,
      `Após o pagamento, por gentileza, envie o comprovante.`,
    ].join("\n");

    const url = `https://wa.me/${numeroComDDI}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
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
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4 mb-6">
          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
              <CardTitle className="text-xs lg:text-sm font-medium truncate">
                Total
              </CardTitle>
              <Hash className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-3 lg:px-6">
              <div className="text-lg lg:text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
              <CardTitle className="text-xs lg:text-sm font-medium truncate">
                Pagas
              </CardTitle>
              <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-green-500 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-3 lg:px-6">
              <div className="text-lg lg:text-2xl font-bold text-green-600">
                {stats.pagas}
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
              <CardTitle className="text-xs lg:text-sm font-medium truncate">
                Pendentes
              </CardTitle>
              <Clock className="h-3 w-3 lg:h-4 lg:w-4 text-yellow-500 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-3 lg:px-6">
              <div className="text-lg lg:text-2xl font-bold text-yellow-600">
                {stats.pendentes}
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
              <CardTitle className="text-xs lg:text-sm font-medium truncate">
                Atrasadas
              </CardTitle>
              <AlertCircle className="h-3 w-3 lg:h-4 lg:w-4 text-red-500 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-3 lg:px-6">
              <div className="text-lg lg:text-2xl font-bold text-red-600">
                {stats.atrasadas}
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
              <CardTitle className="text-xs lg:text-sm font-medium truncate">
                Valor Total
              </CardTitle>
              <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-3 lg:px-6">
              <div className="text-sm lg:text-lg font-bold">
                {stats.valorTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 lg:px-6">
              <CardTitle className="text-xs lg:text-sm font-medium truncate">
                Valor Pago
              </CardTitle>
              <DollarSign className="h-3 w-3 lg:h-4 lg:w-4 text-green-500 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-3 lg:px-6">
              <div className="text-sm lg:text-lg font-bold text-green-600">
                {stats.valorPago.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
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
                                  handleMessage(
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
                                onClick={() =>
                                  toast.info(
                                    `Funcionalidade de editar parcela ${p.numeroParcela} em desenvolvimento.`
                                  )
                                }
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
    </div>
  );
}
