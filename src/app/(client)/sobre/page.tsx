import { Button } from "@/components/ui/button";
import {
  Car,
  CheckCircle,
  Handshake,
  Heart,
  Medal,
  MoveRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Luan",
    role: "CEO & Founder",
    avatar: "/avatar-placeholder.svg",
  },
  {
    name: "Brenna",
    role: "Marketing Director",
    avatar: "/avatar-placeholder.svg",
  },
  {
    name: "John Doe",
    role: "Sales Manager",
    avatar: "/avatar-placeholder.svg",
  },
  {
    name: "Jane Smith",
    role: "Customer Support",
    avatar: "/avatar-placeholder.svg",
  },
];

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
  return (
    <div className="bg-background text-gray-400">
      <section className="relative h-64 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-yellow-500">Sobre Nós</h1>
        <p className="text-xl text-gray-200 mt-2">
          Conheça a história da Ágil Veículos
        </p>
      </section>

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-yellow-500 mb-4">
            Nossa Missão é Realizar Sonhos
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Na Ágil Veículos, acreditamos que a compra de um carro é mais do que
            uma simples transação. É a realização de um sonho, a conquista de um
            objetivo. Por isso, nossa missão é oferecer a melhor experiência de
            compra, com atendimento personalizado, veículos de qualidade e as
            melhores condições do mercado.
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
                className="bg-background p-6 rounded-lg text-center"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto mb-4 bg-yellow-500"
                />
                <h3 className="text-xl font-bold text-gray-300">
                  {member.name}
                </h3>
                <p className="text-yellow-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 pb-4 text-center">
        <h2 className="text-yellow-500 font-semibold text-3xl text-center mb-4">
          Pronto para Encontrar seu Próximo Carro?
        </h2>
        <p className="text-lg mb-8 text-gray-300">
          Explore nosso estoque e encontre o veículo perfeito para você.
        </p>
        <Link href="/veiculos">
          <Button
            className="h-12 group relative overflow-hidden"
            variant={"auth"}
          >
            <span className="flex items-center gap-2 transition-all duration-500 group-hover:opacity-0 group-hover:translate-x-4">
              Ver veículos
              <MoveRight />
            </span>
            <Car className="absolute left-1/2 top-1/2 -translate-y-1/2 opacity-0 -translate-x-[200%] transition-all duration-500 group-hover:opacity-100 group-hover:-translate-x-1/2 w-14 h-14" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
