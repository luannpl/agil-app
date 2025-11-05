import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MarcaMaisVendida } from "@/types/dashboard";
import { memo } from "react";

export const TopMarcas = memo(function TopMarcas({
  marcasMaisVendidas,
}: {
  marcasMaisVendidas: MarcaMaisVendida[];
}) {
  return (
    <Card className="col-span-3">
      <CardHeader className="py-3">
        <CardTitle>Marcas Mais Vendidas</CardTitle>
        <CardDescription>Top 5 marcas em vendas na loja</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-4">
          {marcasMaisVendidas.map((car, index) => (
            <div
              key={car.marca}
              className="flex items-center justify-between py-3 rounded-lg bg-gradient-subtle hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">
                    {index + 1}º {car.marca}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-grsy-300">
                  {car.totalVendidos}
                </p>
                <p className="text-xs text-muted-foreground">
                  {car.totalVendidos > 1 ? "vendas" : "venda"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});
