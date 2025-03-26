"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  Sparkles,
  Map,
  FileText,
  Percent,
  Ticket,
  ChevronDown,
} from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useState, useEffect, useRef } from "react"
import { MobileNav } from "./mobile-nav"
import { Badge } from "./ui/badge"
import { SearchDialog } from "./search-dialog"
import { useFavorites } from "@/context/favorites-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMenu } from "@/context/menu-context"

export default function Header() {
  const { itemCount } = useCart()
  const { favoriteCount } = useFavorites()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openMenu, toggleMenu } = useMenu()

  // Refs para os botões de dropdown
  const productsButtonRef = useRef<HTMLButtonElement>(null)
  const moreButtonRef = useRef<HTMLButtonElement>(null)

  // Detectar scroll para mudar a aparência do header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Efeito para simular clique no botão quando o menu é aberto externamente
  useEffect(() => {
    if (openMenu === "products" && productsButtonRef.current) {
      productsButtonRef.current.click()
    } else if (openMenu === "more" && moreButtonRef.current) {
      moreButtonRef.current.click()
    }
  }, [openMenu])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
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
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
            Essence
          </span>
        </Link>

        <nav className="hidden md:flex gap-4 ml-4 overflow-x-auto">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary whitespace-nowrap px-2 py-1"
          >
            Início
          </Link>

          <DropdownMenu onOpenChange={(open) => !open && openMenu === "products" && toggleMenu(null)}>
            <DropdownMenuTrigger asChild>
              <Button
                ref={productsButtonRef}
                variant="ghost"
                className="px-2 py-1 h-auto font-medium text-sm flex items-center gap-1"
                onClick={() => toggleMenu("products")}
              >
                Produtos
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/masculinos" className="cursor-pointer w-full">
                  Masculinos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/femininos" className="cursor-pointer w-full">
                  Femininos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/unissex" className="cursor-pointer w-full">
                  Unissex
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/produtos" className="cursor-pointer w-full">
                  Todos os Produtos
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/promocoes"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap bg-primary/10 px-3 py-1 rounded-full text-primary"
          >
            <Percent className="h-4 w-4 mr-1" />
            Promoções
          </Link>

          <Link
            href="/cupons"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap px-2 py-1"
          >
            <Ticket className="h-4 w-4 mr-1" />
            Cupons
            <Badge variant="secondary" className="ml-1 text-[10px] h-4 px-1">
              Novo
            </Badge>
          </Link>

          <Link
            href="/mapa-olfativo"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap px-2 py-1"
          >
            <Map className="h-4 w-4 mr-1" />
            Mapa Olfativo
          </Link>

          <Link
            href="/quiz"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center whitespace-nowrap px-2 py-1"
          >
            <Sparkles className="h-4 w-4 mr-1" />
            Quiz
          </Link>

          <DropdownMenu onOpenChange={(open) => !open && openMenu === "more" && toggleMenu(null)}>
            <DropdownMenuTrigger asChild>
              <Button
                ref={moreButtonRef}
                variant="ghost"
                className="px-2 py-1 h-auto font-medium text-sm flex items-center gap-1"
                onClick={() => toggleMenu("more")}
              >
                Mais
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/sobre" className="cursor-pointer w-full flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Quem Somos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/api-docs" className="cursor-pointer w-full flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  API Docs
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center ml-auto gap-2 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative hover:bg-primary/10 hover:text-primary transition-colors"
          >
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

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Link href="/perfil">
              <User className="h-5 w-5" />
              <span className="sr-only">Perfil</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative hover:bg-primary/10 hover:text-primary transition-colors"
          >
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

