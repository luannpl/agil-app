import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  CreditCard,
  Users,
  FileText,
  Shield,
  Headphones,
  Star,
  MessageCircle,
  Zap,
} from "lucide-react";

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
    icon: CreditCard,
  },
  {
    title: "Consórcio",
    description: "Consórcio de veículos com parcelas que cabem no seu bolso.",
    link: "https://consorcio.com",
    icon: Users,
  },
  {
    title: "Promissória",
    description:
      "Venda de veículos com promissória, facilitando a compra do seu carro.",
    link: "https://promissoria.com",
    icon: FileText,
  },
  {
    title: "Garantia",
    description:
      "Oferecemos garantia estendida para veículos, proporcionando mais segurança na sua compra.",
    link: "https://garantia.com",
    icon: Shield,
  },
  {
    title: "Suporte",
    description: "Oferecemos suporte completo para a compra do seu veículo.",
    link: "https://suporte.com",
    icon: Headphones,
  },
  {
    title: "Qualidade",
    description:
      "Oferecemos veículos de alta qualidade, com garantia e procedência.",
    link: "https://qualidade.com",
    icon: Star,
  },
  {
    title: "Atendimento",
    description:
      "Oferecemos um atendimento personalizado e de qualidade para nossos clientes.",
    link: "https://atendimento.com",
    icon: MessageCircle,
  },
  {
    title: "Agilidade",
    description:
      "Agilidade na compra e venda de veículos, com processos rápidos e eficientes.",
    link: "https://agilidade.com",
    icon: Zap,
  },
];
