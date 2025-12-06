import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarcaMaisVendida } from "@/types/dashboard";
import { Award } from "lucide-react";

const rankColors = [
  "bg-yellow-100 text-yellow-700 border-yellow-300",
  "bg-gray-100 text-gray-700 border-gray-300",
  "bg-orange-100 text-orange-700 border-orange-300",
  "bg-blue-100 text-blue-700 border-blue-300",
  "bg-purple-100 text-purple-700 border-purple-300",
];

export function TopMarcas({
  marcasMaisVendidas,
}: {
  marcasMaisVendidas: MarcaMaisVendida[];
}) {
  return (
    <Card className="shadow-md">
      <CardHeader className="space-y-1 py-4">
        <CardTitle className="text-xl sm:text-2xl">Marcas Mais Vendidas</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Top 5 marcas em vendas na loja
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        {marcasMaisVendidas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Award className="h-12 w-12 mb-3 opacity-20" />
            <p className="text-sm font-medium">Nenhuma marca registrada</p>
            <p className="text-xs mt-1">Os dados aparecerão aqui</p>
          </div>
        ) : (
          <div className="space-y-3">
            {marcasMaisVendidas.map((car, index) => (
              <div
                key={car.marca}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-muted"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <Badge 
                    variant="outline" 
                    className={`${rankColors[index] || rankColors[4]} font-bold shrink-0`}
                  >
                    {index + 1}º
                  </Badge>
                  <p className="font-medium text-sm sm:text-base truncate">
                    {car.marca}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl sm:text-2xl font-bold">
                    {car.totalVendidos}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {car.totalVendidos > 1 ? "vendas" : "venda"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
