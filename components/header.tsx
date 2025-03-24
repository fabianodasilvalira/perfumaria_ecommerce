"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Menu, Search, ShoppingBag, User, Sparkles, Info, Map, FileText, Percent, Ticket } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { MobileNav } from "./mobile-nav"
import { Badge } from "./ui/badge"
import { SearchDialog } from "./search-dialog"
import { useFavorites } from "@/context/favorites-context"

export default function Header() {
  const { itemCount } = useCart()
  const { favoriteCount } = useFavorites()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-4 flex items-center space-x-2">
          <span className="text-xl font-bold">Essence</span>
        </Link>

        <nav className="hidden md:flex gap-6 ml-6 overflow-x-auto">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap">
            Início
          </Link>
          <Link
            href="/masculinos"
            className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap"
          >
            Masculinos
          </Link>
          <Link
            href="/femininos"
            className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap"
          >
            Femininos
          </Link>
          <Link href="/unissex" className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap">
            Unissex
          </Link>
          <Link href="/produtos" className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap">
            Todos os Produtos
          </Link>
          <Link
            href="/promocoes"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap"
          >
            <Percent className="h-4 w-4 mr-1" />
            Promoções
          </Link>
          <Link
            href="/cupons"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap"
          >
            <Ticket className="h-4 w-4 mr-1" />
            Cupons
            <Badge variant="secondary" className="ml-1 text-[10px] h-4 px-1">
              Novo
            </Badge>
          </Link>
          <Link
            href="/mapa-olfativo"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap"
          >
            <Map className="h-4 w-4 mr-1" />
            Mapa Olfativo
          </Link>
          <Link
            href="/quiz"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Quiz
          </Link>
          <Link
            href="/sobre"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap"
          >
            <Info className="h-4 w-4 mr-1" />
            Quem Somos
          </Link>
          <Link
            href="/api-docs"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap"
          >
            <FileText className="h-4 w-4 mr-1" />
            API Docs
          </Link>
        </nav>

        <div className="flex items-center ml-auto gap-2 md:gap-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/favoritos">
              <Heart className="h-5 w-5" />
              {favoriteCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {favoriteCount}
                </Badge>
              )}
              <span className="sr-only">Favoritos</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/perfil">
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/carrinho">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Carrinho</span>
            </Link>
          </Button>
        </div>
      </div>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
}

