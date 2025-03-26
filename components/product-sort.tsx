"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSortProps {
  showDiscountOption?: boolean
}

export function ProductSort({ showDiscountOption = false }: ProductSortProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sortValue, setSortValue] = useState("destaque")
  const [isInitialized, setIsInitialized] = useState(false)

  // Inicializar com o valor da URL
  useEffect(() => {
    if (isInitialized) return

    const ordenar = searchParams.get("ordenar")
    if (ordenar) {
      setSortValue(ordenar)
    }

    setIsInitialized(true)
  }, [searchParams, isInitialized])

  // Função para atualizar a ordenação
  const handleSortChange = useCallback(
    (value: string) => {
      setSortValue(value)

      // Criar uma nova instância de URLSearchParams para não modificar a original
      const params = new URLSearchParams(searchParams.toString())

      if (value === "destaque") {
        params.delete("ordenar")
      } else {
        params.set("ordenar", value)
      }

      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
      <Select value={sortValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="destaque">Destaques</SelectItem>
          <SelectItem value="preco_asc">Menor Preço</SelectItem>
          <SelectItem value="preco_desc">Maior Preço</SelectItem>
          <SelectItem value="nome_asc">Nome (A-Z)</SelectItem>
          <SelectItem value="nome_desc">Nome (Z-A)</SelectItem>
          <SelectItem value="avaliacao">Melhor Avaliação</SelectItem>
          <SelectItem value="novidades">Novidades</SelectItem>
          {showDiscountOption && <SelectItem value="desconto">Maior Desconto</SelectItem>}
        </SelectContent>
      </Select>
    </div>
  )
}

