import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHoverEffectDemo() {
  return (
    <div className="max-w-5xl mx-auto px-0 py-0">
      <HoverEffect className="py-0" items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Financiamnento",
    description: "Financiamento de veículos com as melhores taxas do mercado.",
    link: "https://financiamento.com",
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
];
