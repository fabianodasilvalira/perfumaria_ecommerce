"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/types/product"
import { ProductReviews } from "./product-reviews"

interface ProductTabsProps {
  product: Product
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Descrição</TabsTrigger>
        <TabsTrigger value="details">Detalhes</TabsTrigger>
        <TabsTrigger value="reviews">Avaliações</TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="p-4 border rounded-md mt-2">
        <div className="space-y-4">
          <p>{product.fullDescription}</p>
        </div>
      </TabsContent>
      <TabsContent value="details" className="p-4 border rounded-md mt-2">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Informações do Produto</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Marca</span>
                  <span>{product.brand}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Gênero</span>
                  <span>{product.category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Volume</span>
                  <span>{product.sizes.join(", ")}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Tipo</span>
                  <span>{product.type}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Fragrância</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Notas de Topo</span>
                  <span>{product.notes?.top || "-"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Notas de Coração</span>
                  <span>{product.notes?.heart || "-"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Notas de Fundo</span>
                  <span>{product.notes?.base || "-"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
        <ProductReviews productId={product.id} />
      </TabsContent>
    </Tabs>
  )
}

