export type Usuario = {
  id: string;
  nome: string;
  email: string;
  salario?: number;
  ativo: boolean;
};

export type UsuarioResponse = {
  id: string;
  nome: string;
  email: string;
  tipo: "admin" | "vendedor" | "despachante" | "cliente";
  message?: string;
};

export type CreateUsuarioDTO = {
  nome: string;
  email: string;
  senha: string;
  tipo: "admin" | "vendedor" | "despachante" | "cliente";
};

export type LoginResponse = {
  token: string;
  usuario: {
    id: string;
    nome: string;
  };
};

export type LoginForm = {
  email: string;
  senha: string;
};
