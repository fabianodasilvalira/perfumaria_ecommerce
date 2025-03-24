"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getAllProducts } from "@/lib/product-service"
import type { Product } from "@/types/product"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, ZoomIn, ZoomOut, RefreshCw, Filter, X, ChevronRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface ScentFamily {
  id: string
  name: string
  description: string
  color: string
  position: { x: number; y: number }
  radius: number
  notes: string[]
  relatedFamilies: string[]
  intensity: number
  gender: "masculine" | "feminine" | "unisex"
  seasonality: ("spring" | "summer" | "autumn" | "winter")[]
  occasions: string[]
}

interface ScentNote {
  id: string
  name: string
  familyId: string
  description: string
}

export function ScentMap() {
  const [selectedFamily, setSelectedFamily] = useState<ScentFamily | null>(null)
  const [selectedNote, setSelectedNote] = useState<ScentNote | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [view, setView] = useState<"map" | "list" | "detail">("map")
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 })
  const [scale, setScale] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [filters, setFilters] = useState({
    gender: [] as string[],
    season: [] as string[],
    intensity: [1, 10],
    occasion: [] as string[],
  })
  const [showConnections, setShowConnections] = useState(true)
  const [hoveredFamily, setHoveredFamily] = useState<string | null>(null)
  const [showNotes, setShowNotes] = useState(false)

  const allProducts = getAllProducts()

  // Definição das famílias olfativas
  const scentFamilies: ScentFamily[] = [
    {
      id: "floral",
      name: "Floral",
      description: "Fragrâncias com notas de flores como rosa, jasmim, lírio e lavanda. Elegantes e femininas.",
      color: "bg-pink-500",
      position: { x: 50, y: 30 },
      radius: 18,
      notes: ["rosa", "jasmim", "peônia", "lavanda", "floral", "lírio", "violeta"],
      relatedFamilies: ["frutal", "oriental"],
      intensity: 6,
      gender: "feminine",
      seasonality: ["spring", "summer"],
      occasions: ["daily", "romantic", "formal"],
    },
    {
      id: "citrico",
      name: "Cítrico",
      description: "Fragrâncias frescas e energizantes com notas de limão, laranja, bergamota e toranja.",
      color: "bg-yellow-500",
      position: { x: 25, y: 20 },
      radius: 15,
      notes: ["limão", "bergamota", "toranja", "laranja", "cítrico", "mandarina", "lima"],
      relatedFamilies: ["frutal", "aquatico", "aromatico"],
      intensity: 4,
      gender: "unisex",
      seasonality: ["spring", "summer"],
      occasions: ["daily", "sport", "casual"],
    },
    {
      id: "amadeirado",
      name: "Amadeirado",
      description: "Fragrâncias quentes e sofisticadas com notas de sândalo, cedro, patchouli e vetiver.",
      color: "bg-amber-700",
      position: { x: 75, y: 60 },
      radius: 17,
      notes: ["sândalo", "cedro", "patchouli", "vetiver", "amadeirado", "madeira", "oud"],
      relatedFamilies: ["oriental", "fougere", "especiado"],
      intensity: 8,
      gender: "masculine",
      seasonality: ["autumn", "winter"],
      occasions: ["formal", "business", "evening"],
    },
    {
      id: "oriental",
      name: "Oriental",
      description: "Fragrâncias ricas e sensuais com notas de âmbar, baunilha, especiarias e resinas.",
      color: "bg-red-600",
      position: { x: 80, y: 25 },
      radius: 16,
      notes: ["âmbar", "baunilha", "especiarias", "incenso", "oriental", "mirra", "benjoim"],
      relatedFamilies: ["amadeirado", "especiado", "gourmand"],
      intensity: 9,
      gender: "unisex",
      seasonality: ["autumn", "winter"],
      occasions: ["evening", "special", "romantic"],
    },
    {
      id: "fougere",
      name: "Fougère",
      description: "Fragrâncias aromáticas com notas de lavanda, musgo de carvalho e cumarina. Clássicas masculinas.",
      color: "bg-emerald-600",
      position: { x: 35, y: 70 },
      radius: 14,
      notes: ["lavanda", "musgo", "fougère", "aromático", "alecrim", "sálvia", "cumarina"],
      relatedFamilies: ["aromatico", "amadeirado", "verde"],
      intensity: 7,
      gender: "masculine",
      seasonality: ["spring", "autumn"],
      occasions: ["business", "daily", "formal"],
    },
    {
      id: "aquatico",
      name: "Aquático",
      description: "Fragrâncias frescas e limpas com notas marinhas, aquáticas e ozônicas.",
      color: "bg-blue-500",
      position: { x: 15, y: 45 },
      radius: 13,
      notes: ["marinho", "aquático", "ozônico", "brisa", "água", "sal", "algas"],
      relatedFamilies: ["citrico", "verde", "aromatico"],
      intensity: 3,
      gender: "unisex",
      seasonality: ["summer"],
      occasions: ["sport", "casual", "beach"],
    },
    {
      id: "frutal",
      name: "Frutal",
      description: "Fragrâncias doces e vibrantes com notas de frutas como pêssego, maçã, pêra e frutas vermelhas.",
      color: "bg-purple-500",
      position: { x: 60, y: 15 },
      radius: 15,
      notes: ["frutas", "pêssego", "maçã", "pêra", "framboesa", "frutal", "morango", "manga"],
      relatedFamilies: ["floral", "citrico", "gourmand"],
      intensity: 5,
      gender: "feminine",
      seasonality: ["spring", "summer"],
      occasions: ["daily", "casual", "young"],
    },
    {
      id: "gourmand",
      name: "Gourmand",
      description: "Fragrâncias doces e comestíveis com notas de baunilha, chocolate, caramelo e pralinê.",
      color: "bg-orange-400",
      position: { x: 65, y: 80 },
      radius: 14,
      notes: ["baunilha", "chocolate", "caramelo", "pralinê", "gourmand", "doce", "mel", "café"],
      relatedFamilies: ["oriental", "frutal"],
      intensity: 8,
      gender: "unisex",
      seasonality: ["autumn", "winter"],
      occasions: ["evening", "romantic", "special"],
    },
    {
      id: "verde",
      name: "Verde",
      description: "Fragrâncias frescas e naturais com notas de folhas, grama cortada, ervas e vegetais.",
      color: "bg-green-500",
      position: { x: 20, y: 80 },
      radius: 12,
      notes: ["grama", "folhas", "verde", "ervas", "galbanum", "chá verde", "bambu"],
      relatedFamilies: ["aquatico", "aromatico", "fougere"],
      intensity: 4,
      gender: "unisex",
      seasonality: ["spring", "summer"],
      occasions: ["daily", "outdoor", "casual"],
    },
    {
      id: "especiado",
      name: "Especiado",
      description: "Fragrâncias quentes e picantes com notas de pimenta, cravo, canela e noz-moscada.",
      color: "bg-red-800",
      position: { x: 85, y: 45 },
      radius: 13,
      notes: ["pimenta", "cravo", "canela", "cardamomo", "especiarias", "noz-moscada", "gengibre"],
      relatedFamilies: ["oriental", "amadeirado"],
      intensity: 8,
      gender: "masculine",
      seasonality: ["autumn", "winter"],
      occasions: ["evening", "formal", "special"],
    },
    {
      id: "aromatico",
      name: "Aromático",
      description: "Fragrâncias herbáceas e frescas com notas de ervas aromáticas como alecrim, manjericão e tomilho.",
      color: "bg-teal-600",
      position: { x: 40, y: 40 },
      radius: 14,
      notes: ["alecrim", "manjericão", "tomilho", "sálvia", "aromático", "menta", "ervas"],
      relatedFamilies: ["fougere", "citrico", "verde"],
      intensity: 5,
      gender: "masculine",
      seasonality: ["spring", "summer"],
      occasions: ["daily", "business", "outdoor"],
    },
  ]

  // Definição das notas olfativas
  const scentNotes: ScentNote[] = [
    // Florais
    { id: "rosa", name: "Rosa", familyId: "floral", description: "Nota floral clássica, elegante e romântica" },
    { id: "jasmim", name: "Jasmim", familyId: "floral", description: "Floral intenso, exótico e sensual" },
    { id: "lirio", name: "Lírio", familyId: "floral", description: "Floral fresco, limpo e sofisticado" },
    { id: "violeta", name: "Violeta", familyId: "floral", description: "Floral doce, delicado e nostálgico" },

    // Cítricos
    { id: "bergamota", name: "Bergamota", familyId: "citrico", description: "Cítrico fresco com nuances florais" },
    { id: "limao", name: "Limão", familyId: "citrico", description: "Cítrico vibrante, energizante e refrescante" },
    { id: "laranja", name: "Laranja", familyId: "citrico", description: "Cítrico doce, alegre e ensolarado" },

    // Amadeirados
    { id: "sandalo", name: "Sândalo", familyId: "amadeirado", description: "Madeira cremosa, quente e leitosa" },
    { id: "cedro", name: "Cedro", familyId: "amadeirado", description: "Madeira seca, robusta e masculina" },
    { id: "oud", name: "Oud", familyId: "amadeirado", description: "Madeira exótica, intensa e preciosa" },

    // Orientais
    { id: "ambar", name: "Âmbar", familyId: "oriental", description: "Nota quente, balsâmica e sensual" },
    { id: "baunilha", name: "Baunilha", familyId: "oriental", description: "Doce, cremosa e reconfortante" },
    { id: "incenso", name: "Incenso", familyId: "oriental", description: "Resinoso, místico e profundo" },

    // Gourmand
    { id: "chocolate", name: "Chocolate", familyId: "gourmand", description: "Doce, rico e viciante" },
    { id: "caramelo", name: "Caramelo", familyId: "gourmand", description: "Doce, quente e aconchegante" },

    // Aquáticos
    { id: "marinho", name: "Marinho", familyId: "aquatico", description: "Fresco, limpo e reminiscente do oceano" },

    // Especiados
    { id: "canela", name: "Canela", familyId: "especiado", description: "Quente, picante e aconchegante" },
    { id: "pimenta", name: "Pimenta", familyId: "especiado", description: "Picante, vibrante e estimulante" },
  ]

  // Atualiza as dimensões do mapa quando a janela é redimensionada
  useEffect(() => {
    const updateDimensions = () => {
      if (mapRef.current) {
        const { width, height } = mapRef.current.getBoundingClientRect()
        setMapDimensions({ width, height })

        // Ajusta a escala para telas menores
        if (width < 640) {
          setScale(0.8)
        } else {
          setScale(1)
        }
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Filtra produtos quando uma família olfativa é selecionada
  useEffect(() => {
    if (selectedFamily) {
      let filteredProducts = allProducts.filter((product) => {
        // Verifica se alguma das notas da família está presente na descrição, nome ou notas do produto
        return selectedFamily.notes.some((note) => {
          const fullText =
            `${product.name} ${product.description} ${product.fullDescription} ${product.fragrance} ${product.notes?.top || ""} ${product.notes?.heart || ""} ${product.notes?.base || ""}`.toLowerCase()
          return fullText.includes(note.toLowerCase())
        })
      })

      // Aplica filtros adicionais
      if (filters.gender.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          const category = product.category.toLowerCase()
          return filters.gender.some((gender) => {
            if (gender === "masculine") return category.includes("masculino")
            if (gender === "feminine") return category.includes("feminino")
            if (gender === "unisex") return category.includes("unissex")
            return false
          })
        })
      }

      if (filters.season.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          if (!product.tags) return false
          return filters.season.some((season) => product.tags?.includes(season))
        })
      }

      if (filters.occasion.length > 0) {
        filteredProducts = filteredProducts.filter((product) => {
          if (!product.tags) return false
          return filters.occasion.some((occasion) => product.tags?.includes(occasion))
        })
      }

      setProducts(filteredProducts)
    } else if (selectedNote) {
      const filteredProducts = allProducts.filter((product) => {
        const fullText =
          `${product.name} ${product.description} ${product.fullDescription} ${product.fragrance} ${product.notes?.top || ""} ${product.notes?.heart || ""} ${product.notes?.base || ""}`.toLowerCase()
        return fullText.includes(selectedNote.id.toLowerCase())
      })
      setProducts(filteredProducts)
    } else {
      setProducts([])
    }
  }, [selectedFamily, selectedNote, allProducts, filters])

  const handleFamilyClick = (family: ScentFamily) => {
    setSelectedFamily(family)
    setSelectedNote(null)
    setView("list")
  }

  const handleNoteClick = (note: ScentNote) => {
    setSelectedNote(note)
    setSelectedFamily(null)
    setView("list")
  }

  const handleZoomIn = () => {
    if (zoom < 2) setZoom((prev) => prev + 0.1)
  }

  const handleZoomOut = () => {
    if (zoom > 0.5) setZoom((prev) => prev - 0.1)
  }

  const handleReset = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      // Left mouse button
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleFilterChange = (type: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const current = [...prev[type]] as string[]
      const index = current.indexOf(value)

      if (index === -1) {
        current.push(value)
      } else {
        current.splice(index, 1)
      }

      return { ...prev, [type]: current }
    })
  }

  const handleIntensityChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, intensity: value }))
  }

  const clearFilters = () => {
    setFilters({
      gender: [],
      season: [],
      intensity: [1, 10],
      occasion: [],
    })
  }

  const activeFiltersCount = useMemo(() => {
    return (
      filters.gender.length +
      filters.season.length +
      filters.occasion.length +
      (filters.intensity[0] !== 1 || filters.intensity[1] !== 10 ? 1 : 0)
    )
  }, [filters])

  const familyNotesMap = useMemo(() => {
    return scentNotes.reduce(
      (acc, note) => {
        if (!acc[note.familyId]) {
          acc[note.familyId] = []
        }
        acc[note.familyId].push(note)
        return acc
      },
      {} as Record<string, ScentNote[]>,
    )
  }, [scentNotes])

  const getRelatedFamilies = (familyId: string) => {
    const family = scentFamilies.find((f) => f.id === familyId)
    return family ? family.relatedFamilies : []
  }

  return (
    <div className="flex flex-col gap-6">
      <Tabs value={view} onValueChange={(v) => setView(v as "map" | "list" | "detail")} className="w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <TabsList>
            <TabsTrigger value="map">Mapa Olfativo</TabsTrigger>
            {selectedFamily && (
              <TabsTrigger value="list">
                Perfumes {selectedFamily.name}
                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {products.length}
                </span>
              </TabsTrigger>
            )}
            {selectedNote && (
              <TabsTrigger value="list">
                Perfumes com {selectedNote.name}
                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {products.length}
                </span>
              </TabsTrigger>
            )}
            {(selectedFamily || selectedNote) && <TabsTrigger value="detail">Detalhes</TabsTrigger>}
          </TabsList>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>Refine sua busca por perfumes com estes filtros</SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-200px)] pr-4 mt-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-3">Gênero</h4>
                      <div className="space-y-2">
                        {[
                          { id: "masculine", label: "Masculino" },
                          { id: "feminine", label: "Feminino" },
                          { id: "unisex", label: "Unissex" },
                        ].map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`gender-${option.id}`}
                              checked={filters.gender.includes(option.id)}
                              onCheckedChange={() => handleFilterChange("gender", option.id)}
                            />
                            <Label htmlFor={`gender-${option.id}`}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-3">Estação</h4>
                      <div className="space-y-2">
                        {[
                          { id: "spring", label: "Primavera" },
                          { id: "summer", label: "Verão" },
                          { id: "autumn", label: "Outono" },
                          { id: "winter", label: "Inverno" },
                        ].map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`season-${option.id}`}
                              checked={filters.season.includes(option.id)}
                              onCheckedChange={() => handleFilterChange("season", option.id)}
                            />
                            <Label htmlFor={`season-${option.id}`}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium mb-3">Ocasião</h4>
                      <div className="space-y-2">
                        {[
                          { id: "daily", label: "Uso diário" },
                          { id: "formal", label: "Eventos formais" },
                          { id: "romantic", label: "Encontros românticos" },
                          { id: "special", label: "Ocasiões especiais" },
                          { id: "business", label: "Ambiente de trabalho" },
                          { id: "sport", label: "Esportes e atividades" },
                          { id: "evening", label: "Noite" },
                        ].map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`occasion-${option.id}`}
                              checked={filters.occasion.includes(option.id)}
                              onCheckedChange={() => handleFilterChange("occasion", option.id)}
                            />
                            <Label htmlFor={`occasion-${option.id}`}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium">Intensidade</h4>
                        <span className="text-xs text-muted-foreground">
                          {filters.intensity[0]} - {filters.intensity[1]}
                        </span>
                      </div>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={filters.intensity}
                        onValueChange={handleIntensityChange}
                        className="my-6"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Suave</span>
                        <span>Intensa</span>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <SheetFooter className="mt-6">
                  <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                    Limpar filtros
                  </Button>
                  <SheetClose asChild>
                    <Button className="w-full sm:w-auto">Aplicar</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Info className="h-4 w-4" />
                    Ajuda
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-sm p-4">
                  <p>
                    Clique nas bolhas coloridas para explorar diferentes famílias olfativas e descobrir perfumes com
                    essas características.
                  </p>
                  <p className="mt-2">Quanto maior a bolha, mais comum é essa família olfativa em nossa coleção.</p>
                  <p className="mt-2">
                    Use os controles de zoom para navegar pelo mapa e os filtros para refinar sua busca.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <TabsContent value="map" className="mt-6">
          <Card>
            <CardContent className="p-0 overflow-hidden">
              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handleZoomIn} disabled={zoom >= 2}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleZoomOut} disabled={zoom <= 0.5}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleReset}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-xs ${showConnections ? "bg-muted" : ""}`}
                    onClick={() => setShowConnections(!showConnections)}
                  >
                    {showConnections ? "Ocultar Conexões" : "Mostrar Conexões"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-xs ${showNotes ? "bg-muted" : ""}`}
                    onClick={() => setShowNotes(!showNotes)}
                  >
                    {showNotes ? "Ocultar Notas" : "Mostrar Notas"}
                  </Button>
                </div>
              </div>
              <div
                ref={mapRef}
                className="relative bg-gradient-to-br from-background to-muted/50 rounded-lg overflow-hidden"
                style={{
                  height: "600px",
                  cursor: isDragging ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="absolute inset-0 transition-transform duration-200"
                  style={{
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  }}
                >
                  {/* Conexões entre famílias relacionadas */}
                  {showConnections &&
                    scentFamilies.map((family) =>
                      family.relatedFamilies.map((relatedId) => {
                        const relatedFamily = scentFamilies.find((f) => f.id === relatedId)
                        if (!relatedFamily) return null

                        const isHighlighted = hoveredFamily === family.id || hoveredFamily === relatedId

                        return (
                          <svg
                            key={`${family.id}-${relatedId}`}
                            className="absolute top-0 left-0 w-full h-full pointer-events-none"
                            style={{ zIndex: 1 }}
                          >
                            <line
                              x1={`${family.position.x}%`}
                              y1={`${family.position.y}%`}
                              x2={`${relatedFamily.position.x}%`}
                              y2={`${relatedFamily.position.y}%`}
                              stroke={isHighlighted ? "currentColor" : "#94a3b8"}
                              strokeWidth={isHighlighted ? 2 : 1}
                              strokeDasharray={isHighlighted ? "none" : "5,5"}
                              strokeOpacity={isHighlighted ? 0.8 : 0.3}
                            />
                          </svg>
                        )
                      }),
                    )}

                  {/* Famílias olfativas */}
                  {scentFamilies.map((family) => (
                    <motion.div
                      key={family.id}
                      className={`absolute rounded-full ${family.color} cursor-pointer flex items-center justify-center text-white font-medium shadow-lg`}
                      style={{
                        left: `${family.position.x}%`,
                        top: `${family.position.y}%`,
                        width: `${family.radius * 2 * scale}px`,
                        height: `${family.radius * 2 * scale}px`,
                        transform: "translate(-50%, -50%)",
                        zIndex: hoveredFamily === family.id ? 10 : 5,
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFamilyClick(family)}
                      onMouseEnter={() => setHoveredFamily(family.id)}
                      onMouseLeave={() => setHoveredFamily(null)}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        delay: Math.random() * 0.3,
                        duration: 0.5,
                      }}
                    >
                      <span className="text-center text-xs sm:text-sm px-1">{family.name}</span>
                    </motion.div>
                  ))}

                  {/* Notas olfativas */}
                  {showNotes &&
                    scentFamilies.map((family) =>
                      familyNotesMap[family.id]?.map((note, index) => {
                        const angle = index * (360 / familyNotesMap[family.id].length) * (Math.PI / 180)
                        const distance = family.radius * 2.5
                        const x = family.position.x + Math.cos(angle) * distance
                        const y = family.position.y + Math.sin(angle) * distance

                        return (
                          <motion.div
                            key={note.id}
                            className="absolute bg-background border rounded-full cursor-pointer flex items-center justify-center text-xs font-medium shadow-sm"
                            style={{
                              left: `${x}%`,
                              top: `${y}%`,
                              width: `${6 * scale}px`,
                              height: `${6 * scale}px`,
                              transform: "translate(-50%, -50%)",
                              zIndex: 3,
                            }}
                            whileHover={{ scale: 1.2 }}
                            onClick={() => handleNoteClick(note)}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              type: "spring",
                              delay: 0.3 + index * 0.05,
                              duration: 0.5,
                            }}
                          >
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="w-full h-full rounded-full" />
                                <TooltipContent>
                                  <p className="font-medium">{note.name}</p>
                                  <p className="text-xs text-muted-foreground">{note.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </motion.div>
                        )
                      }),
                    )}

                  {/* Informações da família selecionada */}
                  {selectedFamily && (
                    <motion.div
                      className="absolute left-4 bottom-4 max-w-xs bg-background/90 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <h3 className="font-medium text-lg">{selectedFamily.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{selectedFamily.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedFamily.notes.slice(0, 5).map((note) => (
                          <Badge key={note} variant="secondary" className="text-xs">
                            {note}
                          </Badge>
                        ))}
                        {selectedFamily.notes.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{selectedFamily.notes.length - 5}
                          </Badge>
                        )}
                      </div>
                      <Button size="sm" className="mt-3" onClick={() => setView("list")}>
                        Ver perfumes ({products.length})
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          {(selectedFamily || selectedNote) && (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold">
                  {selectedFamily ? selectedFamily.name : `Perfumes com ${selectedNote?.name}`}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {selectedFamily ? selectedFamily.description : selectedNote?.description}
                </p>
                {activeFiltersCount > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-sm text-muted-foreground">Filtros ativos:</span>
                    <div className="flex flex-wrap gap-1">
                      {filters.gender.map((gender) => (
                        <Badge key={gender} variant="outline" className="text-xs">
                          {gender === "masculine" ? "Masculino" : gender === "feminine" ? "Feminino" : "Unissex"}
                          <button
                            className="ml-1 hover:text-destructive"
                            onClick={() => handleFilterChange("gender", gender)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {filters.season.map((season) => (
                        <Badge key={season} variant="outline" className="text-xs">
                          {season === "spring"
                            ? "Primavera"
                            : season === "summer"
                              ? "Verão"
                              : season === "autumn"
                                ? "Outono"
                                : "Inverno"}
                          <button
                            className="ml-1 hover:text-destructive"
                            onClick={() => handleFilterChange("season", season)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {filters.occasion.map((occasion) => (
                        <Badge key={occasion} variant="outline" className="text-xs">
                          {occasion}
                          <button
                            className="ml-1 hover:text-destructive"
                            onClick={() => handleFilterChange("occasion", occasion)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {(filters.intensity[0] !== 1 || filters.intensity[1] !== 10) && (
                        <Badge variant="outline" className="text-xs">
                          Intensidade: {filters.intensity[0]}-{filters.intensity[1]}
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="text-xs h-6 px-2" onClick={clearFilters}>
                        Limpar todos
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhum perfume encontrado com os critérios selecionados.</p>
                  {activeFiltersCount > 0 && (
                    <Button variant="outline" className="mt-4" onClick={clearFilters}>
                      Limpar filtros
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="detail" className="mt-6">
          {selectedFamily && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full ${selectedFamily.color}`}></div>
                      <h2 className="text-2xl font-bold">{selectedFamily.name}</h2>
                    </div>
                    <p className="text-muted-foreground">{selectedFamily.description}</p>

                    <div className="mt-6 space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Características</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Gênero</span>
                            <span>
                              {selectedFamily.gender === "masculine"
                                ? "Masculino"
                                : selectedFamily.gender === "feminine"
                                  ? "Feminino"
                                  : "Unissex"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Intensidade</span>
                            <div className="flex items-center gap-1">
                              <div
                                className="h-2 bg-primary rounded-full"
                                style={{ width: `${selectedFamily.intensity * 10}%` }}
                              ></div>
                              <span className="text-sm">{selectedFamily.intensity}/10</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Estações</span>
                            <span>
                              {selectedFamily.seasonality
                                .map((s) =>
                                  s === "spring"
                                    ? "Primavera"
                                    : s === "summer"
                                      ? "Verão"
                                      : s === "autumn"
                                        ? "Outono"
                                        : "Inverno",
                                )
                                .join(", ")}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">Ocasiões</span>
                            <span>{selectedFamily.occasions.join(", ")}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Notas principais</h3>
                        <div className="flex flex-wrap gap-1">
                          {selectedFamily.notes.map((note) => (
                            <Badge key={note} variant="secondary" className="text-xs">
                              {note}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-2">Famílias relacionadas</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedFamily.relatedFamilies.map((relatedId) => {
                            const related = scentFamilies.find((f) => f.id === relatedId)
                            if (!related) return null

                            return (
                              <Button
                                key={relatedId}
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => handleFamilyClick(related)}
                              >
                                <div className={`w-3 h-3 rounded-full ${related.color}`}></div>
                                {related.name}
                              </Button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-4">Notas olfativas</h3>
                    <div className="space-y-4">
                      {familyNotesMap[selectedFamily.id]?.map((note) => (
                        <div
                          key={note.id}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                          <div>
                            <h4 className="font-medium">{note.name}</h4>
                            <p className="text-sm text-muted-foreground">{note.description}</p>
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              onClick={() => handleNoteClick(note)}
                            >
                              Ver perfumes com esta nota
                              <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Perfumes recomendados</h3>
                {products.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {products.slice(0, 4).map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Nenhum perfume encontrado nesta categoria.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedNote && (
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedNote.name}</h2>
                  <p className="text-muted-foreground">{selectedNote.description}</p>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Família olfativa</h3>
                    {(() => {
                      const family = scentFamilies.find((f) => f.id === selectedNote.familyId)
                      if (!family) return null

                      return (
                        <Button variant="outline" className="gap-2" onClick={() => handleFamilyClick(family)}>
                          <div className={`w-3 h-3 rounded-full ${family.color}`}></div>
                          {family.name}
                        </Button>
                      )
                    })()}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Perfumes com esta nota</h3>
                    {products.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {products.slice(0, 4).map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.brand}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Nenhum perfume encontrado com esta nota.</p>
                    )}

                    {products.length > 4 && (
                      <Button variant="link" className="mt-2" onClick={() => setView("list")}>
                        Ver todos os {products.length} perfumes
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

