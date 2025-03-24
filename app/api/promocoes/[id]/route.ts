import { NextResponse } from "next/server"
import { getProductById } from "@/lib/product-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const product = getProductById(id)

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    if (!product.discount || product.discount <= 0) {
      return NextResponse.json({ error: "Este produto não está em promoção" }, { status: 400 })
    }

    // Calcula o preço com desconto
    const discountedPrice = product.price * (1 - product.discount / 100)

    return NextResponse.json({
      ...product,
      discountedPrice,
      savingsAmount: product.price - discountedPrice,
      discountPercentage: product.discount,
    })
  } catch (error) {
    console.error("Erro ao buscar detalhes da promoção:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

