"use client"

import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { Heart, Minus, Plus, ShoppingBag, Star, Info } from "lucide-react"
import { useState } from "react"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DiscountExplainer } from "./discount-explainer"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const { addItem } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const isFav = isFavorite(product.id)

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    setIsLoading(true)
    setTimeout(() => {
      addItem({
        ...product,
        quantity,
        size: selectedSize,
      })
      toast({
        title: "Produto adicionado",
        description: `${product.name} foi adicionado ao carrinho`,
      })
      setIsLoading(false)
    }, 500)
  }

  const discount = product.discount || 0
  const hasDiscount = discount > 0
  const discountedPrice = hasDiscount ? product.price * (1 - discount / 100) : product.price
  const savingsAmount = product.price - discountedPrice

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          {product.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">Novo</Badge>}
          {hasDiscount && <Badge className="bg-red-500 hover:bg-red-600">-{discount}%</Badge>}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
          </div>
          <span className="text-sm text-muted-foreground">{product.reviewCount} avaliações</span>
        </div>
      </div>

      <div className="text-2xl font-bold">
        {hasDiscount && (
          <span className="text-lg line-through text-muted-foreground mr-2">R$ {product.price.toFixed(2)}</span>
        )}
        <span className={cn(hasDiscount && "text-red-600")}>R$ {discountedPrice.toFixed(2)}</span>

        {hasDiscount && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2">
                <Info className="h-4 w-4 mr-1" />
                Como funciona este desconto?
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Detalhes do Desconto</DialogTitle>
                <DialogDescription>Veja como calculamos o valor do seu desconto</DialogDescription>
              </DialogHeader>
              <DiscountExplainer originalPrice={product.price} discountPercentage={discount} />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {hasDiscount && (
        <div className="bg-red-50 border border-red-100 rounded-md p-3">
          <p className="text-red-600 font-medium flex items-center">
            Você economiza: R$ {savingsAmount.toFixed(2)} ({discount}% de desconto)
          </p>
          <p className="text-sm text-red-500 mt-1">Oferta por tempo limitado!</p>
        </div>
      )}

      <div className="text-muted-foreground">{product.description}</div>

      <div className="space-y-1">
        <div className="font-medium">Fragrância</div>
        <div className="text-sm text-muted-foreground">{product.fragrance}</div>
      </div>

      <div className="space-y-1">
        <div className="font-medium">Tamanho</div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              className="h-9 px-3"
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Diminuir quantidade</span>
          </Button>
          <div className="w-10 text-center">{quantity}</div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-none"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 10}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Aumentar quantidade</span>
          </Button>
        </div>

        <Button className="flex-1" onClick={handleAddToCart} disabled={isLoading}>
          <ShoppingBag className="h-4 w-4 mr-2" />
          {isLoading ? "Adicionando..." : "Adicionar ao Carrinho"}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleFavorite(product)}
          className={cn(isFav && "border-red-200 bg-red-50 hover:bg-red-100 hover:text-red-700")}
        >
          <Heart className={cn("h-4 w-4", isFav && "fill-red-500 text-red-500")} />
          <span className="sr-only">{isFav ? "Remover dos favoritos" : "Adicionar aos favoritos"}</span>
        </Button>
      </div>

      <div className="text-sm text-muted-foreground mt-2">
        <p>
          Disponibilidade: <span className="text-green-600">Em estoque</span>
        </p>
        <p>Código: {product.sku}</p>
      </div>
    </div>
  )
}

