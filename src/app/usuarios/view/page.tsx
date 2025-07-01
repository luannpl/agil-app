import { columns, Usuario } from "@/components/table/columnsUsers";
import { DataTable } from "@/components/table/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const usuarios: Usuario[] = [
  {
    id: "1",
    nome: "jefferson",
    email: "jefferson413@gmail.com",
    valor: 10000,
    ativo: true
  },
  {
    id: "2",
    nome: "william",
    email: "william413@gmail.com",
    valor: 10000,
    ativo: true
  },
  {
    id: "3",
    nome: "cibeli",
    email: "maria413@gmail.com",
    valor: 1000,
    ativo: false
  },
];

const usuarioAtivo: Usuario[] = usuarios.filter((u) => u.ativo);
const usuarioInativo: Usuario[] = usuarios.filter((u) => !u.ativo);

export default function ListaUsuarios() {
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
