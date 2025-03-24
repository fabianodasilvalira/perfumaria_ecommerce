import { getProductById, getRelatedProducts } from "@/lib/product-service"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductTabs } from "@/components/product-tabs"
import { ProductGrid } from "@/components/product-grid"
import { notFound } from "next/navigation"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(params.id)

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-8">
        <div className="grid md:grid-cols-2 gap-6">
          <ProductGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight mb-4">Você também pode gostar</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      </div>
    </div>
  )
}

