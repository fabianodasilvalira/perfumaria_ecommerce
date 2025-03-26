"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Modificar o handleSubmit para evitar loops infinitos

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Evitar múltiplos envios
    if (isLoading) return

    setIsLoading(true)

    try {
      // Simulação de login
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Verificar credenciais (simulado)
      if (email === "admin@essence.com" && password === "admin123") {
        // Simular armazenamento de token e informações do usuário
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: "1",
            name: "Administrador",
            email: "admin@essence.com",
            role: "admin",
          }),
        )
        localStorage.setItem("token", "simulated-jwt-token")

        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel administrativo",
        })

        // Usar setTimeout para evitar problemas de renderização
        setTimeout(() => {
          router.push("/admin")
        }, 100)
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha incorretos",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro ao processar sua solicitação",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Entrar</CardTitle>
          <CardDescription>Digite suas credenciais para acessar o sistema</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Ocultar senha" : "Mostrar senha"}</span>
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Para fins de demonstração, use:</p>
              <p>Email: admin@essence.com</p>
              <p>Senha: admin123</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            <div className="mt-4 text-center text-sm">
              <Link href="/cadastro" className="text-primary hover:underline">
                Não tem uma conta? Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

