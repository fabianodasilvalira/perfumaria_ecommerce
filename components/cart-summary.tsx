"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/context/cart-context"
import { useState } from "react"
import { ShoppingBag, CreditCard, Truck } from "lucide-react"

export function CartSummary() {
  const { items, subtotal } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const shipping = 0
  const discount = items.reduce((total, item) => {
    if (item.discount) {
      return total + ((item.price * item.discount) / 100) * item.quantity
    }
    return total
  }, 0)

  const total = subtotal - discount + shipping

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulação de checkout
    setTimeout(() => {
      setIsCheckingOut(false)
      alert("Checkout simulado! Em uma aplicação real, você seria redirecionado para o pagamento.")
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({items.length} itens)</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-red-600">
            <span>Desconto</span>
            <span>-R$ {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Frete</span>
          <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>

        <div className="bg-muted/50 p-3 rounded-lg mt-4">
          <div className="flex items-center gap-2 text-sm">
            <Truck className="h-4 w-4 text-green-600" />
            <span className="text-green-600 font-medium">Frete Grátis</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Para compras acima de R$ 150,00 em todo o Brasil</p>
        </div>

        <div className="bg-muted/50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4" />
            <span className="font-medium">Pagamento seguro</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Aceitamos cartões de crédito, débito, boleto e Pix</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isCheckingOut || items.length === 0}>
          {isCheckingOut ? (
            <>
              <ShoppingBag className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <ShoppingBag className="mr-2 h-4 w-4" />
              Finalizar Compra
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

