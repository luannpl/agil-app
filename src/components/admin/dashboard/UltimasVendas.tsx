import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UltimaVenda } from "@/types/dashboard";
import { formatarPreco } from "@/utils/formatarPreco";

export function UltimasVendas({
  ultimasVendas,
}: {
  ultimasVendas: UltimaVenda[];
}) {
  return (
    <Card className="col-span-5">
      <CardHeader className="py-3">
        <CardTitle>Vendas Recentes</CardTitle>
        <CardDescription>Últimas transações realizadas na loja</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-4">
          {ultimasVendas.map((sale) => (
            <div
              key={sale.id}
              className="flex items-center justify-between py-3 rounded-lg hover:bg-gradient-subtle transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{sale.veiculo.nome}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {sale.usuario.nome}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold">
                    {formatarPreco(sale.valorTotalFinanciamento)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(sale.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <Badge variant="pago">Concluída</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
