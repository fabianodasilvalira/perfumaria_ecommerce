"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Eye, Package, Filter, Download, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Dados simulados de pedidos
const orders = [
  {
    id: "ORD-12345",
    customer: "João Silva",
    date: "2023-06-15",
    status: "delivered",
    total: 349.9,
    items: 2,
    payment: "credit_card",
    shipping: "standard",
  },
  {
    id: "ORD-12346",
    customer: "Maria Oliveira",
    date: "2023-06-14",
    status: "processing",
    total: 189.9,
    items: 1,
    payment: "pix",
    shipping: "express",
  },
  {
    id: "ORD-12347",
    customer: "Pedro Santos",
    date: "2023-06-13",
    status: "shipped",
    total: 499.8,
    items: 3,
    payment: "credit_card",
    shipping: "standard",
  },
  {
    id: "ORD-12348",
    customer: "Ana Costa",
    date: "2023-06-12",
    status: "cancelled",
    total: 129.9,
    items: 1,
    payment: "boleto",
    shipping: "standard",
  },
  {
    id: "ORD-12349",
    customer: "Carlos Ferreira",
    date: "2023-06-11",
    status: "delivered",
    total: 279.8,
    items: 2,
    payment: "credit_card",
    shipping: "express",
  },
]

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // Filtrar pedidos com base no termo de busca
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Em processamento</Badge>
      case "shipped":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Enviado</Badge>
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">Entregue</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelado</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  const getPaymentMethod = (method: string) => {
    switch (method) {
      case "credit_card":
        return "Cartão de Crédito"
      case "pix":
        return "PIX"
      case "boleto":
        return "Boleto"
      default:
        return "Outro"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar pedidos..."
            className="pl-10 w-full sm:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Itens</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhum pedido encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPaymentMethod(order.payment)}</TableCell>
                  <TableCell className="text-right">R$ {order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{order.items}</TableCell>
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
                          <Eye className="h-4 w-4" />
                          Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Package className="h-4 w-4" />
                          Atualizar Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Printer className="h-4 w-4" />
                          Imprimir
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
    </div>
  )
}

