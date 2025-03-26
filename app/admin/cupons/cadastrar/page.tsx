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
import { Loader2, Save, ArrowLeft, RefreshCw } from "lucide-react"

export default function CadastrarCupomPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Estados para os campos do formulário
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [discountType, setDiscountType] = useState("percentage")
  const [discountValue, setDiscountValue] = useState("")
  const [minPurchase, setMinPurchase] = useState("")
  const [maxUses, setMaxUses] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [isActive, setIsActive] = useState(true)

  // Função para gerar um código de cupom aleatório
  const generateRandomCode = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCode(result)
  }, [])

  // Função para lidar com o envio do formulário
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      // Validação básica
      if (!code || !description || !discountValue || !startDate) {
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
          title: "Cupom cadastrado",
          description: "O cupom foi cadastrado com sucesso.",
        })

        // Redirecionar para a lista de cupons
        router.push("/admin/cupons")
      }, 1500)
    },
    [code, description, discountType, discountValue, minPurchase, maxUses, startDate, endDate, isActive, toast, router],
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Cadastrar Novo Cupom</h1>
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
              Salvar Cupom
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Cupom</CardTitle>
            <CardDescription>Preencha as informações básicas do cupom de desconto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Código do Cupom *</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Ex: WELCOME10"
                    className="uppercase"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={generateRandomCode}
                    title="Gerar código aleatório"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
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
                <Label htmlFor="minPurchase">
                  Valor Mínimo de Compra (R$) <span className="text-muted-foreground">(opcional)</span>
                </Label>
                <Input
                  id="minPurchase"
                  type="number"
                  min="0"
                  step="0.01"
                  value={minPurchase}
                  onChange={(e) => setMinPurchase(e.target.value)}
                  placeholder="Ex: 100.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxUses">
                  Limite de Usos <span className="text-muted-foreground">(opcional)</span>
                </Label>
                <Input
                  id="maxUses"
                  type="number"
                  min="1"
                  step="1"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  placeholder="Ex: 100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="isActive">Status</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="isActive" checked={isActive} onCheckedChange={setIsActive} />
                  <Label htmlFor="isActive">{isActive ? "Ativo" : "Inativo"}</Label>
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
                placeholder="Descreva os detalhes do cupom"
                className="min-h-[100px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Cupom"}
          </Button>
        </div>
      </form>
    </div>
  )
}

