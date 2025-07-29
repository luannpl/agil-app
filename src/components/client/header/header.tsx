import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Header(){

    const navigation = [
        { title: "Veiculos", path: "/veiculos" }, //tem que criar
        { title: "Quem somos", path: "/sobre" }, // tem que criar, pode ser /sobre ou /quemSomos
        { title: "Contato", path: "/contato" }, // tem que criar
        { title: "Admin", path: "/admin" }
    ]
    return(
        <>
        <header>
                <nav className="items-center pt-0 px-4 mx-auto max-w-screen-xl sm:px-8 md:flex md:space-x-6">
                    <div className="flex justify-between">
                        <Link href="/">
                            <Image
                                src="/agil-logo.png" 
                                width={120} 
                                height={50}
                                alt="Float UI logo"
                            />
                        </Link>
                    </div>
                    <ul className={`flex-1 justify-between mt-12 md:flex md:mt-0`}>
                        <li className="order-2 pb-5 md:pb-0">
                            <Link href={"/login"}>
                                <Button variant="auth" size="sm" className="w-full md:w-auto">
                                    Entrar
                                </Button>
                            </Link>
                        </li>
                        <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
                            {
                                navigation.map((item, idx) => (
                                    <li className="text-gray-400 hover:text-yellow-500" key={idx}>
                                        <Link href={item.path}>{item.title}</Link>
                                    </li>
                                ))
                            }
                        </div>
                    </ul>
                </nav>
            </header>
        </>
    )
}