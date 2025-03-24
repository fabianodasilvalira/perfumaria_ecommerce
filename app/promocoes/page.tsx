import { ProductGrid } from "@/components/product-grid"
import { getAllProducts } from "@/lib/product-service"
import { Suspense } from "react"
import { ProductsLoading } from "@/components/products-loading"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Percent, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export const metadata = {
  title: "Promoções | Essence - Loja de Perfumes",
  description: "Aproveite as melhores ofertas em perfumes com descontos exclusivos",
}

export default function PromotionsPage() {
  // Filtra produtos com desconto
  const allProducts = getAllProducts()
  const productsWithDiscount = allProducts.filter((product) => product.discount && product.discount > 0)

  // Organiza por categorias
  const masculineProducts = productsWithDiscount.filter((p) => p.category.toLowerCase().includes("masculino"))
  const feminineProducts = productsWithDiscount.filter((p) => p.category.toLowerCase().includes("feminino"))
  const unisexProducts = productsWithDiscount.filter((p) => p.category.toLowerCase().includes("unissex"))

  // Organiza por faixa de desconto
  const bigDiscounts = productsWithDiscount.filter((p) => p.discount && p.discount >= 30)

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-6">
        <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="bg-primary/10 p-4 rounded-full">
              <Percent className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Promoções Especiais</h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Aproveite descontos exclusivos em perfumes selecionados. Ofertas por tempo limitado!
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="overflow-x-auto py-1 px-1 w-auto max-w-[calc(100vw-120px)]">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="big-discounts">Maiores Descontos</TabsTrigger>
                <TabsTrigger value="masculine">Masculinos</TabsTrigger>
                <TabsTrigger value="feminine">Femininos</TabsTrigger>
                <TabsTrigger value="unisex">Unissex</TabsTrigger>
              </TabsList>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filtros</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtrar Promoções</SheetTitle>
                    <SheetDescription>Refine sua busca por produtos em promoção</SheetDescription>
                  </SheetHeader>

                  <div className="space-y-6 mt-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Desconto</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="discount-10" />
                          <Label htmlFor="discount-10">10% ou mais</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="discount-20" />
                          <Label htmlFor="discount-20">20% ou mais</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="discount-30" />
                          <Label htmlFor="discount-30">30% ou mais</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="discount-40" />
                          <Label htmlFor="discount-40">40% ou mais</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Faixa de Preço</h4>
                      <Slider defaultValue={[0, 300]} max={500} step={10} />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>R$ 0</span>
                        <span>R$ 500</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-3">Marcas</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="brand-essence" />
                          <Label htmlFor="brand-essence">Essence</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="brand-vitalis" />
                          <Label htmlFor="brand-vitalis">Vitalis</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="brand-mystique" />
                          <Label htmlFor="brand-mystique">Mystique</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="brand-amber" />
                          <Label htmlFor="brand-amber">Amber</Label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      <Button variant="outline">Limpar</Button>
                      <Button>Aplicar Filtros</Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <TabsContent value="all">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Todos os Produtos em Promoção</h2>
                <p className="text-sm text-muted-foreground">
                  {productsWithDiscount.length} {productsWithDiscount.length === 1 ? "produto" : "produtos"}
                </p>
              </div>
              <Suspense fallback={<ProductsLoading />}>
                <ProductGrid products={productsWithDiscount} />
              </Suspense>
            </TabsContent>

            <TabsContent value="big-discounts">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Maiores Descontos</h2>
                <p className="text-sm text-muted-foreground">
                  {bigDiscounts.length} {bigDiscounts.length === 1 ? "produto" : "produtos"}
                </p>
              </div>
              <Suspense fallback={<ProductsLoading />}>
                <ProductGrid products={bigDiscounts} />
              </Suspense>
            </TabsContent>

            <TabsContent value="masculine">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Perfumes Masculinos em Promoção</h2>
                <p className="text-sm text-muted-foreground">
                  {masculineProducts.length} {masculineProducts.length === 1 ? "produto" : "produtos"}
                </p>
              </div>
              <Suspense fallback={<ProductsLoading />}>
                <ProductGrid products={masculineProducts} />
              </Suspense>
            </TabsContent>

            <TabsContent value="feminine">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Perfumes Femininos em Promoção</h2>
                <p className="text-sm text-muted-foreground">
                  {feminineProducts.length} {feminineProducts.length === 1 ? "produto" : "produtos"}
                </p>
              </div>
              <Suspense fallback={<ProductsLoading />}>
                <ProductGrid products={feminineProducts} />
              </Suspense>
            </TabsContent>

            <TabsContent value="unisex">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Perfumes Unissex em Promoção</h2>
                <p className="text-sm text-muted-foreground">
                  {unisexProducts.length} {unisexProducts.length === 1 ? "produto" : "produtos"}
                </p>
              </div>
              <Suspense fallback={<ProductsLoading />}>
                <ProductGrid products={unisexProducts} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

