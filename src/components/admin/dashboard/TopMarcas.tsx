import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const topCars = [
  {
    id: 1,
    modelo: "Toyota Corolla",
    vendas: 42,
    categoria: "Sedan",
    status: "hot",
  },
  {
    id: 2,
    modelo: "Honda Civic",
    vendas: 38,
    categoria: "Sedan",
    status: "trending",
  },
  {
    id: 3,
    modelo: "Volkswagen T-Cross",
    vendas: 35,
    categoria: "SUV",
    status: "hot",
  },
  {
    id: 4,
    modelo: "Chevrolet Onix",
    vendas: 31,
    categoria: "Hatch",
    status: "stable",
  },
  {
    id: 5,
    modelo: "Jeep Compass",
    vendas: 28,
    categoria: "SUV",
    status: "trending",
  },
];

export function TopMarcas() {
  return (
    <Card className="col-span-3">
      <CardHeader className="py-3">
        <CardTitle>Marcas Mais Vendidas</CardTitle>
        <CardDescription>Top 5 marcas em vendas na loja</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-4">
          {topCars.map((car) => (
            <div
              key={car.id}
              className="flex items-center justify-between py-3 rounded-lg bg-gradient-subtle hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{car.modelo}</p>
                </div>
                <p className="text-sm text-muted-foreground">{car.categoria}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-grsy-300">{car.vendas}</p>
                <p className="text-xs text-muted-foreground">vendas</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
