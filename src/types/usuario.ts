export type Usuario = {
  id: string;
  nome: string;
  email: string;
  salario: number;
  ativo: boolean;
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