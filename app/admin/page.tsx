"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Package, ShoppingBag, Users, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Dados simulados para os gráficos
const salesData = [
  { name: "Jan", vendas: 4000 },
  { name: "Fev", vendas: 3000 },
  { name: "Mar", vendas: 5000 },
  { name: "Abr", vendas: 4500 },
  { name: "Mai", vendas: 6000 },
  { name: "Jun", vendas: 5500 },
  { name: "Jul", vendas: 7000 },
]

const categoryData = [
  { name: "Masculino", value: 45 },
  { name: "Feminino", value: 40 },
  { name: "Unissex", value: 15 },
]

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendas Totais</p>
                <h3 className="text-2xl font-bold">R$ 24.532,00</h3>
                <div className="flex items-center mt-1 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>12% em relação ao mês anterior</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Novos Pedidos</p>
                <h3 className="text-2xl font-bold">128</h3>
                <div className="flex items-center mt-1 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>8% em relação ao mês anterior</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Novos Usuários</p>
                <h3 className="text-2xl font-bold">45</h3>
                <div className="flex items-center mt-1 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>15% em relação ao mês anterior</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Produtos Vendidos</p>
                <h3 className="text-2xl font-bold">312</h3>
                <div className="flex items-center mt-1 text-sm text-red-500">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>3% em relação ao mês anterior</span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análise Detalhada</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Vendas Mensais</CardTitle>
              <CardDescription>Análise de vendas dos últimos 7 meses</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vendas" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Pedidos Recentes</CardTitle>
                <CardDescription>Últimos 5 pedidos realizados na plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Pedido #{Math.floor(Math.random() * 10000)}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          Cliente: João Silva • {Math.floor(Math.random() * 5) + 1} itens • R${" "}
                          {(Math.random() * 1000).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Vendas por Categoria</CardTitle>
                <CardDescription>Distribuição de vendas por categoria de produto</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Análise Detalhada</CardTitle>
              <CardDescription>Visualize métricas avançadas e tendências de vendas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <TrendingUp className="h-10 w-10 text-muted-foreground" />
                  <h3 className="text-xl font-medium">Análise Detalhada em Desenvolvimento</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Estamos trabalhando para trazer análises mais detalhadas e insights valiosos para o seu negócio.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

