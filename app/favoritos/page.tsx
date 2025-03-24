"use client"

import { Button } from "@/components/ui/button"
import { useFavorites } from "@/context/favorites-context"
import { Heart } from "lucide-react"
import Link from "next/link"
import { ProductGrid } from "@/components/product-grid"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useFavorites()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isEmpty = favorites.length === 0

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Meus Favoritos</h1>
            {!isEmpty && (
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Limpar Favoritos
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Limpar todos os favoritos?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Todos os itens serão removidos da sua lista de favoritos.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        clearFavorites()
                        setIsDialogOpen(false)
                      }}
                    >
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <p className="text-muted-foreground">
            {isEmpty
              ? "Você ainda não adicionou nenhum perfume aos favoritos"
              : `${favorites.length} ${favorites.length === 1 ? "item" : "itens"} na sua lista de favoritos`}
          </p>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <div className="rounded-full bg-muted p-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Sua lista de favoritos está vazia</h2>
            <p className="text-muted-foreground text-center max-w-[500px]">
              Adicione perfumes à sua lista de favoritos para encontrá-los facilmente depois.
            </p>
            <Button asChild className="mt-4">
              <Link href="/produtos">Explorar Perfumes</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6">
            <ProductGrid products={favorites} />
          </div>
        )}
      </div>
    </div>
  )
}

