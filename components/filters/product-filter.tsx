"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback, useMemo } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { getAllProducts } from "@/lib/product-service"
import { Badge } from "@/components/ui/badge"
import { FilterX, SlidersHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface ProductFilterProps {
  defaultCategory?: string
  className?: string
}

export function ProductFilter({ defaultCategory, className }: ProductFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Estado para os filtros
  const [priceRange, setPriceRange] = useState<number[]>([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedScentFamilies, setSelectedScentFamilies] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Obter marcas e famílias olfativas únicas dos produtos
  const allProducts = useMemo(() => getAllProducts(), [])

  const brands = useMemo(() => [...new Set(allProducts.map((product) => product.brand))].sort(), [allProducts])

  const scentFamilies = useMemo(
    () => [...new Set(allProducts.map((product) => product.scentFamily).filter(Boolean))].sort(),
    [allProducts],
  )

  // Inicializar filtros a partir dos parâmetros da URL
  useEffect(() => {
    if (isInitialized) return

    const params = new URLSearchParams(searchParams.toString())

    // Categorias
    const categoryParam = params.get("categoria")
    if (categoryParam) {
      const categories = categoryParam.split(",")
      setSelectedCategories(categories)
    } else if (defaultCategory) {
      setSelectedCategories([defaultCategory])
    }

    // Marcas
    const brandParam = params.get("marca")
    if (brandParam) {
      const brands = brandParam.split(",")
      setSelectedBrands(brands)
    }

    // Famílias olfativas
    const scentParam = params.get("familia")
    if (scentParam) {
      const scents = scentParam.split(",")
      setSelectedScentFamilies(scents)
    }

    // Preço
    const minPrice = params.get("precoMin")
    const maxPrice = params.get("precoMax")
    if (minPrice && maxPrice) {
      setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)])
    }

    setIsInitialized(true)
  }, [searchParams, defaultCategory, isInitialized])

  // Função para aplicar os filtros
  const applyFilters = useCallback(() => {
    // Criar uma nova instância de URLSearchParams para não modificar a original
    const currentParams = new URLSearchParams(searchParams.toString())

    // Atualizar os parâmetros de filtro

    // Categorias
    currentParams.delete("categoria")
    if (selectedCategories.length > 0) {
      currentParams.set("categoria", selectedCategories.join(","))
    }

    // Marcas
    currentParams.delete("marca")
    if (selectedBrands.length > 0) {
      currentParams.set("marca", selectedBrands.join(","))
    }

    // Famílias olfativas
    currentParams.delete("familia")
    if (selectedScentFamilies.length > 0) {
      currentParams.set("familia", selectedScentFamilies.join(","))
    }

    // Preço
    currentParams.set("precoMin", priceRange[0].toString())
    currentParams.set("precoMax", priceRange[1].toString())

    // Navegar para a URL com os filtros, mantendo o pathname atual
    router.push(`${pathname}?${currentParams.toString()}`)
    setIsMobileFilterOpen(false)
  }, [router, pathname, searchParams, selectedCategories, selectedBrands, selectedScentFamilies, priceRange])

  // Função para limpar todos os filtros
  const clearFilters = useCallback(() => {
    setSelectedCategories(defaultCategory ? [defaultCategory] : [])
    setSelectedBrands([])
    setSelectedScentFamilies([])
    setPriceRange([0, 500])

    // Manter apenas os parâmetros não relacionados aos filtros
    const currentParams = new URLSearchParams(searchParams.toString())

    // Remover todos os parâmetros de filtro
    currentParams.delete("categoria")
    currentParams.delete("marca")
    currentParams.delete("familia")
    currentParams.delete("precoMin")
    currentParams.delete("precoMax")

    // Adicionar categoria padrão se existir
    if (defaultCategory) {
      currentParams.set("categoria", defaultCategory)
    }

    router.push(`${pathname}?${currentParams.toString()}`)
  }, [router, pathname, searchParams, defaultCategory])

  // Funções para manipular mudanças nos filtros
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }, [])

  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }, [])

  const handleScentFamilyChange = useCallback((family: string) => {
    setSelectedScentFamilies((prev) => (prev.includes(family) ? prev.filter((f) => f !== family) : [...prev, family]))
  }, [])

  // Calcular o número total de filtros ativos
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCategories.length > 0) count++
    if (selectedBrands.length > 0) count++
    if (selectedScentFamilies.length > 0) count++
    if (priceRange[0] > 0 || priceRange[1] < 500) count++
    return count
  }, [selectedCategories, selectedBrands, selectedScentFamilies, priceRange])

  // Conteúdo do filtro
  const filterContent = (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Filtros</h3>
        {activeFiltersCount > 0 && (
          <Button variant="outline" size="sm" onClick={clearFilters} className="h-8 gap-1">
            <FilterX className="h-4 w-4" />
            Limpar
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "brand", "scent"]} className="w-full">
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
              <Slider min={0} max={500} step={10} value={priceRange} onValueChange={setPriceRange} />
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
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand}`}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => handleBrandChange(brand)}
                  />
                  <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="scent">
          <AccordionTrigger>Família Olfativa</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {scentFamilies.map((family) => (
                <div key={family} className="flex items-center space-x-2">
                  <Checkbox
                    id={`scent-${family}`}
                    checked={selectedScentFamilies.includes(family)}
                    onCheckedChange={() => handleScentFamilyChange(family)}
                  />
                  <Label htmlFor={`scent-${family}`} className="capitalize">
                    {family}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col gap-2 pt-4">
        <Button onClick={applyFilters} className="w-full">
          Aplicar Filtros
        </Button>
      </div>
    </>
  )

  // Versão mobile do filtro (em um Sheet)
  const mobileFilter = (
    <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden gap-1">
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="py-4">{filterContent}</div>
      </SheetContent>
    </Sheet>
  )

  // Versão desktop do filtro
  const desktopFilter = (
    <Card className={`hidden md:block ${className}`}>
      <CardContent className="p-4">{filterContent}</CardContent>
    </Card>
  )

  return (
    <>
      {mobileFilter}
      {desktopFilter}
    </>
  )
}

