"use client"

import type React from "react"

import type { CartItemType } from "@/types/cart"
import type { Product } from "@/types/product"
import { createContext, useContext, useEffect, useState } from "react"

interface CartContextType {
  items: CartItemType[]
  itemCount: number
  subtotal: number
  isEmpty: boolean
  addItem: (product: Product & { quantity?: number }) => void
  updateItemQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  items: [],
  itemCount: 0,
  subtotal: 0,
  isEmpty: true,
  addItem: () => {},
  updateItemQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemType[]>([])
  const [loaded, setLoaded] = useState(false)

  // Carregar carrinho do localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart))
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error)
      }
    }
    setLoaded(true)
  }, [])

  // Salvar carrinho no localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, loaded])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const isEmpty = items.length === 0

  const addItem = (product: Product & { quantity?: number }) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id)

      if (existingItemIndex >= 0) {
        // Se o item já existe, atualize a quantidade
        const updatedItems = [...prevItems]
        const newQuantity = updatedItems[existingItemIndex].quantity + (product.quantity || 1)
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: Math.min(newQuantity, 10), // Limitar a 10 itens
        }
        return updatedItems
      } else {
        // Se o item não existe, adicione-o
        return [
          ...prevItems,
          {
            ...product,
            quantity: product.quantity || 1,
          },
        ]
      }
    })
  }

  const updateItemQuantity = (id: string, quantity: number) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        isEmpty,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

