import { NextResponse } from "next/server"

// Dados simulados de cupons (mesmos do arquivo route.ts)
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

export async function GET(request: Request, { params }: { params: { code: string } }) {
  try {
    const code = params.code.toUpperCase()
    const coupon = coupons.find((c) => c.code === code)

    if (!coupon) {
      return NextResponse.json({ error: "Cupom não encontrado" }, { status: 404 })
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: "Este cupom não está mais ativo" }, { status: 400 })
    }

    // Verifica se o cupom está expirado
    const now = new Date()
    const expiryDate = new Date(coupon.expiryDate)

    if (now > expiryDate) {
      return NextResponse.json({ error: "Este cupom está expirado" }, { status: 400 })
    }

    return NextResponse.json(coupon)
  } catch (error) {
    console.error("Erro ao buscar detalhes do cupom:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { code: string } }) {
  try {
    const code = params.code.toUpperCase()
    const coupon = coupons.find((c) => c.code === code)

    if (!coupon) {
      return NextResponse.json({ error: "Cupom não encontrado" }, { status: 404 })
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: "Este cupom não está mais ativo" }, { status: 400 })
    }

    // Verifica se o cupom está expirado
    const now = new Date()
    const expiryDate = new Date(coupon.expiryDate)

    if (now > expiryDate) {
      return NextResponse.json({ error: "Este cupom está expirado" }, { status: 400 })
    }

    // Obtém os dados do carrinho do corpo da requisição
    const data = await request.json()
    const { cartTotal, items, userId } = data

    // Verifica restrições do cupom
    if (coupon.restrictions.includes("first_purchase_only")) {
      // Aqui você verificaria se é a primeira compra do usuário
      // Simulação: vamos supor que não é a primeira compra
      const isFirstPurchase = false

      if (!isFirstPurchase) {
        return NextResponse.json({ error: "Este cupom é válido apenas para a primeira compra" }, { status: 400 })
      }
    }

    if (coupon.restrictions.includes("min_items_2") && items.length < 2) {
      return NextResponse.json(
        { error: "Este cupom é válido apenas para compras com 2 ou mais itens" },
        { status: 400 },
      )
    }

    if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
      return NextResponse.json(
        {
          error: `Este cupom é válido apenas para compras acima de R$ ${coupon.minPurchase.toFixed(2)}`,
          minPurchase: coupon.minPurchase,
        },
        { status: 400 },
      )
    }

    // Calcula o desconto
    let discountAmount = 0

    if (coupon.discountType === "percentage") {
      discountAmount = cartTotal * (coupon.discountValue / 100)
    } else if (coupon.discountType === "fixed") {
      discountAmount = coupon.discountValue
    } else if (coupon.discountType === "shipping") {
      // Desconto no frete é tratado separadamente
      discountAmount = 0
    }

    // Limita o desconto ao valor total do carrinho
    discountAmount = Math.min(discountAmount, cartTotal)

    return NextResponse.json({
      couponCode: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      discountAmount: discountAmount,
      freeShipping: coupon.discountType === "shipping",
      newTotal: cartTotal - discountAmount,
    })
  } catch (error) {
    console.error("Erro ao aplicar cupom:", error)
    return NextResponse.json({ error: "Erro ao processar a solicitação" }, { status: 500 })
  }
}

