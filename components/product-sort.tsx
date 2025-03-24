"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react"
import { useState } from "react"

export function ProductSort() {
  const [sort, setSort] = useState("featured")

  const sortOptions = {
    featured: "Destaques",
    newest: "Mais recentes",
    priceAsc: "Preço: Menor para maior",
    priceDesc: "Preço: Maior para menor",
    nameAsc: "Nome: A-Z",
    nameDesc: "Nome: Z-A",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[220px] justify-between">
          {sortOptions[sort as keyof typeof sortOptions]}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        {Object.entries(sortOptions).map(([key, value]) => (
          <DropdownMenuItem key={key} onClick={() => setSort(key)} className={sort === key ? "bg-muted" : ""}>
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

