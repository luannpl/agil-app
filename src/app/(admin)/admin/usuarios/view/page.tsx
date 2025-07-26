'use client'
import { useColumns } from "@/hooks/useColumns";
import { DataTable } from "@/components/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Usuario } from "@/types/usuario";

const usuarios: Usuario[] = [
  {
    id: "1",
    nome: "jefferson",
    email: "jefferson413@gmail.com",
    salario: 10000,
    ativo: true
  },
  {
    id: "2",
    nome: "william",
    email: "william413@gmail.com",
    salario: 10000,
    ativo: true
  },
  {
    id: "3",
    nome: "cibeli",
    email: "maria413@gmail.com",
    salario: 1000,
    ativo: false
  },
];

const usuarioAtivo: Usuario[] = usuarios.filter((u) => u.ativo);
const usuarioInativo: Usuario[] = usuarios.filter((u) => !u.ativo);

export default function ListaUsuarios() {
  const columns = useColumns<Usuario>(usuarios, "usuarios", {
    exclude: ["id", "ativo"],
  });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de usuarios</h1>
      <Tabs defaultValue="ativos" className="mb-4 ">
        <TabsList>
          <TabsTrigger value="ativos">Ativos</TabsTrigger>
          <TabsTrigger value="inativos">Inativos</TabsTrigger>
        </TabsList>
        <TabsContent value="ativos">
          <DataTable columns={columns} data={usuarioAtivo} />
        </TabsContent>
        <TabsContent value="inativos">
          <DataTable columns={columns} data={usuarioInativo} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
