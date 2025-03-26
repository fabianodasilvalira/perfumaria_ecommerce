import { ProductFilter } from "@/components/product-filter"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { getAllProducts } from "@/lib/product-service"
import { Suspense } from "react"
import { ProductsLoading } from "@/components/products-loading"

export const metadata = {
  title: "Perfumes Femininos | Boutique da Rai",
  description: "Explore nossa coleção exclusiva de perfumes femininos com fragrâncias delicadas e envolventes.",
}

export default function FemininosPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Obter todos os produtos femininos
  const allProducts = getAllProducts()
  let feminineProducts = allProducts.filter((product) => product.category === "Feminino")

  // Aplicar filtros adicionais

  // Filtro de marca
  const marcas =
    typeof searchParams.marca === "string"
      ? searchParams.marca.split(",")
      : Array.isArray(searchParams.marca)
        ? searchParams.marca
        : []

  if (marcas.length > 0) {
    feminineProducts = feminineProducts.filter((product) => marcas.includes(product.brand))
  }

  // Filtro de família olfativa
  const familias =
    typeof searchParams.familia === "string"
      ? searchParams.familia.split(",")
      : Array.isArray(searchParams.familia)
        ? searchParams.familia
        : []

  if (familias.length > 0) {
    feminineProducts = feminineProducts.filter(
      (product) => product.scentFamily && familias.includes(product.scentFamily),
    )
  }

  // Filtro de preço
  const precoMin = searchParams.precoMin ? Number(searchParams.precoMin) : 0
  const precoMax = searchParams.precoMax ? Number(searchParams.precoMax) : 500

  // Aplicar filtro de preço considerando o preço com desconto, se houver
  feminineProducts = feminineProducts.filter((product) => {
    const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

    return finalPrice >= precoMin && finalPrice <= precoMax
  })

  // Ordenação
  const ordenar = searchParams.ordenar as string | undefined

  if (ordenar) {
    switch (ordenar) {
      case "preco_asc":
        feminineProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
          return priceA - priceB
        })
        break
      case "preco_desc":
        feminineProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
          return priceB - priceA
        })
        break
      case "nome_asc":
        feminineProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "nome_desc":
        feminineProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "avaliacao":
        feminineProducts.sort((a, b) => b.rating - a.rating)
        break
      case "novidades":
        feminineProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Ordenação padrão: destaques
        feminineProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
  }

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Perfumes Femininos</h1>
          <p className="text-muted-foreground">Fragrâncias delicadas e envolventes para mulheres contemporâneas</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          <div className="md:w-1/4">
            <ProductFilter defaultCategory="Feminino" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">Mostrando {feminineProducts.length} produtos</p>
              <ProductSort />
            </div>

            <Suspense fallback={<ProductsLoading />}>
              <ProductGrid products={feminineProducts} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

