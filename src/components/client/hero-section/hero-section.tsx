"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

const BannerInfos = [
  {
    title: (
      <>
        Seu próximo carro está na{" "}
        <span className="text-yellow-500">Ágil Veículos</span>
      </>
    ),
    description:
      "Compra, venda, troca e financiamento com segurança e transparência.",
    image: "/carrossel/1.jpeg",
    link: "/veiculos",
  },
  {
    title: "Qualidade e confiança em cada veículo",
    description:
      "Trabalhamos apenas com carros selecionados e revisados para você.",
    image: "/carrossel/2.jpeg",
    link: "/veiculos",
  },
  {
    title: "Financiamento facilitado",
    description: "Condições especiais para você sair de carro novo.",
    image: "/carrossel/3.jpeg",
    link: "/veiculos",
  },
];
export default function HeroSection() {
  return (
    <section className="mt-4 mx-auto w-full pb-4">
      <Carousel autoplay autoplaySpeed={4000} dots={false}>
        {BannerInfos.map((banner, index) => (
          <div key={index}>
            <div className="relative w-full h-[600px]">
              <Image
                key={index}
                src={banner.image}
                alt={`Carro em destaque ${banner.title}`}
                fill
                className="absolute inset-0 w-full h-full object-cover opacity-50"
                priority
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 space-y-4 bg-black/40">
                <h1 className="text-gray-100 font-bold text-4xl md:text-5xl drop-shadow">
                  {banner.title}
                </h1>
                <p className="text-gray-100 max-w-xl mx-auto leading-relaxed text-lg">
                  {banner.description}
                </p>
                <div className="mt-8 flex  flex-row gap-4">
                  <Link href="/veiculos">
                    <Button variant="auth" size="lg">
                      Ver Veículos
                    </Button>
                  </Link>
                  <Link href="https://wa.me//5585921644075?text=Tenho%20interesse%20em%20comprar%20um%20carro">
                    <Button size="lg" variant="primary">
                      Comprar Agora
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
