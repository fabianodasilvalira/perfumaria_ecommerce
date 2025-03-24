import Link from "next/link"
import { Facebook, Instagram, Twitter, FileText, Ticket } from "lucide-react"

export default function Footer() {
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
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Início
              </Link>
              <Link href="/produtos" className="text-sm text-muted-foreground hover:text-foreground">
                Produtos
              </Link>
              <Link href="/promocoes" className="text-sm text-muted-foreground hover:text-foreground">
                Promoções
              </Link>
              <Link
                href="/cupons"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <Ticket className="h-3 w-3" />
                Cupons de Desconto
              </Link>
              <Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground">
                Quem Somos
              </Link>
              <Link href="/quiz" className="text-sm text-muted-foreground hover:text-foreground">
                Quiz de Perfumes
              </Link>
              <Link href="/mapa-olfativo" className="text-sm text-muted-foreground hover:text-foreground">
                Mapa Olfativo
              </Link>
              <Link
                href="/api-docs"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <FileText className="h-3 w-3" />
                API Docs
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold">Categorias</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/produtos?categoria=masculino"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Perfumes Masculinos
              </Link>
              <Link href="/produtos?categoria=feminino" className="text-sm text-muted-foreground hover:text-foreground">
                Perfumes Femininos
              </Link>
              <Link href="/produtos?categoria=unissex" className="text-sm text-muted-foreground hover:text-foreground">
                Perfumes Unissex
              </Link>
              <Link href="/produtos?categoria=kits" className="text-sm text-muted-foreground hover:text-foreground">
                Kits de Presente
              </Link>
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
            <Link href="/termos" className="hover:text-foreground">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:text-foreground">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

