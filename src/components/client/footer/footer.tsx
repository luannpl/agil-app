import Link from "next/link";
import { Instagram, MessageCircleMore, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const footerNavs = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/veiculos",
      name: "Veículos",
    },
    {
      href: "/contato",
      name: "Contato",
    },
    {
      href: "/localizacao",
      name: "Localização",
    },
  ];

  return (
    <footer className="text-gray-500 border-t bg-background w-full px-4 pb-4 max-w-screen-xl mt-16 mx-auto md:px-8">
      <div className="max-w-lg mx-auto text-center">
        <img src="/agil-logo.png" alt="Agil Logo" className="w-32 mx-auto" />
        <p className="leading-relaxed mt-2 text-[15px]">
          Somos uma empresa especializada na compra e venda de veículos,
          oferecendo as melhores condições de financiamento, consórcio e
          promissória. Nossa missão é facilitar a aquisição do seu veículo novo
          ou usado, garantindo qualidade e segurança em todas as etapas do
          processo.
        </p>
      </div>
      <ul className="flex flex-wrap justify-center mt-8 gap-4 text-sm">
        {footerNavs.map((item, idx) => (
          <Link className="px-2" key={idx} href={item.href}>
            {item.name}
          </Link>
        ))}
      </ul>
      <div className="mt-8 flex flex-col-reverse items-center sm:flex-row sm:justify-between">
        <div className="mt-4 sm:mt-0 text-center sm:text-left">
          &copy; {new Date().getFullYear()} Ágil Veículos. Todos os direitos
          reservados.
        </div>

        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4">
            <a
              href="tel:+5585921644075"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Phone className="w-5 h-5 text-yellow-600" />
              </li>
            </a>

            <Link href="https://wa.me//5585921644075?text=Olá,%20vim%20pelo%20site%20e%20quero%20saber%20mais%20sobre%20os%20veículos">
              <li className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <MessageCircleMore className="w-5 h-5 text-yellow-600" />
              </li>
            </Link>

            <Link href="https://www.instagram.com/automoveisagil/">
              <li className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Instagram className="w-5 h-5 text-yellow-600" />
              </li>
            </Link>

            <a
              href="https://maps.app.goo.gl/WLc5pQ5KXrHJBJMQ7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <MapPin className="w-5 h-5 text-yellow-600" />
              </li>
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
}
