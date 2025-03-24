"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Loader2 } from "lucide-react"
import { getAllProducts } from "@/lib/product-service"
import type { Product } from "@/types/product"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const allProducts = getAllProducts()

  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Simula um pequeno delay para mostrar o loading
    const timer = setTimeout(() => {
      const filtered = allProducts.filter((product) => {
        const searchLower = searchTerm.toLowerCase()
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.fragrance.toLowerCase().includes(searchLower)
        )
      })

      setResults(filtered)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, allProducts])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.length >= 2) {
      router.push(`/produtos?search=${encodeURIComponent(searchTerm)}`)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar perfumes, marcas, fragrâncias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              autoFocus
            />
            {searchTerm && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSearchTerm("")}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/produtos/${product.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="relative h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{product.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
                    <p className="text-sm font-medium mt-1">R$ {product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : searchTerm.length >= 2 ? (
            <div className="text-center py-8 px-4">
              <p className="text-muted-foreground">Nenhum resultado encontrado para "{searchTerm}"</p>
              <Button
                variant="link"
                onClick={() => {
                  router.push(`/produtos?search=${encodeURIComponent(searchTerm)}`)
                  onOpenChange(false)
                }}
              >
                Ver todos os produtos
              </Button>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-sm text-muted-foreground">Digite pelo menos 2 caracteres para buscar</p>
              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Buscas populares</h3>
                <div className="flex flex-wrap gap-2">
                  {["Floral", "Amadeirado", "Masculino", "Feminino", "Chanel", "Dior", "Versace"].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        router.push(`/produtos?search=${encodeURIComponent(term)}`)
                        onOpenChange(false)
                      }}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

