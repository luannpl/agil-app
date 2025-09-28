export type Usuario = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
};

export type UsuarioResponse = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: "admin" | "vendedor" | "despachante" | "cliente";
  message?: string;
};

export type ClienteResponse = {
  nome: string;
  email: string;
  telefone: string;
  tipo: "cliente";
  dataNasc?: string;
  cpf?: string;
  rg?: string;
  cnh?: string;
  cep?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  descricao?: string;
};

export type CreateUsuarioDTO = {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
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

export type AlterarSenhaForm = {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;
};
