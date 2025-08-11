import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/kibo-ui/marquee";
import Image from "next/image";
import Link from "next/link";

export default function Marcas() {
  const marcas = [
    { id: 1, name: "Fiat", logo: "/fiatLogo.svg" },
    { id: 2, name: "Volkswagen", logo: "/volkswagenLogo.svg" },
    { id: 3, name: "Chevrolet", logo: "/chevroletLogo.svg" },
    { id: 4, name: "BMW", logo: "/bmwLogo.svg" },
    { id: 5, name: "Audi", logo: "/audiLogo.svg" },
    { id: 8, name: "Honda", logo: "/hondaLogo.svg" },
  ];
  return (
    <div className="mt-12 flex size-full items-center justify-center bg-background">
      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent>
          {marcas.map((marca, index) => (
            <MarqueeItem className="h-32 w-32" key={index}>
              <Link href={`/veiculos/${marca.name.toLowerCase()}`}>
                <Image
                  alt={marca.name}
                  className="overflow-hidden rounded-full"
                  src={marca.logo}
                  width={128}
                  height={128}
                />
              </Link>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
}
