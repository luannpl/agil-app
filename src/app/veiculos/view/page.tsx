import { columns, Veiculo } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const veiculos: Veiculo[] = [
  {
    id: "1",
    modelo: "Civic",
    ano: 2020,
    placa: "HYZ-0101",
    valor: 10000,
    vendido: false,
  },
  {
    id: "2",
    modelo: "Corolla",
    ano: 2020,
    placa: "HYZ-0102",
    valor: 15000,
    vendido: false,
  },
  {
    id: "3",
    modelo: "SW4",
    ano: 2020,
    placa: "HYZ-0103",
    valor: 20000,
    vendido: true,
  },
];

const veiculosDisponiveis: Veiculo[] = veiculos.filter((v) => !v.vendido);
const veiculosVendidos: Veiculo[] = veiculos.filter((v) => v.vendido);

export default function ListaVeiculos() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Veículos</h1>
      <Tabs defaultValue="disponiveis" className="mb-4 ">
        <TabsList>
          <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
          <TabsTrigger value="vendidos">Vendidos</TabsTrigger>
        </TabsList>
        <TabsContent value="disponiveis">
          <DataTable columns={columns} data={veiculosDisponiveis} />
        </TabsContent>
        <TabsContent value="vendidos">
          <DataTable columns={columns} data={veiculosVendidos} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
