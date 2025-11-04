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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React, { useMemo, useState } from "react";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  Trash2,
  Users,
  Car,
  Building,
  CheckCircle,
  AlertCircle,
  XCircle,
  BanknoteArrowUp,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useContratos, useDeleteContrato } from "@/hooks/useContratos";
import { Contrato } from "@/types/contrato";
import { formatarPreco } from "@/utils/formatarPreco";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function VisualizarContratos() {
  const router = useRouter();
  const { data: contratos = [], isLoading, isError } = useContratos();

  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  const [contratoSelecionado, setContratoSelecionado] =
    useState<Contrato | null>(null);

  const contratosFiltrados = useMemo(() => {
    if (!contratos) return [];
    return contratos.filter((contrato) => {
      const matchStatus =
        filtroStatus === "todos" || contrato.status === filtroStatus;
      const matchBusca =
        busca === "" ||
        contrato.usuario?.nome.toLowerCase().includes(busca.toLowerCase()) ||
        contrato.veiculo?.nome.toLowerCase().includes(busca.toLowerCase()) ||
        contrato.veiculo?.placa.toLowerCase().includes(busca.toLowerCase());
      return matchStatus && matchBusca;
    });
  }, [contratos, filtroStatus, busca]);

  const { mutate: deleteContrato, isPending } = useDeleteContrato();

  const handleDelete = (idDoContrato: string) => {
    deleteContrato(idDoContrato, {
      onSuccess: () => {
        toast.success("Contrato deletado com sucesso!");
      },
      onError: (error) => {
        toast.error(`Erro ao deletar contrato: ${error.message}`);
      },
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ativo: { variant: "auth", icon: CheckCircle },
      pago: { variant: "pago", icon: CheckCircle },
      atrasado: { variant: "destructive", icon: AlertCircle },
      cancelado: { variant: "secondary", icon: XCircle },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.cancelado;
    const Icon = config.icon;

    return (
      <Badge
        variant={
          config.variant as "auth" | "pago" | "destructive" | "secondary"
        }
        className="flex items-center gap-1"
      >
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const calcularProgresso = (atual: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((atual / total) * 100);
  };

  const exportToExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = "contratos";

    const ws = XLSX.utils.json_to_sheet(
      contratosFiltrados.map((contrato) => ({
        Cliente: contrato.usuario?.nome,
        Veículo: contrato.veiculo?.nome,
        Placa: contrato.veiculo?.placa,
        Banco: contrato.banco,
        "Valor Total do Financiamento": formatarPreco(
          contrato.valorTotalFinanciamento
        ),
        "Valor da Entrada": formatarPreco(contrato.valorFinalEntrada),
        "Valor da Parcela": formatarPreco(contrato.valorParcela),
        "Parcela Atual": contrato.parcelaAtual,
        "Total de Parcelas": contrato.totalParcelas,
        "Data de Pagamento": new Date(
          contrato.dataPagamento
        ).toLocaleDateString("pt-BR"),
        "Descrição da Entrada": contrato.descricaoEntrada,
        Status: contrato.status,
      }))
    );

    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  const renderSkeleton = () => (
    <>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className="h-5 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-28" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-24" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-5 w-20" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-8 w-20 ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      <div className="w-full px-4 py-6">
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Contratos
            </h1>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por cliente, veículo ou placa..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={exportToExcel}
                className="bg-green-500 hover:bg-green-600 text-black font-medium w-full md:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar para Excel
              </Button>
              <Button
                onClick={() => router.push("/admin/contratos/")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium w-full md:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Novo Contrato
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="py-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-1/2" />
              ) : (
                <div className="text-2xl font-bold">{contratos.length}</div>
              )}
            </CardContent>
          </Card>
          <Card className="py-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-sm font-medium">Ativos</CardTitle>
              <CheckCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-1/2" />
              ) : (
                <div className="text-2xl font-bold text-yellow-600">
                  {contratos.filter((c) => c.status === "ativo").length}
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="py-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-sm font-medium">Atrasados</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-1/2" />
              ) : (
                <div className="text-2xl font-bold text-red-600">
                  {contratos.filter((c) => c.status === "atrasado").length}
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="py-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
              <CardTitle className="text-sm font-medium">Pagos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-1/2" />
              ) : (
                <div className="text-2xl font-bold text-green-600">
                  {contratos.filter((c) => c.status === "pago").length}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-xl shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Valor Parcela</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? renderSkeleton()
                : contratosFiltrados.map((contrato) => (
                    <TableRow key={contrato.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {contrato.usuario?.nome}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-muted-foreground" />
                          {contrato.veiculo?.nome}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">
                        {contrato.veiculo?.placa}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          {contrato.banco}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatarPreco(contrato.valorParcela)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>
                              {contrato.parcelaAtual}/{contrato.totalParcelas}
                            </span>
                          </div>
                          <Progress
                            value={calcularProgresso(
                              contrato.parcelaAtual,
                              contrato.totalParcelas
                            )}
                            className="w-20"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(contrato.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Link href={`/admin/contratos/${contrato.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setContratoSelecionado(contrato)}
                            >
                              <BanknoteArrowUp className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setContratoSelecionado(contrato)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Detalhes do Contrato</DialogTitle>
                                <DialogDescription>
                                  Informações completas do contrato
                                </DialogDescription>
                              </DialogHeader>
                              {contratoSelecionado && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Cliente
                                      </label>
                                      <p className="text-sm">
                                        {contratoSelecionado.usuario?.nome}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Veículo
                                      </label>
                                      <p className="text-sm">
                                        {contratoSelecionado.veiculo?.nome}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Placa
                                      </label>
                                      <p className="text-sm font-mono">
                                        {contratoSelecionado.veiculo?.placa}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Banco
                                      </label>
                                      <p className="text-sm">
                                        {contratoSelecionado.banco}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Data de Pagamento
                                      </label>
                                      <p className="text-sm">
                                        {new Date(
                                          contratoSelecionado.dataPagamento
                                        ).toLocaleDateString("pt-BR")}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Valor da Parcela
                                      </label>
                                      <p className="text-sm font-semibold">
                                        {formatarPreco(
                                          contratoSelecionado.valorParcela
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Parcelas
                                      </label>
                                      <p className="text-sm">
                                        {contratoSelecionado.parcelaAtual} de{" "}
                                        {contratoSelecionado.totalParcelas}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Valor Total
                                      </label>
                                      <p className="text-sm font-semibold">
                                        {formatarPreco(
                                          contratoSelecionado.valorTotalFinanciamento
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Valor da Entrada
                                      </label>
                                      <p className="text-sm font-semibold">
                                        {formatarPreco(
                                          contratoSelecionado.valorFinalEntrada
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Status
                                      </label>
                                      <div className="mt-1">
                                        {getStatusBadge(
                                          contratoSelecionado.status
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-full">
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Descrição da Entrada
                                    </label>
                                    <p className="text-sm bg-muted p-3 rounded-md mt-1">
                                      {contratoSelecionado.descricaoEntrada}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmar Exclusão</DialogTitle>
                                <DialogDescription>
                                  Tem certeza que deseja excluir este contrato?
                                  Essa ação é irreversível.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button variant="outline">Cancelar</Button>
                                </DialogClose>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDelete(contrato.id!)}
                                  disabled={isPending}
                                >
                                  {isPending ? "Excluindo..." : "Excluir"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>

          {!isLoading && !isError && contratosFiltrados.length === 0 && (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Nenhum contrato encontrado
              </h3>
              <p className="text-muted-foreground">
                {busca || filtroStatus !== "todos"
                  ? "Ajuste os filtros para ver mais resultados"
                  : "Comece cadastrando um novo contrato"}
              </p>
            </div>
          )}

          {isError && (
            <div className="p-8 text-center text-red-500">
              <AlertCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Erro ao carregar contratos
              </h3>
              <p>Tente novamente mais tarde.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
