"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Loader2, Save, ArrowLeft, Plus, Trash2 } from "lucide-react"

export default function CadastrarProdutoPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Estados para os campos do formulário
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [fullDescription, setFullDescription] = useState("")
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [type, setType] = useState("")
  const [fragrance, setFragrance] = useState("")
  const [sizes, setSizes] = useState<string[]>(["50ml", "100ml"])
  const [newSize, setNewSize] = useState("")
  const [images, setImages] = useState<string[]>([""])
  const [isNew, setIsNew] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [scentFamily, setScentFamily] = useState("")
  const [topNotes, setTopNotes] = useState("")
  const [heartNotes, setHeartNotes] = useState("")
  const [baseNotes, setBaseNotes] = useState("")

  // Função para adicionar um novo tamanho
  const addSize = useCallback(() => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes((prev) => [...prev, newSize])
      setNewSize("")
    }
  }, [newSize, sizes])

  // Função para remover um tamanho
  const removeSize = useCallback((size: string) => {
    setSizes((prev) => prev.filter((s) => s !== size))
  }, [])

  // Função para adicionar uma nova imagem
  const addImage = useCallback(() => {
    setImages((prev) => [...prev, ""])
  }, [])

  // Função para atualizar uma imagem
  const updateImage = useCallback((index: number, value: string) => {
    setImages((prev) => {
      const newImages = [...prev]
      newImages[index] = value
      return newImages
    })
  }, [])

  // Função para remover uma imagem
  const removeImage = useCallback(
    (index: number) => {
      if (images.length > 1) {
        setImages((prev) => {
          const newImages = [...prev]
          newImages.splice(index, 1)
          return newImages
        })
      }
    },
    [images.length],
  )

  // Função para lidar com o envio do formulário
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      // Validação básica
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !brand ||
        !type ||
        !fragrance ||
        sizes.length === 0 ||
        images.some((img) => !img)
      ) {
        toast({
          title: "Erro de validação",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        })
        return
      }

      setIsLoading(true)

      // Simulação de cadastro
      setTimeout(() => {
        setIsLoading(false)

        toast({
          title: "Produto cadastrado",
          description: "O produto foi cadastrado com sucesso.",
        })

        // Redirecionar para a lista de produtos
        router.push("/admin/produtos")
      }, 1500)
    },
    [name, description, price, category, brand, type, fragrance, sizes, images, toast, router],
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Cadastrar Novo Produto</h1>
        </div>

        <Button onClick={handleSubmit} disabled={isLoading} className="gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Produto
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Preencha as informações básicas do produto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Essence Noir"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Marca *</Label>
                <Input
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Ex: Essence"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                    <SelectItem value="Unissex">Unissex</SelectItem>
                    <SelectItem value="Kits">Kits</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tipo *</Label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Eau de Parfum">Eau de Parfum</SelectItem>
                    <SelectItem value="Eau de Toilette">Eau de Toilette</SelectItem>
                    <SelectItem value="Eau de Cologne">Eau de Cologne</SelectItem>
                    <SelectItem value="Extrait de Parfum">Extrait de Parfum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ex: 199.90"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">
                  Desconto (%) <span className="text-muted-foreground">(opcional)</span>
                </Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Ex: 15"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição Curta *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve descrição do produto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription">Descrição Completa *</Label>
              <Textarea
                id="fullDescription"
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Descrição detalhada do produto"
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="isNew" checked={isNew} onCheckedChange={(checked) => setIsNew(checked === true)} />
                <Label htmlFor="isNew">Produto Novo</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFeatured"
                  checked={isFeatured}
                  onCheckedChange={(checked) => setIsFeatured(checked === true)}
                />
                <Label htmlFor="isFeatured">Produto em Destaque</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fragrância</CardTitle>
            <CardDescription>Informações sobre a fragrância do produto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fragrance">Fragrância *</Label>
                <Input
                  id="fragrance"
                  value={fragrance}
                  onChange={(e) => setFragrance(e.target.value)}
                  placeholder="Ex: Amadeirado Especiado"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scentFamily">
                  Família Olfativa <span className="text-muted-foreground">(opcional)</span>
                </Label>
                <Select value={scentFamily} onValueChange={setScentFamily}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma família olfativa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amadeirado">Amadeirado</SelectItem>
                    <SelectItem value="floral">Floral</SelectItem>
                    <SelectItem value="oriental">Oriental</SelectItem>
                    <SelectItem value="citrico">Cítrico</SelectItem>
                    <SelectItem value="frutal">Frutal</SelectItem>
                    <SelectItem value="aromatico">Aromático</SelectItem>
                    <SelectItem value="aquatico">Aquático</SelectItem>
                    <SelectItem value="especiado">Especiado</SelectItem>
                    <SelectItem value="gourmand">Gourmand</SelectItem>
                    <SelectItem value="verde">Verde</SelectItem>
                    <SelectItem value="fougere">Fougère</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="topNotes">
                Notas de Topo <span className="text-muted-foreground">(opcional)</span>
              </Label>
              <Input
                id="topNotes"
                value={topNotes}
                onChange={(e) => setTopNotes(e.target.value)}
                placeholder="Ex: Bergamota, Cardamomo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heartNotes">
                Notas de Coração <span className="text-muted-foreground">(opcional)</span>
              </Label>
              <Input
                id="heartNotes"
                value={heartNotes}
                onChange={(e) => setHeartNotes(e.target.value)}
                placeholder="Ex: Lavanda, Gerânio"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="baseNotes">
                Notas de Fundo <span className="text-muted-foreground">(opcional)</span>
              </Label>
              <Input
                id="baseNotes"
                value={baseNotes}
                onChange={(e) => setBaseNotes(e.target.value)}
                placeholder="Ex: Sândalo, Patchouli, Âmbar"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tamanhos</CardTitle>
            <CardDescription>Tamanhos disponíveis para o produto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                  <span>{size}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={() => removeSize(size)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input value={newSize} onChange={(e) => setNewSize(e.target.value)} placeholder="Ex: 150ml" />
              <Button type="button" onClick={addSize} variant="outline">
                Adicionar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Imagens</CardTitle>
            <CardDescription>Imagens do produto (URLs)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={image}
                  onChange={(e) => updateImage(index, e.target.value)}
                  placeholder="URL da imagem"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeImage(index)}
                  disabled={images.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button type="button" onClick={addImage} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Imagem
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Produto"}
          </Button>
        </div>
      </form>
    </div>
  )
}

