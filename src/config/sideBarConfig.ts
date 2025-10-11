import {
  Car,
  Users,
  FileText,
  LayoutDashboard,
  UserPlus,
  List,
  FilePlus,
  UserCircle,
  PlusCircle,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  items: { title: string; url: string; icon: LucideIcon }[];
};

type SidebarConfig = Record<string, { navMain: NavItem[] }>;

export const sidebarConfig: SidebarConfig = {
  admin: {
    navMain: [
      {
        title: "Veículos",
        url: "/admin/veiculos",
        icon: Car,
        items: [
          {
            title: "Cadastrar Veículo",
            url: "/admin/veiculos",
            icon: PlusCircle,
          },
          { title: "Ver Veículos", url: "/admin/veiculos/view", icon: List },
        ],
      },
      {
        title: "Usuários",
        url: "/admin/usuarios",
        icon: Users,
        items: [
          {
            title: "Cadastrar Usuário",
            url: "/admin/usuarios",
            icon: UserPlus,
          },
          { title: "Ver Usuários", url: "/admin/usuarios/view", icon: List },
        ],
      },
      {
        title: "Contratos",
        url: "/admin/contratos",
        icon: FileText,
        items: [
          { title: "Novo Contrato", url: "/admin/contratos", icon: FilePlus },
          { title: "Ver Contratos", url: "/admin/contratos/view", icon: List },
        ],
      },
      {
        title: "Painel de Controle",
        url: "/admin/painel-controle",
        icon: LayoutDashboard,
        items: [
          { title: "Perfil", url: "/admin/usuarios/perfil", icon: UserCircle },
          {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
          },
        ],
      },
    ],
  },

  vendedor: {
    navMain: [
      {
        title: "Veículos",
        url: "/admin/veiculos",
        icon: Car,
        items: [
          {
            title: "Cadastrar Veículo",
            url: "/admin/veiculos",
            icon: PlusCircle,
          },
          { title: "Ver Veículos", url: "/admin/veiculos/view", icon: List },
        ],
      },
      {
        title: "Painel de Controle",
        url: "/admin/painel-controle",
        icon: LayoutDashboard,
        items: [
          {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
          },
        ],
      },
    ],
  },

  despachante: {
    navMain: [
      {
        title: "Veículos",
        url: "/admin/veiculos",
        icon: Car,
        items: [
          { title: "Ver Veículos", url: "/admin/veiculos/view", icon: List },
        ],
      },
      {
        title: "Painel de Controle",
        url: "/admin/painel-controle",
        icon: LayoutDashboard,
        items: [
          {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
          },
        ],
      },
    ],
  },

  default: {
    navMain: [
      {
        title: "Veículos",
        url: "/admin/veiculos",
        icon: Car,
        items: [
          { title: "Ver Veículos", url: "/admin/veiculos/view", icon: List },
        ],
      },
      {
        title: "Painel de Controle",
        url: "/admin/painel-controle",
        icon: LayoutDashboard,
        items: [
          { title: "Perfil", url: "/admin/usuarios/perfil", icon: UserCircle },
          {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
          },
        ],
      },
    ],
  },
};
