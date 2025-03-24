import { NextResponse } from "next/server"

// Dados simulados de cupons
const coupons = [
  {
    id: "1",
    code: "BEMVINDO15",
    discount: "15%",
    discountType: "percentage",
    discountValue: 15,
    minPurchase: null,
    description: "Desconto para primeira compra",
    expiryDate: "2025-06-30",
    isActive: true,
    restrictions: ["first_purchase_only"],
    applicableCategories: ["all"],
  },
  {
    id: "2",
    code: "FRETE0",
    discount: "Frete Grátis",
    discountType: "shipping",
    discountValue: 100,
    minPurchase: 150,
    description: "Frete grátis para todo o Brasil",
    expiryDate: "2025-12-31",
    isActive: true,
    restrictions: [],
    applicableCategories: ["all"],
  },
  {
    id: "3",
    code: "VERAO25",
    discount: "25%",
    discountType: "percentage",
    discountValue: 25,
    minPurchase: 200,
    description: "Desconto em perfumes frescos",
    expiryDate: "2025-02-28",
    isActive: true,
    restrictions: [],
    applicableCategories: ["citrico", "aquatico"],
  },
  {
    id: "4",
    code: "ANIVERSARIO30",
    discount: "30%",
    discountType: "percentage",
    discountValue: 30,
    minPurchase: null,
    description: "Desconto especial de aniversário",
    expiryDate: "2025-07-15",
    isActive: true,
    restrictions: ["once_per_user"],
    applicableCategories: ["all"],
  },
  {
    id: "5",
    code: "COMBO20",
    discount: "20%",
    discountType: "percentage",
    discountValue: 20,
    minPurchase: null,
    description: "Desconto para compra de 2 ou mais itens",
    expiryDate: "2025-12-31",
    isActive: true,
    restrictions: ["min_items_2"],
    applicableCategories: ["all"],
  },
]

export async function GET(request: Request) {
  try {
    // Obtém os parâmetros da URL
    const { searchParams } = new URL(request.url)
    const active = searchParams.get("active")
    const category = searchParams.get("category")

    // Filtra os cupons
    let filteredCoupons = [...coupons]

    if (active === "true") {
      filteredCoupons = filteredCoupons.filter((coupon) => coupon.isActive)
    }

    if (category) {
      filteredCoupons = filteredCoupons.filter(
        (coupon) => coupon.applicableCategories.includes("all") || coupon.applicableCategories.includes(category),
      )
    }

    return NextResponse.json({
      coupons: filteredCoupons,
      count: filteredCoupons.length,
    })
  } catch (error) {
    console.error("Erro ao buscar cupons:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

