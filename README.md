# 🚀 Agil App

**Agil App** é uma aplicação web desenvolvida com foco em desempenho, tipagem segura e uma interface moderna. Utiliza **Next.js**, **TypeScript**, **Tailwind CSS** e os componentes acessíveis do **shadcn/ui**.

## 🛠️ Tecnologias

- **Next.js** – Framework React para aplicações web modernas e otimizadas
- **TypeScript** – Tipagem estática para maior segurança e produtividade
- **Tailwind CSS** – Utilitários CSS para construir interfaces responsivas rapidamente
- **shadcn/ui** – Conjunto de componentes acessíveis e integrados com Tailwind CSS
- **Radix UI** – Sistema de componentes que serve de base para o shadcn

## 📦 Instalação

### Pré-requisitos

- Node.js `>= 18`
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/luannpl/agil-app.git
cd agil-app

# Instale as dependências
npm install
# ou
yarn install
```

## 🔥 Rodando o Projeto

```bash
# Inicie o ambiente de desenvolvimento
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```bash
agil-app/
├── app/                # App Router do Next.js (páginas, layouts, etc.)
├── components/         # Componentes reutilizáveis
├── lib/                # Funções utilitárias, validações, hooks, etc.
├── public/             # Arquivos públicos (imagens, favicon, etc.)
├── tailwind.config.ts  # Configuração do Tailwind CSS
├── tsconfig.json       # Configuração do TypeScript
└── ...
```

## ✨ shadcn/ui

Adicione componentes com o CLI:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
```

Documentação completa: [ui.shadcn.dev](https://ui.shadcn.dev)

## 🧪 Scripts

```bash
npm run dev       # Inicia o servidor de desenvolvimento
npm run build     # Gera build de produção
npm run lint      # Verifica problemas de lint
npm run format    # Formata o código com Prettier
```

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.

---

Feito com 💙 por Paulo Luan • Projeto **Agil App**
