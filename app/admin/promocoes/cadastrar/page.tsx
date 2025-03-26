"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Loader2, Save, ArrowLeft } from "lucide-react"
import { getAllProducts } from "@/lib/product-service"

export default function CadastrarPromocaoPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Estados para os campos do formulário
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [discountType, setDiscountType] = useState("percentage")
  const [discountValue, setDiscountValue] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [isActive, setIsActive] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Obter todos os produtos
  const allProducts = getAllProducts()

  // Função para lidar com o envio do formulário
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      // Validação básica
      if (!name || !description || !discountValue || !startDate) {
        toast({
          title: "Erro de validação",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        })
        return
      }

      if (selectedProducts.length === 0 && selectedCategories.length === 0) {
        toast({
          title: "Erro de validação",
          description: "Selecione pelo menos um produto ou categoria para aplicar a promoção.",
          variant: "destructive",
        })
        return
      }

      setIsLoading(true)

      // Simulação de cadastro
      setTimeout(() => {
        setIsLoading(false)

        toast({
          title: "Promoção cadastrada",
          description: "A promoção foi cadastrada com sucesso.",
        })

        // Redirecionar para a lista de promoções
        router.push("/admin/promocoes")
      }, 1500)
    },
    [
      name,
      description,
      discountType,
      discountValue,
      startDate,
      endDate,
      isActive,
      selectedProducts,
      selectedCategories,
      toast,
      router,
    ],
  )

  // Função para alternar a seleção de um produto
  const toggleProductSelection = useCallback((productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }, [])

  // Função para alternar a seleção de uma categoria
  const toggleCategorySelection = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category],
    )
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Cadastrar Nova Promoção</h1>
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
              Salvar Promoção
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Promoção</CardTitle>
            <CardDescription>Preencha as informações básicas da promoção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Promoção *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Black Friday"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountType">Tipo de Desconto *</Label>
                <Select value={discountType} onValueChange={setDiscountType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de desconto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountValue">
                  {discountType === "percentage" ? "Desconto (%) *" : "Desconto (R$) *"}
                </Label>
                <Input
                  id="discountValue"
                  type="number"
                  min="0"
                  step={discountType === "percentage" ? "1" : "0.01"}
                  max={discountType === "percentage" ? "100" : undefined}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  placeholder={discountType === "percentage" ? "Ex: 15" : "Ex: 50.00"}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isActive">Status</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
                  <Label htmlFor="isActive">{isActive ? "Ativa" : "Inativa"}</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início *</Label>
                <DatePicker id="startDate" date={startDate} setDate={setStartDate} className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">
                  Data de Término <span className="text-muted-foreground">(opcional)</span>
                </Label>
                <DatePicker id="endDate" date={endDate} setDate={setEndDate} className="w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva os detalhes da promoção"
                className="min-h-[100px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aplicação da Promoção</CardTitle>
            <CardDescription>Selecione os produtos ou categorias para aplicar a promoção</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Categorias</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["Masculino", "Feminino", "Unissex", "Kits"].map((category) => (
                    <Button
                      key={category}
                      type="button"
                      variant={selectedCategories.includes(category) ? "default" : "outline"}
                      onClick={() => toggleCategorySelection(category)}
                      className="justify-start"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Produtos Específicos</h3>
                <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {allProducts.map((product) => (
                      <div key={product.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`product-${product.id}`}
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor={`product-${product.id}`} className="cursor-pointer">
                          {product.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Promoção"}
          </Button>
        </div>
      </form>
    </div>
  )
}

