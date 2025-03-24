"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Percent, Copy, Check, Clock } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

// Componente do cupom
function DiscountCoupon({
  code,
  discount,
  minPurchase,
  expiryDate,
  description,
}: {
  code: string
  discount: string
  minPurchase?: number
  expiryDate: string
  description: string
}) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    toast({
      title: "Código copiado!",
      description: "O código do cupom foi copiado para a área de transferência.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/10 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{discount} OFF</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Expira em: {expiryDate}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Código do cupom:</p>
            <p className="font-mono font-bold text-lg">{code}</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar
              </>
            )}
          </Button>
        </div>
        {minPurchase && (
          <p className="text-xs text-muted-foreground mt-2">
            *Válido para compras acima de R$ {minPurchase.toFixed(2)}
          </p>
        )}
      </CardContent>
      <CardFooter className="bg-muted/50 flex justify-center">
        <Button asChild>
          <Link href="/produtos">Usar agora</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function CouponsPage() {
  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="bg-primary/10 p-4 rounded-full">
              <Percent className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Cupons de Desconto</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Economize em suas compras com nossos cupons exclusivos. Copie o código e use no checkout.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todos os Cupons</TabsTrigger>
            <TabsTrigger value="new-customers">Novos Clientes</TabsTrigger>
            <TabsTrigger value="special">Ofertas Especiais</TabsTrigger>
            <TabsTrigger value="seasonal">Sazonais</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DiscountCoupon
                code="BEMVINDO15"
                discount="15%"
                description="Desconto para primeira compra"
                expiryDate="30/06/2025"
              />
              <DiscountCoupon
                code="FRETE0"
                discount="Frete Grátis"
                minPurchase={150}
                description="Frete grátis para todo o Brasil"
                expiryDate="31/12/2025"
              />
              <DiscountCoupon
                code="VERAO25"
                discount="25%"
                minPurchase={200}
                description="Desconto em perfumes frescos"
                expiryDate="28/02/2025"
              />
              <DiscountCoupon
                code="ANIVERSARIO30"
                discount="30%"
                description="Desconto especial de aniversário"
                expiryDate="15/07/2025"
              />
              <DiscountCoupon
                code="COMBO20"
                discount="20%"
                description="Desconto para compra de 2 ou mais itens"
                expiryDate="31/12/2025"
              />
              <DiscountCoupon
                code="PRESENTE10"
                discount="10%"
                description="Desconto em kits para presente"
                expiryDate="31/12/2025"
              />
            </div>
          </TabsContent>

          <TabsContent value="new-customers">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DiscountCoupon
                code="BEMVINDO15"
                discount="15%"
                description="Desconto para primeira compra"
                expiryDate="30/06/2025"
              />
              <DiscountCoupon
                code="NOVOCLIENTE20"
                discount="20%"
                minPurchase={250}
                description="Desconto para novos clientes em compras acima de R$ 250"
                expiryDate="31/12/2025"
              />
            </div>
          </TabsContent>

          <TabsContent value="special">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DiscountCoupon
                code="ANIVERSARIO30"
                discount="30%"
                description="Desconto especial de aniversário"
                expiryDate="15/07/2025"
              />
              <DiscountCoupon
                code="COMBO20"
                discount="20%"
                description="Desconto para compra de 2 ou mais itens"
                expiryDate="31/12/2025"
              />
            </div>
          </TabsContent>

          <TabsContent value="seasonal">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DiscountCoupon
                code="VERAO25"
                discount="25%"
                minPurchase={200}
                description="Desconto em perfumes frescos"
                expiryDate="28/02/2025"
              />
              <DiscountCoupon
                code="INVERNO20"
                discount="20%"
                description="Desconto em fragrâncias amadeiradas"
                expiryDate="31/08/2025"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted/50 rounded-lg p-6 mt-4">
          <h2 className="text-xl font-bold mb-4">Como usar os cupons</h2>
          <ol className="space-y-2 list-decimal list-inside">
            <li>Escolha o cupom desejado e clique em "Copiar"</li>
            <li>Adicione os produtos ao carrinho</li>
            <li>No checkout, cole o código do cupom no campo indicado</li>
            <li>O desconto será aplicado automaticamente ao seu pedido</li>
          </ol>
          <p className="text-sm text-muted-foreground mt-4">
            Observação: Os cupons não são cumulativos e possuem data de validade.
          </p>
        </div>
      </div>
    </div>
  )
}

