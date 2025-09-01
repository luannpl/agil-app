"use client";
import { useColumns } from "@/hooks/useColumns";
import { DataTable } from "@/components/admin/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsuarioResponse } from "@/types/usuario";
import { useUsuarios } from "@/hooks/useUsuario";

export default function ListaUsuarios() {
  const { data: usuarios } = useUsuarios();

  const usuarioAdmin: UsuarioResponse[] | undefined = usuarios?.filter(
    (u) => u.tipo == "admin"
  );
  const usuarioCliente: UsuarioResponse[] | undefined = usuarios?.filter(
    (u) => u.tipo == "cliente"
  );

  const usuarioVendedor: UsuarioResponse[] | undefined = usuarios?.filter(
    (u) => u.tipo == "vendedor"
  );

  const usuarioDespachante: UsuarioResponse[] | undefined = usuarios?.filter(
    (u) => u.tipo == "despachante"
  );

  const columns = useColumns<UsuarioResponse>(usuarios ?? [], "usuarios", {
    only: ["id", "nome", "email"],
  });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de usuarios</h1>
      <Tabs defaultValue="admin" className="mb-4 ">
        <TabsList>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="cliente">Cliente</TabsTrigger>
          <TabsTrigger value="vendedor">Vendedor</TabsTrigger>
          <TabsTrigger value="despachante">Despachante</TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <DataTable columns={columns} data={usuarioAdmin ?? []} />
        </TabsContent>
        <TabsContent value="cliente">
          <DataTable columns={columns} data={usuarioCliente ?? []} />
        </TabsContent>
        <TabsContent value="vendedor">
          <DataTable columns={columns} data={usuarioVendedor ?? []} />
        </TabsContent>
        <TabsContent value="despachante">
          <DataTable columns={columns} data={usuarioDespachante ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
