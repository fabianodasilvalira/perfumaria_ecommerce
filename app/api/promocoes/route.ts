import { NextResponse } from "next/server"
import { getPromotedProducts } from "@/lib/product-service"

export async function GET(request: Request) {
  try {
    // Obtém os parâmetros da URL
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("categoria")
    const minDiscount = searchParams.get("desconto_min")
    const maxPrice = searchParams.get("preco_max")

    // Obtém todos os produtos em promoção
    let promotedProducts = getPromotedProducts()

    // Aplica filtros se fornecidos
    if (category) {
      promotedProducts = promotedProducts.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase()),
      )
    }

    if (minDiscount) {
      const minDiscountValue = Number.parseInt(minDiscount)
      promotedProducts = promotedProducts.filter((product) => (product.discount || 0) >= minDiscountValue)
    }

    if (maxPrice) {
      const maxPriceValue = Number.parseFloat(maxPrice)
      promotedProducts = promotedProducts.filter((product) => {
        const discountedPrice = product.price * (1 - (product.discount || 0) / 100)
        return discountedPrice <= maxPriceValue
      })
    }

    return NextResponse.json({
      products: promotedProducts,
      count: promotedProducts.length,
    })
  } catch (error) {
    console.error("Erro ao buscar promoções:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

