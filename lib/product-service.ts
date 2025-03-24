import type { Product } from "@/types/product"

// Dados simulados de produtos
const products: Product[] = [
  {
    id: "1",
    name: "Essence Noir",
    description: "Perfume masculino com notas amadeiradas e especiarias",
    fullDescription:
      "Essence Noir é um perfume masculino sofisticado que combina notas amadeiradas profundas com especiarias exóticas. Ideal para ocasiões noturnas e eventos formais, este perfume oferece uma presença marcante e duradoura. A combinação de sândalo, patchouli e cardamomo cria uma fragrância única que reflete confiança e elegância.",
    price: 199.9,
    discount: 15, // 15% de desconto
    category: "Masculino",
    brand: "Essence",
    type: "Eau de Parfum",
    fragrance: "Amadeirado Especiado",
    notes: {
      top: "Bergamota, Cardamomo",
      heart: "Lavanda, Gerânio",
      base: "Sândalo, Patchouli, Âmbar",
    },
    sizes: ["50ml", "100ml", "150ml"],
    images: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=400&auto=format&fit=crop",
    ],
    rating: 4.5,
    reviewCount: 128,
    isNew: false,
    isFeatured: true,
    sku: "EN-001",
    tags: ["woody", "night", "strong", "masculine", "winter"],
    scentFamily: "amadeirado",
  },
  {
    id: "2",
    name: "Fleur Élégante",
    description: "Perfume feminino floral com toques de frutas vermelhas",
    fullDescription:
      "Fleur Élégante é uma fragrância feminina delicada que combina notas florais com toques sutis de frutas vermelhas. Este perfume evoca a sensação de um jardim em plena primavera, trazendo frescor e elegância para o dia a dia. Perfeito para uso diurno, oferece uma presença suave mas memorável.",
    price: 179.9,
    category: "Feminino",
    brand: "Essence",
    type: "Eau de Toilette",
    fragrance: "Floral Frutal",
    notes: {
      top: "Framboesa, Pêra",
      heart: "Rosa, Jasmim, Peônia",
      base: "Almíscar, Baunilha",
    },
    sizes: ["30ml", "50ml", "100ml"],
    images: [
      "https://images.unsplash.com/photo-1588405748880-b434362febd6?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403407-9caf930b2c6d?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608528577891-eb055944f2e7?q=80&w=400&auto=format&fit=crop",
    ],
    rating: 4.8,
    reviewCount: 156,
    isNew: false,
    isFeatured: true,
    sku: "FE-002",
    tags: ["floral", "daily", "moderate", "feminine", "spring"],
    scentFamily: "floral",
  },
  {
    id: "3",
    name: "Aqua Vitalis",
    description: "Perfume masculino fresco e cítrico para o dia a dia",
    fullDescription:
      "Aqua Vitalis é uma fragrância masculina refrescante que combina notas cítricas vibrantes com um fundo aquático. Ideal para uso diário e climas quentes, este perfume transmite uma sensação de limpeza e vitalidade. Sua composição leve e energizante é perfeita para homens dinâmicos e modernos.",
    price: 149.9,
    discount: 20, // 20% de desconto
    category: "Masculino",
    brand: "Vitalis",
    type: "Eau de Toilette",
    fragrance: "Cítrico Aquático",
    notes: {
      top: "Limão, Bergamota, Toranja",
      heart: "Notas Aquáticas, Manjericão",
      base: "Cedro, Almíscar",
    },
    sizes: ["75ml", "125ml"],
    images: [
      "https://images.unsplash.com/photo-1595425964071-2c1ecb10b1f9?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605217613423-0aea4e1f8f6a?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605217774354-6578950c0f59?q=80&w=400&auto=format&fit=crop",
    ],
    rating: 4.2,
    reviewCount: 98,
    isNew: true,
    isFeatured: false,
    sku: "AV-003",
    tags: ["fruity", "daily", "light", "masculine", "summer"],
    scentFamily: "citrico",
  },
  {
    id: "4",
    name: "Rose Mystique",
    description: "Perfume feminino intenso com rosa e notas orientais",
    fullDescription:
      "Rose Mystique é uma fragrância feminina sofisticada que combina a intensidade da rosa com notas orientais exóticas. Este perfume cria uma aura de mistério e sensualidade, ideal para ocasiões especiais e noites românticas. Sua composição rica e duradoura deixa uma impressão memorável.",
    price: 229.9,
    discount: 30, // 30% de desconto
    category: "Feminino",
    brand: "Mystique",
    type: "Eau de Parfum",
    fragrance: "Floral Oriental",
    notes: {
      top: "Rosa Damascena, Açafrão",
      heart: "Incenso, Patchouli",
      base: "Âmbar, Baunilha, Oud",
    },
    sizes: ["50ml", "100ml"],
    images: [
      "https://images.unsplash.com/photo-1615104100945-249c3c0d55cb?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615104100884-b59acbb0b7b2?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615104100902-46e8b0d0d9f4?q=80&w=400&auto=format&fit=crop",
    ],
    rating: 4.7,
    reviewCount: 112,
    isNew: false,
    isFeatured: true,
    sku: "RM-004",
    tags: ["floral", "oriental", "special", "strong", "feminine", "winter"],
    scentFamily: "oriental",
  },
  {
    id: "5",
    name: "Urban Pulse",
    description: "Perfume unissex moderno com notas aromáticas e especiarias",
    fullDescription:
      "Urban Pulse é uma fragrância unissex contemporânea que captura a energia vibrante da vida urbana. Com uma mistura de notas aromáticas e especiarias, este perfume é versátil e adaptável, perfeito para pessoas dinâmicas que transitam entre diferentes ambientes ao longo do dia.",
    price: 189.9,
    category: "Unissex",
    brand: "Pulse",
    type: "Eau de Parfum",
    fragrance: "Aromático Especiado",
    notes: {
      top: "Pimenta Preta, Bergamota",
      heart: "Lavanda, Sálvia, Alecrim",
      base: "Couro, Vetiver, Cedro",
    },
    sizes: ["75ml", "100ml"],
    images: [
      "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619994402832-63c549c44c1a?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619994402485-723807a2e8fa?q=80&w=400&auto=format&fit=crop",
    ],
    rating: 4.4,
    reviewCount: 87,
    isNew: true,
    isFeatured: false,
    sku: "UP-005",
    tags: ["woody", "work", "moderate", "unisex", "autumn"],
    scentFamily: "aromatico",
  },
  {
    id: "6",
    name: "Oceanic Breeze",
    description: "Perfume masculino fresco com notas aquáticas e cítricas",
    fullDescription:
      "Oceanic Breeze é uma fragrância masculina que evoca a frescura do oceano e a brisa marítima. Com notas aquáticas vibrantes e toques cítricos, este perfume é ideal para uso diário, especialmente em climas quentes. Sua composição leve e refrescante proporciona uma sensação de limpeza e vitalidade.",
    price: 159.9,
    discount: 25, // 25% de desconto
    category: "Masculino",
    brand: "Oceanic",
    type: "Eau de Toilette",
    fragrance: "Aquático Cítrico",
    notes: {
      top: "Limão, Mandarina",
      heart: "Notas Marinhas, Algas",
      base: "Âmbar, Madeira de Teca",
    },
    sizes: ["50ml", "100ml", "150ml"],
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910242-9638aaef42bf?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop",
    ],
    rating: 4.3,
    reviewCount: 76,
    isNew: false,
    isFeatured: true,
    sku: "OB-006",
    tags: ["fruity", "daily", "light", "masculine", "summer"],
    scentFamily: "aquatico",
  },
  {
    id: "7",
    name: "Velvet Orchid",
    description: "Perfume feminino luxuoso com orquídea e notas amadeiradas",
    fullDescription:
      "Velvet Orchid é uma fragrância feminina luxuosa que celebra a elegância da orquídea combinada com notas amadeiradas ricas. Este perfume sofisticado é perfeito para ocasiões especiais e noites elegantes, oferecendo uma presença marcante e duradoura que não passa despercebida.",
    price: 249.9,
    category: "Feminino",
    brand: "Velvet",
    type: "Eau de Parfum",
    fragrance: "Floral Amadeirado",
    notes: {
      top: "Tangerina, Mel",
      heart: "Orquídea, Jasmim, Íris",
      base: "Sândalo, Baunilha, Almíscar",
    },
    sizes: ["30ml", "50ml", "100ml"],
    images: [
      "https://images.unsplash.com/photo-1592945403407-9caf930b2c6d?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403486-a0f38c51e80e?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403446-0f9e72e85d0a?q=80&w=400&auto=format&fit=crop",
    ],
    rating: 4.9,
    reviewCount: 143,
    isNew: true,
    isFeatured: true,
    sku: "VO-007",
    tags: ["floral", "woody", "special", "strong", "feminine", "autumn"],
    scentFamily: "floral",
  },
  {
    id: "8",
    name: "Amber Oud",
    description: "Perfume unissex intenso com âmbar, oud e especiarias",
    fullDescription:
      "Amber Oud é uma fragrância unissex intensa e sofisticada que combina a riqueza do âmbar com a profundidade do oud e especiarias exóticas. Este perfume de caráter marcante é ideal para pessoas que apreciam fragrâncias orientais ricas e duradouras, perfeito para ocasiões especiais e noites de inverno.",
    price: 279.9,
    discount: 10, // 10% de desconto
    category: "Unissex",
    brand: "Amber",
    type: "Extrait de Parfum",
    fragrance: "Oriental Amadeirado",
    notes: {
      top: "Açafrão, Cardamomo",
      heart: "Rosa, Oud, Patchouli",
      base: "Âmbar, Almíscar, Baunilha",
    },
    sizes: ["50ml", "100ml"],
    images: [
      "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887538-5d0f86395311?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887538-f2a2f4a30d04?q=80&w=400&auto=format&fit=crop",
    ],
    rating: 4.6,
    reviewCount: 92,
    isNew: false,
    isFeatured: true,
    sku: "AO-008",
    tags: ["oriental", "woody", "special", "very-strong", "unisex", "winter"],
    scentFamily: "oriental",
  },
]

// Funções de serviço para acessar os dados
export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured)
}

export function getNewArrivals(): Product[] {
  return products.filter((product) => product.isNew)
}

export function getRelatedProducts(id: string): Product[] {
  const currentProduct = getProductById(id)
  if (!currentProduct) return []

  return products
    .filter(
      (product) =>
        product.id !== id && (product.category === currentProduct.category || product.brand === currentProduct.brand),
    )
    .slice(0, 4)
}

export function getPromotedProducts(): Product[] {
  return products
    .filter((product) => product.discount && product.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
}

export function getRecommendedProducts(answers: Record<string, string>): Product[] {
  // Se não houver respostas, retorne produtos em destaque
  if (!answers || Object.keys(answers).length === 0) {
    return getFeaturedProducts()
  }

  // Sistema de pontuação para cada produto
  const scoredProducts = products.map((product) => {
    let score = 0

    // Pontuação baseada na ocasião
    if (answers.occasion) {
      if (product.tags?.includes(answers.occasion)) {
        score += 3
      }
    }

    // Pontuação baseada na intensidade
    if (answers.intensity) {
      if (product.tags?.includes(answers.intensity)) {
        score += 3
      }
    }

    // Pontuação baseada nas notas
    if (answers.notes) {
      if (product.tags?.includes(answers.notes)) {
        score += 4
      }
    }

    // Pontuação baseada na estação
    if (answers.season) {
      if (product.tags?.includes(answers.season)) {
        score += 2
      }
    }

    // Pontuação baseada no gênero
    if (answers.gender) {
      if (answers.gender === "no-preference") {
        // Sem preferência, não afeta a pontuação
      } else if (answers.gender === "unisex" && product.category === "Unissex") {
        score += 5
      } else if (answers.gender === "masculine" && product.category === "Masculino") {
        score += 5
      } else if (answers.gender === "feminine" && product.category === "Feminino") {
        score += 5
      }
    }

    return { product, score }
  })

  // Ordenar produtos por pontuação e retornar os 4 melhores
  return scoredProducts
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((item) => item.product)
}

// Adicionar funções para obter produtos por categoria
export function getMasculineProducts(): Product[] {
  return products.filter((product) => product.category === "Masculino")
}

export function getFeminineProducts(): Product[] {
  return products.filter((product) => product.category === "Feminino")
}

export function getUnisexProducts(): Product[] {
  return products.filter((product) => product.category === "Unissex")
}

