// "use client";

// import React from "react";
// import { useParams } from "next/navigation";
// import { useContratoById, useUpdateContrato } from "@/hooks/useContratos";
// import { TabelaPagamentos } from "@/components/admin/pagamentos/tabela-pagamentos";
// import {
//   Loader2,
//   FileText,
//   User,
//   Car,
//   Calendar,
//   DollarSign,
//   Hash,
//   Building,
//   CheckCircle,
// } from "lucide-react";
// import { formatarPreco } from "@/utils/formatarPreco";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "sonner";
// import { Badge } from "@/components/ui/badge";

// export default function DetalhesContratoPage() {
//   const params = useParams();
//   const id = params.id as string;

//   const { data: contrato, isLoading, isError } = useContratoById(id);
//   const { mutate: updateContrato } = useUpdateContrato(id);

//   const handleStatusChange = (newStatus: string) => {
//     toast.info(`Alterando status para ${newStatus}...`);
//     updateContrato(
//       { status: newStatus },
//       {
//         onSuccess: () => {
//           toast.success("Status do contrato alterado com sucesso!");
//         },
//         onError: () => {
//           toast.error("Erro ao alterar o status do contrato.");
//         },
//       }
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="w-12 h-12 animate-spin text-yellow-500" />
//       </div>
//     );
//   }

//   if (isError || !contrato) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-red-500">Erro ao carregar o contrato.</p>
//       </div>
//     );
//   }

//   const getStatusVariant = (status: string) => {
//     switch (status) {
//       case "ativo":
//         return "success";
//       case "pago":
//         return "default";
//       case "atrasado":
//         return "destructive";
//       case "cancelado":
//         return "warning";
//       default:
//         return "outline";
//     }
//   };

//   return (
//     <div
//       className="min-h-screen p-4 md:p-8"
//       style={{ background: "var(--background)" }}
//     >
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="p-2 bg-yellow-500/10 rounded-lg">
//             <FileText className="w-6 h-6 text-yellow-500" />
//           </div>
//           <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
//             Detalhes do Contrato
//           </h1>
//         </div>
//         <p className="text-muted-foreground text-sm lg:text-base ml-11">
//           Visualize e gerencie os detalhes e pagamentos do contrato.
//         </p>
//       </div>

//       {/* Card de Detalhes */}
//       <div className="bg-card rounded-xl shadow-lg p-4 md:p-6 space-y-6 mb-8">
//         <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
//           <h2 className="text-xl font-semibold text-foreground">
//             Resumo do Contrato
//           </h2>
//           <div className="flex items-center gap-4">
//             <Badge
//               variant={getStatusVariant(contrato.status) || "outline"}
//               className="text-sm"
//             >
//               {contrato.status.charAt(0).toUpperCase() +
//                 contrato.status.slice(1)}
//             </Badge>
//             <Select
//               onValueChange={handleStatusChange}
//               defaultValue={contrato.status}
//             >
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Alterar status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="ativo">Ativo</SelectItem>
//                 <SelectItem value="pago">Pago</SelectItem>
//                 <SelectItem value="atrasado">Atrasado</SelectItem>
//                 <SelectItem value="cancelado">Cancelado</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-border">
//           {/* Coluna 1 */}
//           <div className="space-y-4">
//             <div className="flex items-start gap-3">
//               <User className="w-5 h-5 text-muted-foreground mt-1" />
//               <div>
//                 <p className="text-sm text-muted-foreground">Cliente</p>
//                 <p className="font-medium text-foreground">
//                   {contrato.usuario?.nome || "N/A"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <Car className="w-5 h-5 text-muted-foreground mt-1" />
//               <div>
//                 <p className="text-sm text-muted-foreground">Veículo</p>
//                 <p className="font-medium text-foreground">
//                   {contrato.veiculo?.nome || "N/A"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <Building className="w-5 h-5 text-muted-foreground mt-1" />
//               <div>
//                 <p className="text-sm text-muted-foreground">Banco</p>
//                 <p className="font-medium text-foreground">{contrato.banco}</p>
//               </div>
//             </div>
//           </div>

//           {/* Coluna 2 */}
//           <div className="space-y-4">
//             <div className="flex items-start gap-3">
//               <DollarSign className="w-5 h-5 text-muted-foreground mt-1" />
//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Valor da Parcela
//                 </p>
//                 <p className="font-medium text-foreground">
//                   {formatarPreco(contrato.valorParcela)}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <Hash className="w-5 h-5 text-muted-foreground mt-1" />
//               <div>
//                 <p className="text-sm text-muted-foreground">Parcelas</p>
//                 <p className="font-medium text-foreground">
//                   {contrato.parcelaAtual} / {contrato.totalParcelas}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <DollarSign className="w-5 h-5 text-muted-foreground mt-1" />
//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Valor Financiado
//                 </p>
//                 <p className="font-medium text-foreground">
//                   {formatarPreco(contrato.valorTotalFinanciamento)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Coluna 3 */}
//           <div className="space-y-4">
//             <div className="flex items-start gap-3">
//               <Calendar className="w-5 h-5 text-muted-foreground mt-1" />
//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Data de Pagamento
//                 </p>
//                 <p className="font-medium text-foreground">
//                   {new Date(contrato.dataPagamento).toLocaleDateString("pt-BR")}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <DollarSign className="w-5 h-5 text-muted-foreground mt-1" />
//               <div>
//                 <p className="text-sm text-muted-foreground">Entrada</p>
//                 <p className="font-medium text-foreground">
//                   {formatarPreco(contrato.valorFinalEntrada)}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <FileText className="w-5 h-5 text-muted-foreground mt-1" />
//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   Descrição da Entrada
//                 </p>
//                 <p className="font-medium text-foreground">
//                   {contrato.descricaoEntrada}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabela de Pagamentos */}
//       <TabelaPagamentos contrato={contrato} />
//     </div>
//   );
// }
export default function Page() {
  return <div>Detalhes do Contrato</div>;
}
