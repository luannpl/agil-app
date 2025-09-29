import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentSales = [
  {
    id: 1,
    cliente: "João Silva",
    modelo: "Honda Civic",
    valor: "R$ 145.000",
    status: "completed",
    data: "Há 2 horas",
  },
  {
    id: 2,
    cliente: "Maria Santos",
    modelo: "Toyota Corolla",
    valor: "R$ 158.000",
    status: "completed",
    data: "Há 4 horas",
  },
  {
    id: 3,
    cliente: "Pedro Oliveira",
    modelo: "VW T-Cross",
    valor: "R$ 132.000",
    status: "pending",
    data: "Há 6 horas",
  },
  {
    id: 4,
    cliente: "Ana Costa",
    modelo: "Jeep Compass",
    valor: "R$ 189.000",
    status: "completed",
    data: "Ontem",
  },
  {
    id: 5,
    cliente: "Carlos Ferreira",
    modelo: "Chevrolet Onix",
    valor: "R$ 92.000",
    status: "processing",
    data: "Ontem",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="pago">Concluída</Badge>;
    case "pending":
      return <Badge variant="auth">Pendente</Badge>;
    case "processing":
      return <Badge variant="secondary">Processando</Badge>;
    default:
      return null;
  }
};

export function UltimasVendas() {
  return (
    <Card className="col-span-5">
      <CardHeader className="py-3">
        <CardTitle>Vendas Recentes</CardTitle>
        <CardDescription>Últimas transações realizadas na loja</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-4">
          {recentSales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between py-3 rounded-lg hover:bg-gradient-subtle transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{sale.cliente}</p>
                </div>
                <p className="text-sm text-muted-foreground">{sale.modelo}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold">{sale.valor}</p>
                  <p className="text-xs text-muted-foreground">{sale.data}</p>
                </div>
                {getStatusBadge(sale.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
