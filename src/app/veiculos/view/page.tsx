// app/page.tsx
import { columns, Veiculo } from "@/components/columns";
import { DataTable } from "@/components/data-table";

const veiculos: Veiculo[] = [
  { id: "1", name: "Civic", placa: "HYZ-0101", valor: 10000 },
  { id: "2", name: "Corolla", placa: "HYZ-0102", valor: 15000 },
  { id: "3", name: "SW4", placa: "HYZ-0103", valor: 20000 },
];

export default function ListaVeiculos() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Veículos</h1>
      <DataTable columns={columns} data={veiculos} />
    </div>
  );
}
