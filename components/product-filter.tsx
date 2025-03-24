"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

// Atualizar a interface para aceitar uma categoria padrão
interface ProductFilterProps {
  defaultCategory?: string
}

// Atualizar a assinatura da função para usar a prop
export function ProductFilter({ defaultCategory }: ProductFilterProps = {}) {
  const [priceRange, setPriceRange] = useState([0, 500])

  // Adicionar estado para as categorias selecionadas
  const [selectedCategories, setSelectedCategories] = useState<string[]>(defaultCategory ? [defaultCategory] : [])

  // Adicionar função para lidar com a mudança de categoria
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="space-y-4">
      <div className="font-medium">Filtros</div>

      <Accordion type="multiple" defaultValue={["category", "price", "brand"]} className="w-full">
        <AccordionItem value="category">
          <AccordionTrigger>Categoria</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="masculino"
                  checked={selectedCategories.includes("Masculino")}
                  onCheckedChange={() => handleCategoryChange("Masculino")}
                />
                <Label htmlFor="masculino">Masculino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="feminino"
                  checked={selectedCategories.includes("Feminino")}
                  onCheckedChange={() => handleCategoryChange("Feminino")}
                />
                <Label htmlFor="feminino">Feminino</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="unissex"
                  checked={selectedCategories.includes("Unissex")}
                  onCheckedChange={() => handleCategoryChange("Unissex")}
                />
                <Label htmlFor="unissex">Unissex</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="kits"
                  checked={selectedCategories.includes("Kits")}
                  onCheckedChange={() => handleCategoryChange("Kits")}
                />
                <Label htmlFor="kits">Kits</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Preço</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 500]} max={500} step={10} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <span className="text-sm">R$ {priceRange[0]}</span>
                <span className="text-sm">R$ {priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brand">
          <AccordionTrigger>Marca</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="brand1" />
                <Label htmlFor="brand1">Dior</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand2" />
                <Label htmlFor="brand2">Chanel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand3" />
                <Label htmlFor="brand3">Calvin Klein</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand4" />
                <Label htmlFor="brand4">Hugo Boss</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="brand5" />
                <Label htmlFor="brand5">Versace</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

