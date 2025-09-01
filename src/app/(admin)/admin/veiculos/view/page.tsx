"use client";
import { useColumns } from "@/hooks/useColumns";
import { DataTable } from "@/components/admin/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Veiculo } from "@/types/veiculo";
import { useDeleteVeiculo, useVeiculos } from "@/hooks/useVeiculos";
import { toast } from "sonner";

export default function ListaVeiculos() {
  const { data: veiculos } = useVeiculos();
  const { mutate: deleteVeiculo } = useDeleteVeiculo();

  const handleDelete = (id: string) => {
    deleteVeiculo(id, {
      onSuccess: () => {
        toast.success("Veículo excluído com sucesso!");
      },
      // onError: (error: AxiosError<any>) => {
      //   toast.error(
      //     error?.response?.data?.message || "Erro ao excluir o veículo."
      //   );
      // },
    });
  };

  const columns = useColumns<Veiculo>(veiculos ?? [], "veiculos", {
    only: ["id", "nome", "ano", "valor"],
    onDelete: handleDelete,
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
