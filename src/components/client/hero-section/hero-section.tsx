"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HeroSection() {
  
    return (
        <>
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
                    <Button className="w-full sm:w-auto mb-2" variant="auth" size="lg">
                        Ver Veiculos
                    </Button>
                    </Link>
                    <Link href="https://wa.me//5585921644075?text=Tenho%20interesse%20em%20comprar%20um%20carro">
                    <Button className="w-full sm:w-auto mb-2" variant="outline" size="lg">
                        Comprar
                    </Button>
                    </Link>
                </div>
            </section>
        </>
    )
}