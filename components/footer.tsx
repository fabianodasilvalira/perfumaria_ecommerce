"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, FileText, Ticket } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Footer() {
  const router = useRouter()

  const handleNavigation = (path: string) => {
    // Navegar para a página
    router.push(path)

    // Rolar para o topo da página
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Essence</h3>
            <p className="text-sm text-muted-foreground">Perfumes exclusivos para momentos especiais.</p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Navegação</h3>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => handleNavigation("/")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Início
              </button>
              <button
                onClick={() => handleNavigation("/produtos")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Produtos
              </button>
              <button
                onClick={() => handleNavigation("/promocoes")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Promoções
              </button>
              <button
                onClick={() => handleNavigation("/cupons")}
                className="text-sm text-muted-foreground hover:text-foreground text-left flex items-center gap-1"
              >
                <Ticket className="h-3 w-3" />
                Cupons de Desconto
              </button>
              <button
                onClick={() => handleNavigation("/sobre")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Quem Somos
              </button>
              <button
                onClick={() => handleNavigation("/quiz")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Quiz de Perfumes
              </button>
              <button
                onClick={() => handleNavigation("/mapa-olfativo")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Mapa Olfativo
              </button>
              <button
                onClick={() => handleNavigation("/api-docs")}
                className="text-sm text-muted-foreground hover:text-foreground text-left flex items-center gap-1"
              >
                <FileText className="h-3 w-3" />
                API Docs
              </button>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Categorias</h3>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => handleNavigation("/masculinos")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Perfumes Masculinos
              </button>
              <button
                onClick={() => handleNavigation("/femininos")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Perfumes Femininos
              </button>
              <button
                onClick={() => handleNavigation("/unissex")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Perfumes Unissex
              </button>
              <button
                onClick={() => handleNavigation("/produtos?categoria=kits")}
                className="text-sm text-muted-foreground hover:text-foreground text-left"
              >
                Kits de Presente
              </button>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Atendimento</h3>
            <p className="text-sm text-muted-foreground">Segunda a Sexta, 9h às 18h</p>
            <p className="text-sm text-muted-foreground">contato@essence.com.br</p>
            <p className="text-sm text-muted-foreground">(11) 99999-9999</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-4 border-t text-sm text-muted-foreground">
          <p>© 2025 Essence. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <button onClick={() => handleNavigation("/termos")} className="hover:text-foreground">
              Termos de Uso
            </button>
            <button onClick={() => handleNavigation("/privacidade")} className="hover:text-foreground">
              Política de Privacidade
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

