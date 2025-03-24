import { ProductFilter } from "@/components/product-filter"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { getAllProducts } from "@/lib/product-service"
import { Suspense } from "react"
import { ProductsLoading } from "@/components/products-loading"

export const metadata = {
  title: "Perfumes Masculinos | Boutique da Rai",
  description: "Descubra nossa coleção exclusiva de perfumes masculinos com fragrâncias marcantes e sofisticadas.",
}

export default function MasculinosPage() {
  const allProducts = getAllProducts()
  const masculineProducts = allProducts.filter((product) => product.category === "Masculino")

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Perfumes Masculinos</h1>
          <p className="text-muted-foreground">Fragrâncias marcantes e sofisticadas para homens modernos</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="md:w-1/4">
            <ProductFilter defaultCategory="Masculino" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">Mostrando {masculineProducts.length} produtos</p>
              <ProductSort />
            </div>

            <Suspense fallback={<ProductsLoading />}>
              <ProductGrid products={masculineProducts} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

