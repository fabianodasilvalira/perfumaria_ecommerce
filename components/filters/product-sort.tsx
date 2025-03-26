"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownAZ, ArrowUpAZ, ArrowDownWideNarrow, ArrowUpWideNarrow, Star, Sparkles, Percent } from "lucide-react"

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

  // Opções de ordenação com ícones
  const sortOptions = [
    { value: "destaque", label: "Destaques", icon: Sparkles },
    { value: "preco_asc", label: "Menor Preço", icon: ArrowDownWideNarrow },
    { value: "preco_desc", label: "Maior Preço", icon: ArrowUpWideNarrow },
    { value: "nome_asc", label: "Nome (A-Z)", icon: ArrowDownAZ },
    { value: "nome_desc", label: "Nome (Z-A)", icon: ArrowUpAZ },
    { value: "avaliacao", label: "Melhor Avaliação", icon: Star },
    { value: "novidades", label: "Novidades", icon: Sparkles },
  ]

  // Adicionar opção de desconto se necessário
  const allOptions = showDiscountOption
    ? [...sortOptions, { value: "desconto", label: "Maior Desconto", icon: Percent }]
    : sortOptions

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
      <Select value={sortValue} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          {allOptions.map((option) => (
            <SelectItem key={option.value} value={option.value} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <option.icon className="h-4 w-4" />
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

