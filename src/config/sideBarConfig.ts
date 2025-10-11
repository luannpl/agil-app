type NavItem = {
  title: string;
  url: string;
  items: { title: string; url: string }[];
};

type SidebarConfig = Record<string, { navMain: NavItem[] }>;

export const sidebarConfig: SidebarConfig = {
  admin: {
    navMain: [
      {
        title: "Veículos",
        url: "/admin/veiculos",
        items: [
          { title: "Cadastrar Veículo", url: "/admin/veiculos" },
          { title: "Ver Veículos", url: "/admin/veiculos/view" },
        ],
      },
      {
        title: "Usuários",
        url: "/admin/usuarios",
        items: [
          { title: "Cadastrar Usuário", url: "/admin/usuarios" },
          { title: "Ver Usuários", url: "/admin/usuarios/view" },
        ],
      },
      {
        title: "Contratos",
        url: "/admin/contratos",
        items: [
          { title: "Novo Contrato", url: "/admin/contratos" },
          { title: "Ver Contratos", url: "/admin/contratos/view" },
        ],
      },
      {
        title: "Painel de Controle",
        url: "/admin/painel-controle",
        items: [
          { title: "Perfil", url: "/admin/usuarios/perfil" },
          { title: "Dashboard", url: "/admin/dashboard" },
        ],
      },
    ],
  },

  vendedor: {
    navMain: [
      {
        title: "Veículos",
        url: "/admin/veiculos",
        items: [
          { title: "Cadastrar Veículo", url: "/admin/veiculos" },
          { title: "Ver Veículos", url: "/admin/veiculos/view" },
        ],
      },
      {
        title: "Painel de Controle",
        url: "/admin/painel-controle",
        items: [{ title: "Dashboard", url: "/admin/dashboard" }],
      },
    ],
  },

  despachante: {
    navMain: [
      {
        title: "Veículos",
        url: "/admin/veiculos",
        items: [{ title: "Ver Veículos", url: "/admin/veiculos/view" }],
      },
      {
        title: "Painel de Controle",
        url: "/admin/painel-controle",
        items: [{ title: "Dashboard", url: "/admin/dashboard" }],
      },
    ],
  },

  default: {
    navMain: [
      {
        title: "Veículos",
        url: "/admin/veiculos",
        items: [{ title: "Ver Veículos", url: "/admin/veiculos/view" }],
      },
      {
        title: "Painel de Controle",
        url: "/admin/painel-controle",
        items: [
          { title: "Perfil", url: "/admin/usuarios/perfil" },
          { title: "Dashboard", url: "/admin/dashboard" },
        ],
      },
    ],
  },
};
