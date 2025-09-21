import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-screen-xl mx-auto px-0">
      <HoverEffect items={projects} />
    </div>
  );
}

export const projects = [
  {
    title: "Financiamento",
    description: "Financiamento de veículos com as melhores taxas do mercado.",
    link: "",
  },
  {
    title: "Consórcio",
    description: "Consórcio de veículos com parcelas que cabem no seu bolso.",
    link: "https://consorcio.com",
  },
  {
    title: "Promissória",
    description:
      "Venda de veículos com promissória, facilitando a compra do seu carro.",
    link: "https://promissoria.com",
  },
  {
    title: "Garantia",
    description:
      "Oferecemos garantia estendida para veículos, proporcionando mais segurança na sua compra.",
    link: "https://garantia.com",
  },
  {
    title: "Suporte",
    description: "Oferecemos suporte completo para a compra do seu veículo.",
    link: "https://suporte.com",
  },
  {
    title: "Qualidade",
    description:
      "Oferecemos veículos de alta qualidade, com garantia e procedência.",
    link: "https://qualidade.com",
  },
  {
    title: "Atendimento",
    description:
      "Oferecemos um atendimento personalizado e de qualidade para nossos clientes.",
    link: "https://atendimento.com",
  },
  {
    title: "Agilidade",
    description:
      "Agilidade na compra e venda de veículos, com processos rápidos e eficientes.",
    link: "https://agilidade.com",
  },
];
