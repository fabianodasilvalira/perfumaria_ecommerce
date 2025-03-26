"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Heart,
  Home,
  User,
  Info,
  Map,
  ShoppingBag,
  Ticket,
  Users,
  Tag,
  HelpCircle,
  Code,
  ChevronDown,
  ChevronRight,
  FileText,
} from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export function MobileNav() {
  const { itemCount } = useCart()
  const { favoriteCount } = useFavorites()
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
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
    <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
      <div className="grid gap-2 p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold">Essence</span>
        </div>

        <button
          onClick={() => handleNavigation("/")}
          className="flex items-center gap-2 text-lg font-semibold p-2 hover:bg-muted/50 rounded-md text-left"
        >
          <Home className="h-5 w-5" />
          Início
        </button>

        <Collapsible open={isProductsOpen} onOpenChange={setIsProductsOpen} className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold p-2 hover:bg-muted/50 rounded-md">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Produtos
            </div>
            {isProductsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-7 pt-2">
            <div className="grid gap-2">
              <button
                onClick={() => handleNavigation("/masculinos")}
                className="flex items-center gap-2 text-base p-2 hover:bg-muted/50 rounded-md text-left"
              >
                <User className="h-4 w-4" />
                Masculinos
              </button>
              <button
                onClick={() => handleNavigation("/femininos")}
                className="flex items-center gap-2 text-base p-2 hover:bg-muted/50 rounded-md text-left"
              >
                <User className="h-4 w-4" />
                Femininos
              </button>
              <button
                onClick={() => handleNavigation("/unissex")}
                className="flex items-center gap-2 text-base p-2 hover:bg-muted/50 rounded-md text-left"
              >
                <Users className="h-4 w-4" />
                Unissex
              </button>
              <button
                onClick={() => handleNavigation("/produtos")}
                className="flex items-center gap-2 text-base p-2 hover:bg-muted/50 rounded-md text-left"
              >
                <ShoppingBag className="h-4 w-4" />
                Todos os Produtos
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <button
          onClick={() => handleNavigation("/promocoes")}
          className="flex items-center gap-2 text-lg font-semibold bg-primary/10 p-2 rounded-md text-primary text-left"
        >
          <Tag className="h-5 w-5" />
          Promoções
        </button>

        <button
          onClick={() => handleNavigation("/cupons")}
          className="flex items-center gap-2 text-lg font-semibold p-2 hover:bg-muted/50 rounded-md text-left"
        >
          <Ticket className="h-5 w-5" />
          Cupons
          <Badge variant="secondary" className="ml-1 text-[10px] h-4 px-1">
            Novo
          </Badge>
        </button>

        <button
          onClick={() => handleNavigation("/mapa-olfativo")}
          className="flex items-center gap-2 text-lg font-semibold p-2 hover:bg-muted/50 rounded-md text-left"
        >
          <Map className="h-5 w-5" />
          Mapa Olfativo
        </button>

        <button
          onClick={() => handleNavigation("/quiz")}
          className="flex items-center gap-2 text-lg font-semibold p-2 hover:bg-muted/50 rounded-md text-left"
        >
          <HelpCircle className="h-5 w-5" />
          Quiz
        </button>

        <Collapsible open={isMoreOpen} onOpenChange={setIsMoreOpen} className="w-full">
          <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-semibold p-2 hover:bg-muted/50 rounded-md">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Mais
            </div>
            {isMoreOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-7 pt-2">
            <div className="grid gap-2">
              <button
                onClick={() => handleNavigation("/sobre")}
                className="flex items-center gap-2 text-base p-2 hover:bg-muted/50 rounded-md text-left"
              >
                <Info className="h-4 w-4" />
                Quem Somos
              </button>
              <button
                onClick={() => handleNavigation("/api-docs")}
                className="flex items-center gap-2 text-base p-2 hover:bg-muted/50 rounded-md text-left"
              >
                <Code className="h-4 w-4" />
                API Docs
              </button>
              <button
                onClick={() => handleNavigation("/termos")}
                className="flex items-center gap-2 text-base p-2 hover:bg-muted/50 rounded-md text-left"
              >
                <FileText className="h-4 w-4" />
                Termos de Uso
              </button>
              <button
                onClick={() => handleNavigation("/privacidade")}
                className="flex items-center gap-2 text-base p-2 hover:bg-muted/50 rounded-md text-left"
              >
                <FileText className="h-4 w-4" />
                Política de Privacidade
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="border-t my-2 pt-2">
          <button
            onClick={() => handleNavigation("/favoritos")}
            className="flex items-center gap-2 text-lg font-semibold p-2 hover:bg-muted/50 rounded-md w-full text-left"
          >
            <Heart className="h-5 w-5" />
            Favoritos
            {favoriteCount > 0 && <Badge className="ml-auto">{favoriteCount}</Badge>}
          </button>

          <button
            onClick={() => handleNavigation("/perfil")}
            className="flex items-center gap-2 text-lg font-semibold p-2 hover:bg-muted/50 rounded-md w-full text-left"
          >
            <User className="h-5 w-5" />
            Perfil
          </button>

          <button
            onClick={() => handleNavigation("/carrinho")}
            className="flex items-center gap-2 text-lg font-semibold p-2 hover:bg-muted/50 rounded-md w-full text-left"
          >
            <ShoppingBag className="h-5 w-5" />
            Carrinho
            {itemCount > 0 && <Badge className="ml-auto">{itemCount}</Badge>}
          </button>
        </div>
      </div>
    </ScrollArea>
  )
}

