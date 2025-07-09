"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
// import z from "zod"

// const loginSchema = z.object({
//     email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
//     senha: z.string().min(1, "Senha é obrigatória"),
// })

export default function LoginPage() {
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login");
    }
    return (
        <div className="flex min-h-screen md:flex-row bg-whiteF">
            <div className="relative hidden flex-1 md:block">
                <Image
                    src="/agil-logo.webp"
                    alt="Logo Agil"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="flex items-center justify-center flex-1 p-6 bg-gradient-to-br from-stone-900 to-yellow-600/80 md:p-10">
                <Card className="w-full max-w-sm shadow-yellow-500/50 bg-stone-950">
                    <CardHeader>
                        <CardTitle>Entre na sua conta</CardTitle>
                        <CardDescription>
                            Digite seu email e senha para acessar sua conta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500"
                                        id="email"
                                        type="email"
                                        placeholder="agil@email.com"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Senha</Label>
                                    </div>
                                    <Input className="focus-visible:ring-yellow-500 focus-visible:border-yellow-500" id="password" type="password" placeholder="senha" />
                                </div>
                                <div className="flex-col gap-2">
                                <Button type="submit" className="w-full cursor-pointer text-foreground" variant="auth">
                                    Login
                                </Button>
                            </div>
                            </div>
                            
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center justify-center gap-2">
                        <p className="text-sm text-muted-foreground">Agil Veiculos Admin</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}