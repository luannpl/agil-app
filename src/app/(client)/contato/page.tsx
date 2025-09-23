"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateContato } from "@/hooks/useContato";
import { Contato } from "@/types/contato";
import { zodResolver } from "@hookform/resolvers/zod";
import { Instagram, MapPin, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const contatoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  mensagem: z.string().min(1, "Mensagem é obrigatória"),
});

export default function ContatoPage() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Contato>({
    mode: "onSubmit",
    resolver: zodResolver(contatoSchema),
  });
  const { mutate: createContato, isPending } = useCreateContato();
  const handleCreateContato = (data: Contato) => {
    createContato(data, {
      onSuccess: async () => {
        toast.success("Contato enviado com sucesso");
      },
      onError: () => {
        toast.error("Erro ao enviar contato");
      },
    });
  };

  const contactMethods = [
    {
      icon: <Instagram className="w-6 h-6" />,
      contact: "@automoveisagil",
      href: "https://www.instagram.com/automoveisagil/",
    },
    {
      icon: (
        <PhoneIcon
          className="w-6 h-6"
          strokeWidth={1.5}
          stroke="currentColor"
        />
      ),
      contact: "(85) 98954-3885",
      href: "tel:+5585989543885",
    },
    {
      icon: (
        <MapPin className="w-6 h-6" strokeWidth={1.5} stroke="currentColor" />
      ),
      contact: "R. São Benedito, 515 - Maraponga, Fortaleza - CE",
      href: "https://maps.app.goo.gl/3t8STPyRwP4hoowd7",
    },
  ];
  return (
    <main className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
          <div className="max-w-lg space-y-3">
            <h3 className="text-yellow-500 font-semibold">Contato</h3>
            <p className="text-yellow-500 text-3xl font-semibold sm:text-4xl">
              Deixe-nos saber como podemos ajudar
            </p>
            <p className="text-gray-300">
              Estamos aqui para ajudar e responder a qualquer dúvida que você
              possa ter. Aguardamos seu contato! Preencha o formulário ou use as
              informações de contato abaixo.
            </p>
            <div>
              <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                {contactMethods.map((item, idx) => (
                  <Link key={idx} href={item.href} target="_blank">
                    <li className="flex items-center gap-x-3  cursor-pointer">
                      <div className="flex-none text-gray-300">{item.icon}</div>
                      <p className="text-gray-300">{item.contact}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
            <form
              onSubmit={handleSubmit(handleCreateContato)}
              className="space-y-5"
            >
              <div className="flex flex-col gap-2">
                <Label className="font-medium text-gray-300">
                  Nome Completo
                </Label>
                <Input
                  type="text"
                  className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500 text-gray-200"
                  {...register("nome")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-medium text-gray-300">Email</Label>
                <Input
                  type="email"
                  className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500 text-gray-200"
                  {...register("email")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-medium text-gray-300">Telefone</Label>
                <Input
                  type="text"
                  className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500 text-gray-200"
                  {...register("telefone")}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="font-medium text-gray-300">Mensagem</Label>
                <Textarea
                  className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500 min-h-[120px] text-gray-200"
                  placeholder="Escreva sua mensagem aqui..."
                  {...register("mensagem")}
                ></Textarea>
              </div>
              <Button
                type="submit"
                variant="auth"
                className="w-full"
                disabled={isPending}
              >
                {isPending ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
