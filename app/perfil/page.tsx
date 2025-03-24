"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { User, Package, MapPin, CreditCard, Bell, Lock, LogOut, Loader2, Check, Plus } from "lucide-react"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Dados simulados do usuário
  const user = {
    name: "Maria Silva",
    email: "maria.silva@example.com",
    phone: "(11) 98765-4321",
    avatar: "/placeholder.svg?height=100&width=100",
  }

  // Dados simulados de endereços
  const addresses = [
    {
      id: "1",
      name: "Casa",
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Jardim Primavera",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      isDefault: true,
    },
    {
      id: "2",
      name: "Trabalho",
      street: "Avenida Paulista",
      number: "1000",
      complement: "Sala 210",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      isDefault: false,
    },
  ]

  // Dados simulados de pedidos
  const orders = [
    {
      id: "ORD-12345",
      date: "15/05/2023",
      status: "Entregue",
      total: 349.9,
      items: 2,
    },
    {
      id: "ORD-12346",
      date: "02/06/2023",
      status: "Em processamento",
      total: 189.9,
      items: 1,
    },
    {
      id: "ORD-12347",
      date: "20/06/2023",
      status: "A caminho",
      total: 499.8,
      items: 3,
    },
  ]

  const handleSaveProfile = () => {
    setIsLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      })
    }, 1500)
  }

  return (
    <div className="container px-4 md:px-6 py-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Minha Conta</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas informações pessoais, endereços e pedidos</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="h-auto">
              <TabsTrigger value="profile" className="flex gap-2 items-center">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex gap-2 items-center">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Pedidos</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex gap-2 items-center">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Endereços</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex gap-2 items-center">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Pagamento</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex gap-2 items-center">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificações</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex gap-2 items-center">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Segurança</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize suas informações pessoais e de contato</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      Alterar foto
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">JPG, GIF ou PNG. Tamanho máximo de 1MB.</p>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" defaultValue={user.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" defaultValue={user.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Data de nascimento</Label>
                    <Input id="birthdate" type="date" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button onClick={handleSaveProfile} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Salvar alterações
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Pedidos</CardTitle>
                <CardDescription>Acompanhe o status dos seus pedidos recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 p-4 font-medium border-b bg-muted/50 text-sm">
                    <div>Pedido</div>
                    <div>Data</div>
                    <div>Status</div>
                    <div className="text-right">Total</div>
                    <div></div>
                  </div>
                  {orders.map((order) => (
                    <div key={order.id} className="grid grid-cols-5 p-4 items-center border-b last:border-0 text-sm">
                      <div className="font-medium">{order.id}</div>
                      <div>{order.date}</div>
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            order.status === "Entregue"
                              ? "bg-green-100 text-green-700"
                              : order.status === "A caminho"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="text-right">R$ {order.total.toFixed(2)}</div>
                      <div className="text-right">
                        <Button variant="ghost" size="sm">
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="outline">Ver todos os pedidos</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Endereços</CardTitle>
                <CardDescription>Gerencie seus endereços de entrega</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {addresses.map((address) => (
                    <Card key={address.id} className="border">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">{address.name}</CardTitle>
                          {address.isDefault && (
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Padrão</span>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 text-sm">
                        <p>
                          {address.street}, {address.number}
                        </p>
                        {address.complement && <p>{address.complement}</p>}
                        <p>{address.neighborhood}</p>
                        <p>
                          {address.city} - {address.state}
                        </p>
                        <p>CEP: {address.zipCode}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button variant="ghost" size="sm">
                          Editar
                        </Button>
                        {!address.isDefault && (
                          <Button variant="ghost" size="sm">
                            Remover
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}

                  <Card className="border border-dashed flex flex-col items-center justify-center p-6">
                    <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center mb-4">Adicionar novo endereço</p>
                    <Button variant="outline">Adicionar</Button>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pagamento</CardTitle>
                <CardDescription>Gerencie seus cartões e métodos de pagamento</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum método de pagamento salvo</h3>
                <p className="text-muted-foreground text-center max-w-md mb-6">
                  Você ainda não tem nenhum método de pagamento salvo. Adicione um cartão para agilizar suas compras
                  futuras.
                </p>
                <Button>Adicionar método de pagamento</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>Escolha como e quando deseja receber notificações</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-10">Funcionalidade em desenvolvimento</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Segurança da Conta</CardTitle>
                <CardDescription>Gerencie sua senha e configurações de segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alterar senha</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Senha atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nova senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button className="mt-2">Atualizar senha</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sessões ativas</h3>
                  <p className="text-sm text-muted-foreground">
                    Você está conectado neste dispositivo. Se notar alguma atividade suspeita, saia de todas as sessões.
                  </p>
                  <Button variant="outline" className="gap-2">
                    <LogOut className="h-4 w-4" />
                    Sair de todas as sessões
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

