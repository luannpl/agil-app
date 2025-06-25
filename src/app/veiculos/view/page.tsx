import { columns, Veiculo } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";

const veiculos: Veiculo[] = [
  { id: "1", modelo: "Civic", ano: 2020, placa: "HYZ-0101", valor: 10000 },
  { id: "2", modelo: "Corolla", ano: 2020, placa: "HYZ-0102", valor: 15000 },
  { id: "3", modelo: "SW4", ano: 2020, placa: "HYZ-0103", valor: 20000 },
];

export default function ListaVeiculos() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Veículos</h1>
      <DataTable columns={columns} data={veiculos} />
    </div>
  );
}
