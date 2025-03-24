"use client"

import type React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag } from "lucide-react"
import type { Product } from "@/types/product"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const isFav = isFavorite(product.id)

  const handleAddToCart = () => {
    setIsLoading(true)
    setTimeout(() => {
      addItem(product)
      toast({
        title: "Produto adicionado",
        description: `${product.name} foi adicionado ao carrinho`,
      })
      setIsLoading(false)
    }, 500)
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
  }

  const discount = product.discount || 0
  const hasDiscount = discount > 0
  const discountedPrice = hasDiscount ? product.price * (1 - discount / 100) : product.price

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link href={`/produtos/${product.id}`} className="relative">
        <div className="aspect-square relative bg-muted">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-all hover:scale-105"
          />
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">Novo</Badge>}
          {hasDiscount && <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>}
        </div>
      </Link>
      <CardContent className="p-4 flex-1">
        <div className="text-sm text-muted-foreground">{product.category}</div>
        <Link href={`/produtos/${product.id}`}>
          <h3 className="font-medium mt-1 hover:underline line-clamp-2">{product.name}</h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-semibold">
            {hasDiscount && (
              <span className="text-sm line-through text-muted-foreground mr-2">R$ {product.price.toFixed(2)}</span>
            )}
            <span className={cn(hasDiscount && "text-red-600")}>R$ {discountedPrice.toFixed(2)}</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleToggleFavorite}>
            <Heart className={cn("h-4 w-4", isFav && "fill-red-500 text-red-500")} />
            <span className="sr-only">{isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}</span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" size="sm" onClick={handleAddToCart} disabled={isLoading}>
          <ShoppingBag className="h-4 w-4 mr-2" />
          {isLoading ? "Adicionando..." : "Adicionar ao Carrinho"}
        </Button>
      </CardFooter>
    </Card>
  )
}

