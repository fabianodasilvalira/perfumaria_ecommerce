import type { Product } from "./product"

export interface CartItemType extends Product {
  quantity: number
}

