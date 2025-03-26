"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreHorizontal, Edit, Trash, Copy, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Dados simulados de cupons
const coupons = [
  {
    id: "1",
    code: "BEMVINDO15",
    discount: "15%",
    discountType: "percentage",
    minPurchase: null,
    description: "Desconto para primeira compra",
    expiryDate: "2025-06-30",
    isActive: true,
    usageLimit: "unlimited",
    usageCount: 45,
  },
  {
    id: "2",
    code: "FRETE0",
    discount: "Frete Grátis",
    discountType: "shipping",
    minPurchase: 150,
    description: "Frete grátis para todo o Brasil",
    expiryDate: "2025-12-31",
    isActive: true,
    usageLimit: "unlimited",
    usageCount: 78,
  },
  {
    id: "3",
    code: "VERAO25",
    discount: "25%",
    discountType: "percentage",
    minPurchase: 200,
    description: "Desconto em perfumes frescos",
    expiryDate: "2025-02-28",
    isActive: true,
    usageLimit: 100,
    usageCount: 32,
  },
  {
    id: "4",
    code: "ANIVERSARIO30",
    discount: "30%",
    discountType: "percentage",
    minPurchase: null,
    description: "Desconto especial de aniversário",
    expiryDate: "2025-07-15",
    isActive: true,
    usageLimit: 50,
    usageCount: 12,
  },
  {
    id: "5",
    code: "COMBO20",
    discount: "20%",
    discountType: "percentage",
    minPurchase: null,
    description: "Desconto para compra de 2 ou mais itens",
    expiryDate: "2025-12-31",
    isActive: false,
    usageLimit: "unlimited",
    usageCount: 67,
  },
]

export default function AdminCouponsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { toast } = useToast()

  // Filtrar cupons com base no termo de busca
  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDelete = (id: string) => {
    setSelectedCoupon(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Simulação de exclusão
    toast({
      title: "Cupom excluído",
      description: "O cupom foi excluído com sucesso",
    })
    setIsDeleteDialogOpen(false)
    setSelectedCoupon(null)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)

    toast({
      title: "Código copiado",
      description: `O código ${code} foi copiado para a área de transferência`,
    })

    setTimeout(() => {
      setCopiedCode(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Cupons</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Cupom
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cupons..."
            className="pl-10 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Desconto</TableHead>
              <TableHead>Compra Mínima</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Usos</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhum cupom encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{coupon.code}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleCopyCode(coupon.code)}
                      >
                        {copiedCode === coupon.code ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        <span className="sr-only">Copiar código</span>
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{coupon.description}</TableCell>
                  <TableCell>{coupon.discount}</TableCell>
                  <TableCell>{coupon.minPurchase ? `R$ ${coupon.minPurchase.toFixed(2)}` : "Sem mínimo"}</TableCell>
                  <TableCell>{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {coupon.usageCount} / {coupon.usageLimit === "unlimited" ? "∞" : coupon.usageLimit}
                  </TableCell>
                  <TableCell>
                    {coupon.isActive ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Ativo</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-600" onClick={() => handleDelete(coupon.id)}>
                          <Trash className="h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este cupom? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

