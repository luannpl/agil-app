"use client";

import { ReactNode } from "react";
import Header from "../header/header";


export default function LayoutContent({ children }: { children: ReactNode }) {

  return (
    <div className="flex justify-between flex-col min-h-screen text-white">
        <div>
    <Header/>
    {children}
    </div>
    <footer className="text-gray-400 py-4 text-center">
      <p>&copy; {new Date().getFullYear()} Ágil Veículos. Todos os direitos reservados.</p>
        <p className="text-sm">Feito com ❤️ por sua equipe</p>
    </footer>
    </div>
  );
}
