import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Percent } from "lucide-react"
import { getAllProducts } from "@/lib/product-service"
import { ProductCard } from "./product-card"

export function PromotionsSection() {
  // Obtém produtos com desconto
  const allProducts = getAllProducts()
  const productsWithDiscount = allProducts
    .filter((product) => product.discount && product.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 4)

  return (
    <section className="container px-4 md:px-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <Percent className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Ofertas Especiais</h2>
          </div>
          <Button variant="link" asChild className="sm:ml-auto">
            <Link href="/promocoes">Ver todas as promoções</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {productsWithDiscount.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

