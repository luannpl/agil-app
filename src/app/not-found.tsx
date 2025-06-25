'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
      <p className="mb-6">A página que você está tentando acessar não existe.</p>
      <Link href="/">
        <span className="text-blue-500 underline hover:text-blue-700">
          Voltar para a página inicial
        </span>
      </Link>
    </div>
  );
}