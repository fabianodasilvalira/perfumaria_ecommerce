"use client"

import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, Home, User, Info, Map, ShoppingBag, Ticket, Users, Tag, HelpCircle, Code } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"

export function MobileNav() {
  const { itemCount } = useCart()
  const { favoriteCount } = useFavorites()

  return (
    <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
      <div className="grid gap-2 p-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Home className="h-5 w-5" />
          Início
        </Link>
        <Link href="/masculinos" className="flex items-center gap-2 text-lg font-semibold">
          <User className="h-5 w-5" />
          Masculinos
        </Link>
        <Link href="/femininos" className="flex items-center gap-2 text-lg font-semibold">
          <User className="h-5 w-5" />
          Femininos
        </Link>
        <Link href="/unissex" className="flex items-center gap-2 text-lg font-semibold">
          <Users className="h-5 w-5" />
          Unissex
        </Link>
        <Link href="/produtos" className="flex items-center gap-2 text-lg font-semibold">
          <ShoppingBag className="h-5 w-5" />
          Todos os Produtos
        </Link>
        <Link href="/promocoes" className="flex items-center gap-2 text-lg font-semibold">
          <Tag className="h-5 w-5" />
          Promoções
        </Link>
        <Link href="/cupons" className="flex items-center gap-2 text-lg font-semibold">
          <Ticket className="h-5 w-5" />
          Cupons
        </Link>
        <Link href="/mapa-olfativo" className="flex items-center gap-2 text-lg font-semibold">
          <Map className="h-5 w-5" />
          Mapa Olfativo
        </Link>
        <Link href="/quiz" className="flex items-center gap-2 text-lg font-semibold">
          <HelpCircle className="h-5 w-5" />
          Quiz
        </Link>
        <Link href="/sobre" className="flex items-center gap-2 text-lg font-semibold">
          <Info className="h-5 w-5" />
          Sobre
        </Link>
        <Link href="/api-docs" className="flex items-center gap-2 text-lg font-semibold">
          <Code className="h-5 w-5" />
          API
        </Link>
        <Link href="/favoritos" className="flex items-center gap-2 text-lg font-semibold">
          <Heart className="h-5 w-5" />
          Favoritos
        </Link>
        <Link href="/perfil" className="flex items-center gap-2 text-lg font-semibold">
          <User className="h-5 w-5" />
          Perfil
        </Link>
      </div>
    </ScrollArea>
  )
}

