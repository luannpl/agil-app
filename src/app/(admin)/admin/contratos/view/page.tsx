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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
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
} from "lucide-react";
import { useRouter } from "next/navigation";

// Dados mockados para exemplo
const contratosMock = [
  {
    id: 1,
    cliente: "João Silva Santos",
    carro: "Honda Civic 2020",
    placa: "ABC-1234",
    banco: "Banco do Brasil",
    dataPagamento: "2024-01-15",
    valorParcela: "R$ 850,00",
    parcelaAtual: 12,
    numeroParcela: 48,
    status: "ativo",
    valorTotalFinanciamento: "R$ 40.800,00",
    valorFinalEntrada: "R$ 15.000,00",
    descricaoEntrada:
      "R$ 10.000 em dinheiro + Fiat Uno 2015 avaliado em R$ 5.000",
  },
  {
    id: 2,
    cliente: "Maria Oliveira",
    carro: "Toyota Corolla 2019",
    placa: "XYZ-5678",
    banco: "Caixa Econômica",
    dataPagamento: "2024-01-20",
    valorParcela: "R$ 720,00",
    parcelaAtual: 8,
    numeroParcela: 36,
    status: "atrasado",
    valorTotalFinanciamento: "R$ 25.920,00",
    valorFinalEntrada: "R$ 8.000,00",
    descricaoEntrada: "R$ 8.000 em dinheiro",
  },
  {
    id: 3,
    cliente: "Carlos Mendes",
    carro: "Nissan Sentra 2021",
    placa: "DEF-9012",
    banco: "Bradesco",
    dataPagamento: "2024-01-10",
    valorParcela: "R$ 950,00",
    parcelaAtual: 24,
    numeroParcela: 24,
    status: "pago",
    valorTotalFinanciamento: "R$ 22.800,00",
    valorFinalEntrada: "R$ 12.000,00",
    descricaoEntrada:
      "R$ 7.000 em dinheiro + Moto Honda CG 160 avaliada em R$ 5.000",
  },
  {
    id: 4,
    cliente: "Ana Costa",
    carro: "Hyundai HB20 2022",
    placa: "GHI-3456",
    banco: "Itaú",
    dataPagamento: "2024-01-25",
    valorParcela: "R$ 680,00",
    parcelaAtual: 6,
    numeroParcela: 60,
    status: "cancelado",
    valorTotalFinanciamento: "R$ 40.800,00",
    valorFinalEntrada: "R$ 5.000,00",
    descricaoEntrada: "R$ 5.000 em dinheiro",
  },
];

export default function VisualizarContratos() {
  const router = useRouter();
  const [contratos, setContratos] = useState(contratosMock);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [busca, setBusca] = useState("");
  setContratos(contratosMock);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [contratoSelecionado, setContratoSelecionado] = useState<any>(null);

  // Função para filtrar contratos
  const contratosFiltrados = contratos.filter((contrato) => {
    const matchStatus =
      filtroStatus === "todos" || contrato.status === filtroStatus;
    const matchBusca =
      busca === "" ||
      contrato.cliente.toLowerCase().includes(busca.toLowerCase()) ||
      contrato.carro.toLowerCase().includes(busca.toLowerCase()) ||
      contrato.placa.toLowerCase().includes(busca.toLowerCase());

    return matchStatus && matchBusca;
  });

  // Função para obter cor do badge baseado no status
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ativo: { variant: "auth", color: "bg-yellow-500", icon: CheckCircle },
      pago: { variant: "pago", color: "bg-green-500", icon: CheckCircle },
      atrasado: {
        variant: "destructive",
        color: "bg-red-500",
        icon: AlertCircle,
      },
      cancelado: { variant: "secondary", color: "bg-gray-500", icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variant={config.variant as any}
        className="flex items-center gap-1"
      >
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Função para calcular progresso das parcelas
  const calcularProgresso = (atual: number, total: number) => {
    return Math.round((atual / total) * 100);
  };

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

        {/* Filtros e Ações */}
        <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              {/* Busca */}
              <div className="relative min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por cliente, veículo ou placa..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filtro por Status */}
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

            {/* Botão Novo Contrato */}
            <Button
              onClick={() => router.push("/admin/contratos/")}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium w-full md:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Contrato
            </Button>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contratos.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ativos</CardTitle>
              <CheckCircle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {contratos.filter((c) => c.status === "ativo").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Atrasados</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {contratos.filter((c) => c.status === "atrasado").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pagos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {contratos.filter((c) => c.status === "pago").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Contratos */}
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
              {contratosFiltrados.map((contrato) => (
                <TableRow key={contrato.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {contrato.cliente}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-muted-foreground" />
                      {contrato.carro}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{contrato.placa}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      {contrato.banco}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    {contrato.valorParcela}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>
                          {contrato.parcelaAtual}/{contrato.numeroParcela}
                        </span>
                      </div>
                      <Progress
                        value={calcularProgresso(
                          contrato.parcelaAtual,
                          contrato.numeroParcela
                        )}
                        className="w-20"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(contrato.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
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
                              Informações completas do contrato #
                              {contratoSelecionado?.id}
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
                                    {contratoSelecionado.cliente}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Veículo
                                  </label>
                                  <p className="text-sm">
                                    {contratoSelecionado.carro}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Placa
                                  </label>
                                  <p className="text-sm font-mono">
                                    {contratoSelecionado.placa}
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
                                    {contratoSelecionado.valorParcela}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Parcelas
                                  </label>
                                  <p className="text-sm">
                                    {contratoSelecionado.parcelaAtual} de{" "}
                                    {contratoSelecionado.numeroParcela}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Valor Total
                                  </label>
                                  <p className="text-sm font-semibold">
                                    {
                                      contratoSelecionado.valorTotalFinanciamento
                                    }
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Valor da Entrada
                                  </label>
                                  <p className="text-sm font-semibold">
                                    {contratoSelecionado.valorFinalEntrada}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">
                                    Status
                                  </label>
                                  <div className="mt-1">
                                    {getStatusBadge(contratoSelecionado.status)}
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
                      {/* <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button> */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {contratosFiltrados.length === 0 && (
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
        </div>
      </div>
    </div>
  );
}
