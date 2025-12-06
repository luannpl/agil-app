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
import { ShoppingBag } from "lucide-react";

export function UltimasVendas({
  ultimasVendas,
}: {
  ultimasVendas: UltimaVenda[];
}) {
  return (
    <Card className="shadow-md">
      <CardHeader className="space-y-1 py-4">
        <CardTitle className="text-xl sm:text-2xl">Vendas Recentes</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Últimas transações realizadas na loja
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        {ultimasVendas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <ShoppingBag className="h-12 w-12 mb-3 opacity-20" />
            <p className="text-sm font-medium">Nenhuma venda registrada</p>
            <p className="text-xs mt-1">As vendas aparecerão aqui</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ultimasVendas.map((sale) => (
              <div
                key={sale.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-muted"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm sm:text-base truncate">
                      {sale.veiculo.nome}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {sale.usuario.nome}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-sm sm:text-base">
                      {formatarPreco(sale.valorTotalFinanciamento)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(sale.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <Badge variant="pago" className="shrink-0">Concluída</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
