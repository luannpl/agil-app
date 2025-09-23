import {
  Instagram,
  MessageCircle,
  Phone,
  MapPin,
  Mail,
  Clock,
  Car,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/veiculos", label: "Veículos" },
    { href: "/financiamento", label: "Financiamento" },
    { href: "/contato", label: "Contato" },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "Telefone",
      value: "(85) 92164-4075",
      href: "tel:+5585921644075",
    },
    {
      icon: Mail,
      label: "E-mail",
      value: "contato@agilveiculos.com",
      href: "mailto:contato@agilveiculos.com",
    },
    {
      icon: Clock,
      label: "Horário",
      value: "Seg-Sex: 8h-18h | Sáb: 8h-13h",
    },
  ];

  const socialLinks = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/5585921644075?text=Olá,%20vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20os%20veículos",
      color: "hover:bg-green-500/10 hover:border-green-500",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/automoveisagil/",
      color: "hover:bg-pink-500/10 hover:border-pink-500",
    },
    {
      icon: MapPin,
      label: "Localização",
      href: "https://maps.app.goo.gl/WLc5pQ5KXrHJBJMQ7",
      color: "hover:bg-blue-500/10 hover:border-blue-500",
    },
  ];

  return (
    <footer className="relative mt-24 bg-gradient-dark/60 border-t border-footer-border text-footer-foreground overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-footer-accent to-transparent"></div>

      <div className="container mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/agil-logo.png"
                alt="Ágil Veículos"
                className="h-12 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Ágil Veículos
                </h3>
                <p className="text-xs text-footer-foreground">
                  Seu carro novo está aqui
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-footer-foreground">
              Especialistas em compra e venda de veículos, oferecendo as
              melhores condições de financiamento e consórcio. Qualidade e
              confiança em cada negociação.
            </p>
            <div className="mt-6 flex items-center gap-2 text-footer-accent">
              <Car className="h-4 w-4" />
              <span className="text-sm font-medium">
                Mais de 2 anos no mercado
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Links Rápidos
            </h4>
            <nav className="space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-footer-foreground transition-colors hover:text-footer-accent hover:translate-x-1 transform transition-transform"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contato
            </h4>
            <div className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-3 text-sm">
                    <Icon className="h-4 w-4 text-footer-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-footer-foreground/60 text-xs">
                        {item.label}
                      </p>
                      <p className="text-footer-foreground">{item.value}</p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block transition-colors hover:text-footer-accent"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label}>{content}</div>
                );
              })}
            </div>
          </div>

          {/* Newsletter/CTA */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Conecte-se
            </h4>
            <p className="mb-4 text-sm text-footer-foreground">
              Siga-nos nas redes sociais e fique por dentro das melhores
              ofertas!
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-footer-border bg-footer-card transition-all ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5 text-footer-accent transition-transform group-hover:scale-110" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-footer-card px-2 py-1 text-xs text-footer-foreground opacity-0 transition-opacity group-hover:opacity-100">
                      {social.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-footer-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center text-sm text-footer-foreground/60 sm:text-left">
              © {new Date().getFullYear()} Ágil Veículos. Todos os direitos
              reservados.
            </div>
            <div className="flex gap-6 text-sm">
              <Link
                href="/privacidade"
                className="text-footer-foreground/60 transition-colors hover:text-footer-accent"
              >
                Privacidade
              </Link>
              <Link
                href="/termos"
                className="text-footer-foreground/60 transition-colors hover:text-footer-accent"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-glow opacity-30"></div>
    </footer>
  );
};

export default Footer;
