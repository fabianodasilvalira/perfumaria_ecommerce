export interface Product {
  id: string
  name: string
  description: string
  fullDescription: string
  price: number
  discount?: number // Percentual de desconto
  category: string
  brand: string
  type: string
  fragrance: string
  notes?: {
    top: string
    heart: string
    base: string
  }
  sizes: string[]
  images: string[]
  rating: number
  reviewCount: number
  isNew: boolean
  isFeatured: boolean
  sku: string
  quantity?: number
  size?: string
  tags?: string[]
  scentFamily?: string // Família olfativa principal
}

