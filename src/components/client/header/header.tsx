"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Veiculos", path: "/veiculos" },
    { title: "Quem somos", path: "/sobre" },
    { title: "Contato", path: "/contato" },
  ];

  return (
    <header className="relative z-50">
      <nav className="items-center pt-0 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6 relative z-50">
        <div className="flex justify-between items-center py-3 md:py-4">
          <Link href="/">
            <Image
              src="/agil-logo.png"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </Link>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Abrir menu"
              className="text-yellow-500 hover:text-yellow-600"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        <ul className="hidden md:flex flex-1 justify-between items-center">
          <div className="flex-1 flex justify-center items-center space-x-6">
            {navigation.map((item, idx) => {
              const isActive = pathname === item.path;

              return (
                <li
                  key={idx}
                  className={`transition-colors ${
                    isActive
                      ? "text-yellow-500 font-semibold"
                      : "text-gray-400 hover:text-yellow-500/75"
                  } text-xl font-medium`}
                >
                  <Link href={item.path}>{item.title}</Link>
                </li>
              );
            })}
          </div>
          <li>
            <Link href={"/login"}>
              <Button variant="auth" size="sm" className="w-full md:w-auto">
                Entrar
              </Button>
            </Link>
          </li>
        </ul>

        <div
          className={`
            fixed top-0 right-0 h-full w-2/3 bg-background text-gray-400 shadow-lg z-50 transform transition-transform duration-800 ease-in-out
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <span className="font-bold text-lg">Menu</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar menu"
              className="text-yellow-500 hover:text-yellow-900"
            >
              <X size={28} />
            </button>
          </div>

          <ul className="flex flex-col gap-4 p-6">
            {navigation.map((item, idx) => (
              <li key={idx} className="hover:text-yellow-500">
                <Link href={item.path} onClick={() => setOpen(false)}>
                  {item.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={"/login"} onClick={() => setOpen(false)}>
                <Button variant="auth" size="sm" className="w-full">
                  Entrar
                </Button>
              </Link>
            </li>
          </ul>
        </div>

        {open && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-40"
            onClick={() => setOpen(false)}
          />
        )}
      </nav>
    </header>
  );
}
