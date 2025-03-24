"use client"

import { Button } from "@/components/ui/button"
import type { CartItemType } from "@/types/cart"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateItemQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateItemQuantity(item.id, newQuantity)
    }
  }

  const discount = item.discount || 0
  const hasDiscount = discount > 0
  const discountedPrice = hasDiscount ? item.price * (1 - discount / 100) : item.price
  const totalPrice = discountedPrice * item.quantity

  return (
    <div className="flex py-4 px-4">
      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0 relative">
        <Image src={item.images[0] || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>

      <div className="ml-4 flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div>
            <Link href={`/produtos/${item.id}`} className="font-medium hover:underline line-clamp-1">
              {item.name}
            </Link>
            <div className="text-sm text-muted-foreground mt-1">{item.size || item.sizes[0]}</div>
          </div>
          <div className="font-medium">
            {hasDiscount && (
              <span className="text-sm line-through text-muted-foreground mr-2">R$ {item.price.toFixed(2)}</span>
            )}
            <span className={cn(hasDiscount && "text-red-600")}>R$ {discountedPrice.toFixed(2)}</span>
            {item.quantity > 1 && (
              <span className="text-xs text-muted-foreground ml-1">(R$ {totalPrice.toFixed(2)})</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Diminuir quantidade</span>
            </Button>
            <div className="w-8 text-center text-sm">{item.quantity}</div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 10}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Aumentar quantidade</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remover item</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

