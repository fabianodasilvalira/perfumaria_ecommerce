import { Suspense } from "react"
import { ProductFilter } from "@/components/filters/product-filter"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/filters/product-sort"
import { getAllProducts } from "@/lib/product-service"
import { ProductsLoading } from "@/components/products-loading"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, Percent } from "lucide-react"

export default function PromocoesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Obter todos os produtos
  const allProducts = getAllProducts()

  // Filtrar apenas produtos com desconto
  let filteredProducts = allProducts.filter((product) => product.discount && product.discount > 0)

  // Aplicar filtros adicionais
  // Filtro de categoria
  const categorias =
    typeof searchParams.categoria === "string"
      ? searchParams.categoria.split(",")
      : Array.isArray(searchParams.categoria)
        ? searchParams.categoria
        : []

  if (categorias.length > 0) {
    filteredProducts = filteredProducts.filter((product) => categorias.includes(product.category))
  }

  // Filtro de marca
  const marcas =
    typeof searchParams.marca === "string"
      ? searchParams.marca.split(",")
      : Array.isArray(searchParams.marca)
        ? searchParams.marca
        : []

  if (marcas.length > 0) {
    filteredProducts = filteredProducts.filter((product) => marcas.includes(product.brand))
  }

  // Filtro de família olfativa
  const familias =
    typeof searchParams.familia === "string"
      ? searchParams.familia.split(",")
      : Array.isArray(searchParams.familia)
        ? searchParams.familia
        : []

  if (familias.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => product.scentFamily && familias.includes(product.scentFamily),
    )
  }

  // Filtro de preço
  const precoMin = searchParams.precoMin ? Number(searchParams.precoMin) : 0
  const precoMax = searchParams.precoMax ? Number(searchParams.precoMax) : 500

  // Aplicar filtro de preço considerando o preço com desconto
  filteredProducts = filteredProducts.filter((product) => {
    // Calcular o preço final com desconto
    const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price

    // Verificar se o preço está dentro do intervalo
    return finalPrice >= precoMin && finalPrice <= precoMax
  })

  // Ordenação
  const ordenar = searchParams.ordenar as string | undefined

  if (ordenar) {
    switch (ordenar) {
      case "preco_asc":
        filteredProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
          return priceA - priceB
        })
        break
      case "preco_desc":
        filteredProducts.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
          return priceB - priceA
        })
        break
      case "nome_asc":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "nome_desc":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "avaliacao":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "desconto":
        filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0))
        break
      default:
        // Ordenação padrão: maior desconto
        filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0))
    }
  } else {
    // Ordenação padrão: maior desconto
    filteredProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0))
  }

  // Calcular filtros ativos
  const hasActiveFilters =
    categorias.length > 0 || marcas.length > 0 || familias.length > 0 || precoMin > 0 || precoMax < 500

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg p-6 md:p-8 mb-6">
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

      <div className="flex flex-col md:flex-row gap-6">
        <ProductFilter className="md:w-1/4" />

        <div className="flex-1">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Mostrando <Badge variant="secondary">{filteredProducts.length}</Badge> produtos em promoção
                    {hasActiveFilters && " com filtros aplicados"}
                  </p>
                </div>
                <ProductSort showDiscountOption={true} />
              </div>
            </CardContent>
          </Card>

          <Suspense fallback={<ProductsLoading />}>
            <ProductGrid products={filteredProducts} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

