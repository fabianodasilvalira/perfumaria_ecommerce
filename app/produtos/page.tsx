import { Suspense } from "react"
import { ProductFilter } from "@/components/filters/product-filter"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/filters/product-sort"
import { getAllProducts } from "@/lib/product-service"
import { ProductsLoading } from "@/components/products-loading"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Filter } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Obter todos os produtos
  const allProducts = getAllProducts()

  // Aplicar filtros
  let filteredProducts = [...allProducts]

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

  // Aplicar filtro de preço considerando o preço com desconto, se houver
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
      case "novidades":
        filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      default:
        // Ordenação padrão: destaques
        filteredProducts.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
  }

  // Calcular filtros ativos
  const hasActiveFilters =
    categorias.length > 0 || marcas.length > 0 || familias.length > 0 || precoMin > 0 || precoMax < 500

  return (
    <div className="container px-4 md:px-6 py-6">
      <PageHeader
        title="Todos os Perfumes"
        description="Encontre o perfume perfeito para você ou para presentear alguém especial"
        backButton={false}
        actions={
          <Link href="/admin/produtos/cadastrar">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Cadastrar Perfume
            </Button>
          </Link>
        }
      />

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        <ProductFilter className="md:w-1/4" />

        <div className="flex-1">
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Mostrando <Badge variant="secondary">{filteredProducts.length}</Badge> produtos
                    {hasActiveFilters && " com filtros aplicados"}
                  </p>
                </div>
                <ProductSort />
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

