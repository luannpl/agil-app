"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from "next/image";

export default function HeroSection() {

  const navigation = [
      { title: "Veiculos", path: "/veiculos" }, //tem que criar
      { title: "Quem somos", path: "/sobre" }, // tem que criar, pode ser /sobre ou /quemSomos
      { title: "Contato", path: "/contato" }, // tem que criar
      { title: "Admin", path: "/admin" }
  ]
  
    return (
        <>
            <header>
                <nav className="items-center pt-0 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
                    <div className="flex justify-between">
                        <Link href="/">
                            <Image
                                src="/agil-logo.png" 
                                width={120} 
                                height={50}
                                alt="Float UI logo"
                            />
                        </Link>
                    </div>
                    <ul className={`flex-1 justify-between mt-12 md:flex md:mt-0`}>
                        <li className="order-2 pb-5 md:pb-0">
                            <Link href={"/login"}>
                                <Button variant="auth" size="sm" className="w-full md:w-auto">
                                    Entrar
                                </Button>
                            </Link>
                        </li>
                        <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
                            {
                                navigation.map((item, idx) => (
                                    <li className="text-gray-400 hover:text-yellow-500" key={idx}>
                                        <Link href={item.path}>{item.title}</Link>
                                    </li>
                                ))
                            }
                        </div>
                    </ul>
                </nav>
            </header>
            <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-4 sm:px-8">
                <div className="text-center space-y-4">
                    <h1 className="text-gray-400 font-bold text-4xl md:text-5xl">
                        Compre seu veículo com
                         <span className="text-yellow-500"> Ágil Veiculos</span>
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
                    Loja Automotiva para venda, troca, compra e financiamento de Automóveis
                    </p>
                </div>
                <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
                    <Link href="/veiculos">
                    <Button className="w-full sm:w-auto" variant="auth" size="lg">
                        Ver Veiculos
                    </Button>
                    </Link>
                    <Link href="https://wa.me//5585921644075?text=Tenho%20interesse%20em%20comprar%20um%20carro">
                    <Button className="w-full sm:w-auto" variant="outline" size="lg">
                        Comprar
                    </Button>
                    </Link>
                </div>
            </section>
        </>
    )
}