import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Phone, Clock, Star, MoveRight, Car } from "lucide-react";
import Link from "next/link";

export type EmptyCardVariant =
  | "coming-soon"
  | "cta"
  | "testimonial"
  | "benefits";

interface EmptyStateCardProps {
  variant?: EmptyCardVariant;
}

export function EmptyStateCard({
  variant = "coming-soon",
}: EmptyStateCardProps) {
  if (variant === "coming-soon") {
    return (
      <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 h-full min-h-[400px] flex flex-col items-center justify-center p-6 group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
        <div className="relative z-10 text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center animate-pulse">
            <Sparkles className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="text-xl font-semibold text-white">Em Breve</h3>
          <p className="text-zinc-400 max-w-xs">
            Novos veículos incríveis estão chegando ao nosso estoque
          </p>
          <Link href="/veiculos">
            <Button
              className="h-12 group relative overflow-hidden"
              variant={"auth"}
            >
              <span className="flex items-center gap-2 transition-all duration-500 group-hover:opacity-0 group-hover:translate-x-4">
                Ver todos os veículos
                <MoveRight />
              </span>
              <Car className="absolute left-1/2 top-1/2 -translate-y-1/2 opacity-0 -translate-x-[200%] transition-all duration-500 group-hover:opacity-100 group-hover:-translate-x-1/2 w-14 h-14" />
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  if (variant === "cta") {
    return (
      <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 h-full min-h-[400px] flex flex-col items-center justify-center p-6 group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-10" />
        <div className="relative z-10 text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/25">
            <Phone className="w-10 h-10 text-black" />
          </div>
          <h3 className="text-xl font-semibold text-white">Fale Conosco</h3>
          <p className="text-zinc-400 max-w-xs">
            Nossa equipe está pronta para você
          </p>
          <Link href="/veiculos">
            <Button
              className="h-12 group relative overflow-hidden"
              variant={"auth"}
            >
              <span className="flex items-center gap-2 transition-all duration-500 group-hover:opacity-0 group-hover:translate-x-4">
                Entrar em Contato
                <MoveRight />
              </span>
              <Phone className="absolute left-1/2 top-1/2 -translate-y-1/2 opacity-0 -translate-x-[200%] transition-all duration-500 group-hover:opacity-100 group-hover:-translate-x-1/2 w-14 h-14" />
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  if (variant === "testimonial") {
    return (
      <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 h-full min-h-[400px] flex flex-col justify-between p-6">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
          ))}
        </div>
        <blockquote className="flex-1 flex flex-col justify-center">
          <p className="text-white italic mb-4">
            Excelente atendimento e veículos de qualidade. Recomendo a todos que
            buscam confiança na compra!
          </p>
          <footer className="text-sm text-zinc-400">
            <strong className="text-white">João Silva</strong>
            <br />
            Cliente satisfeito
          </footer>
        </blockquote>
      </Card>
    );
  }

  if (variant === "benefits") {
    return (
      <Card className="relative overflow-hidden border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 h-full min-h-[400px] flex flex-col justify-center p-6">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <Clock className="w-12 h-12 text-amber-500 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-white">
              Vantagens Exclusivas
            </h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">✓</span>
              <span className="text-white">Financiamento em até 60x</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">✓</span>
              <span className="text-white">Garantia estendida</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">✓</span>
              <span className="text-white">Test drive agendado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 mt-1">✓</span>
              <span className="text-white">Troca com avaliação justa</span>
            </li>
          </ul>
        </div>
      </Card>
    );
  }

  return null;
}
