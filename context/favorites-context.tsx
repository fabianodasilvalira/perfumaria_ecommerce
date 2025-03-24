"use client"

import type React from "react"

import type { Product } from "@/types/product"
import { createContext, useContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface FavoritesContextType {
  favorites: Product[]
  favoriteCount: number
  isFavorite: (id: string) => boolean
  toggleFavorite: (product: Product) => void
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  favoriteCount: 0,
  isFavorite: () => false,
  toggleFavorite: () => {},
  clearFavorites: () => {},
})

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [loaded, setLoaded] = useState(false)
  const { toast } = useToast()

  // Carregar favoritos do localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error)
      }
    }
    setLoaded(true)
  }, [])

  // Salvar favoritos no localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
  }, [favorites, loaded])

  const favoriteCount = favorites.length

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id)
  }

  const toggleFavorite = (product: Product) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((item) => item.id === product.id)

      if (isAlreadyFavorite) {
        toast({
          title: "Removido dos favoritos",
          description: `${product.name} foi removido dos seus favoritos`,
        })
        return prevFavorites.filter((item) => item.id !== product.id)
      } else {
        toast({
          title: "Adicionado aos favoritos",
          description: `${product.name} foi adicionado aos seus favoritos`,
        })
        return [...prevFavorites, product]
      }
    })
  }

  const clearFavorites = () => {
    setFavorites([])
    toast({
      title: "Favoritos limpos",
      description: "Todos os itens foram removidos dos seus favoritos",
    })
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteCount,
        isFavorite,
        toggleFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)

