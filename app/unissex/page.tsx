import { ProductFilter } from "@/components/product-filter"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { getAllProducts } from "@/lib/product-service"
import { Suspense } from "react"
import { ProductsLoading } from "@/components/products-loading"

export const metadata = {
  title: "Perfumes Unissex | Boutique da Rai",
  description: "Descubra nossa coleção de perfumes unissex com fragrâncias versáteis para todos os estilos.",
}

export default function UnissexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Obter todos os produtos unissex
  const allProducts = getAllProducts()
  let unisexProducts = allProducts.filter((product) => product.category === "Unissex")

  // Aplicar filtros adicionais

  // Filtro de marca
  const marcas =
    typeof searchParams.marca === "string"
      ? searchParams.marca.split(",")
      : Array.isArray(searchParams.marca)
        ? searchParams.marca
        : []

  if (marcas.length > 0) {
    unisexProducts = unisexProducts.filter((product) => marcas.includes(product.brand))
  }

  // Filtro de família olfativa
  const familias =
    typeof searchParams.familia === "string"
      ? searchParams.familia.split(",")
      : Array.isArray(searchParams.familia)
        ? searchParams.familia
        : []

  if (familias.length > 0) {
    unisexProducts = unisexProducts.filter((product) => product.scentFamily && familias.includes(product.scentFamily))
  }

  // Filtro de preço
  const precoMin = searchParams.precoMin ? Number(searchParams.precoMin) : 0
  const precoMax = searchParams.precoMax ? Number(searchParams.precoMax) : 500

  // Aplicar filtro de preço considerando o preço com desconto, se houver
  unisexProducts = unisexProducts.filter((product) => {
    const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

    return finalPrice >= precoMin && finalPrice <= precoMax
  })

  // Ordenação
  const ordenar = searchParams.ordenar as string | undefined

  if (ordenar) {
    switch (ordenar) {
      case "preco_asc":
        unisexProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
          return priceA - priceB
        })
        break
      case "preco_desc":
        unisexProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
          return priceB - priceA
        })
        break
      case "nome_asc":
        unisexProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "nome_desc":
        unisexProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "avaliacao":
        unisexProducts.sort((a, b) => b.rating - a.rating)
        break
      case "novidades":
        unisexProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Ordenação padrão: destaques
        unisexProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
  }

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Perfumes Unissex</h1>
          <p className="text-muted-foreground">Fragrâncias versáteis e modernas para todos os estilos</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="md:w-1/4">
            <ProductFilter defaultCategory="Unissex" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">Mostrando {unisexProducts.length} produtos</p>
              <ProductSort />
            </div>

            <Suspense fallback={<ProductsLoading />}>
              <ProductGrid products={unisexProducts} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

