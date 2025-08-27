"use client";
import { useColumns } from "@/hooks/useColumns";
import { DataTable } from "@/components/admin/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Veiculo } from "@/types/veiculo";

import { useVeiculos } from "@/hooks/useVeiculos";

export default function ListaVeiculos() {
  const { data: veiculos } = useVeiculos();
  const columns = useColumns<Veiculo>(veiculos ?? [], "veiculos", {
    only: ["id", "nome", "ano", "valor"],
  });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Veículos</h1>
      <Tabs defaultValue="disponiveis" className="mb-4 ">
        <TabsList>
          <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
          <TabsTrigger value="vendidos">Vendidos</TabsTrigger>
        </TabsList>
        <TabsContent value="disponiveis">
          <DataTable columns={columns} data={veiculos ?? []} />
        </TabsContent>
        <TabsContent value="vendidos">
          <DataTable columns={columns} data={veiculos ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
