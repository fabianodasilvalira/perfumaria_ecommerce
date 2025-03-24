import { ProductFilter } from "@/components/product-filter"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { getAllProducts } from "@/lib/product-service"
import { Suspense } from "react"
import { ProductsLoading } from "@/components/products-loading"

export default function ProductsPage() {
  const products = getAllProducts()

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Todos os Perfumes</h1>
          <p className="text-muted-foreground">
            Encontre o perfume perfeito para você ou para presentear alguém especial
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="md:w-1/4">
            <ProductFilter />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">Mostrando {products.length} produtos</p>
              <ProductSort />
            </div>

            <Suspense fallback={<ProductsLoading />}>
              <ProductGrid products={products} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

