"use client"

import { Button } from "@/components/ui/button"
import { CartItem } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { useCart } from "@/context/cart-context"
import { ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const { items, isEmpty } = useCart()

  if (isEmpty) {
    return (
      <div className="container px-4 md:px-6 py-10">
        <div className="flex flex-col items-center justify-center gap-4 py-10">
          <div className="rounded-full bg-muted p-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground text-center max-w-[500px]">
            Parece que você ainda não adicionou nenhum perfume ao seu carrinho.
          </p>
          <Button asChild className="mt-4">
            <Link href="/produtos">Continuar Comprando</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="md:hidden">
            <Link href="/produtos">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Seu Carrinho</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          <div className="flex-1">
            <div className="rounded-lg border">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Itens do Carrinho ({items.length})</h2>
              </div>
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/produtos">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continuar Comprando
                </Link>
              </Button>

              <div className="text-sm text-muted-foreground lg:hidden">Deslize para ver mais opções</div>
            </div>
          </div>

          <div className="lg:w-1/3 sticky top-20">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  )
}

