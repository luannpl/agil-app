import { Button } from "@/components/ui/button";
import {
  Car,
  CheckCircle,
  Handshake,
  Heart,
  Medal,
  MoveRight,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "../../../../public/about-us-hero.jpg";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const features = [
  {
    icon: <Medal className="w-8 h-8 text-yellow-500" />,
    title: "Qualidade Garantida",
    description:
      "Todos os nossos veículos passam por uma rigorosa inspeção de qualidade para garantir que você receba o melhor.",
  },
  {
    icon: <Handshake className="w-8 h-8 text-yellow-500" />,
    title: "Financiamento",
    description:
      "Oferecemos as melhores condições de financiamento, consórcio e promissória para você realizar seu sonho.",
  },
  {
    icon: <Heart className="w-8 h-8 text-yellow-500" />,
    title: "Atendimento",
    description:
      "Nossa equipe está sempre pronta para oferecer um atendimento personalizado e ajudar você a encontrar o carro ideal.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-yellow-500" />,
    title: "Segurança e Confiança",
    description:
      "Garantimos a procedência de todos os nossos veículos, oferecendo segurança e transparência em cada negócio.",
  },
];

export default function Sobre() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Luan",
      designation: "CEO & Founder",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Brenna",
      designation: "Marketing Director",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "John Doe",
      designation: "Sales Manager",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-background text-gray-400 scroll-smooth">
      <section className="relative h-[800px] md:h-[500px] flex items-center justify-center">
        <Image
          src={backgroundImage.src}
          alt="about-us-hero"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-black text-yellow-400 drop-shadow-xl tracking-tighter">
            Ágil Veículos: Sua Jornada Começa Aqui
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mt-4 max-w-2xl mx-auto font-light">
            Conheça a história e os valores que nos movem a realizar o seu sonho
            do carro novo.
          </p>

          {/* Alteração 1: Adicionado 'mx-auto' para centralizar o bloco e 'block' para que 'mx-auto' funcione */}
          <a href="#missao" className="mt-12 block w-fit mx-auto">
            {/* Alteração 2: Animação mais suave para o ChevronDown */}
            <button className="flex items-center gap-3 px-8 py-3 bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-2xl hover:bg-yellow-400 transition-transform duration-300 transform hover:scale-105">
              Veja Mais
              <ChevronDown className="w-5 h-5 animate-[bounce_2s_infinite]" />
            </button>
          </a>
        </div>
      </section>

      <section id="missao" className="py-24 md:py-36 px-4 md:px-8 bg-black-900">
        <div className="max-w-4xl mx-auto text-center border-l-4 border-yellow-500 pl-6 md:pl-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-500 mb-6">
            Nossa Missão e Valores
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-light">
            Na Ágil Veículos, acreditamos que a compra de um carro é um marco. É
            a realização de um sonho, a conquista de um objetivo. Por isso,
            nossa missão é transcender a simples transação, oferecendo uma
            experiência de compra inigualável: atendimento personalizado,
            veículos de procedência rigorosa e as melhores condições de mercado.
          </p>
        </div>
      </section>

      <section className="bg-yellow-500 py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-background text-center mb-12">
            Por Que Escolher a Ágil Veículos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-2xl text-center shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-yellow-500 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-yellow-500 mb-12">
            Conheça Nossa Equipe
          </h2>

          <div>
            <AnimatedTestimonials testimonials={testimonials} />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center bg-yellow-500">
        <h2 className="text-gray-900 font-extrabold text-4xl mb-4">
          Pronto para dar a Volta?
        </h2>
        <p className="text-xl mb-10 text-gray-800 font-medium">
          Explore nosso estoque e encontre o veículo perfeito para você.
        </p>
        <Link href="/veiculos">
          <Button
            className="h-14 px-8 text-lg font-bold group relative overflow-hidden bg-black hover:bg-black text-white transition-all duration-500 rounded-lg shadow-xl"
            // Certifique-se de que a prop 'variant' foi removida (como discutido antes)
          >
            <span className="flex items-center gap-2 transition-all duration-500 group-hover:opacity-0 group-hover:translate-x-4">
              Ver veículos
              <MoveRight className="w-5 h-5" />
            </span>
            <Car className="absolute left-1/2 top-1/2 -translate-y-1/2 opacity-0 -translate-x-[200%] transition-all duration-500 group-hover:opacity-100 group-hover:-translate-x-1/2 w-14 h-14" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
