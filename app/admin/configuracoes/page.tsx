"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Store, CreditCard, Mail, Bell, Shield, Truck, Save, Loader2 } from "lucide-react"

export default function AdminSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSave = () => {
    // Evitar múltiplos envios
    if (isLoading) return

    setIsLoading(true)

    // Simulação de salvamento
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configurações salvas",
        description: "As configurações foram atualizadas com sucesso",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <Button className="gap-2" onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Salvar Alterações
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
          <TabsTrigger value="general" className="flex gap-2 items-center">
            <Store className="h-4 w-4" />
            <span className="hidden md:inline">Geral</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex gap-2 items-center">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Pagamento</span>
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex gap-2 items-center">
            <Truck className="h-4 w-4" />
            <span className="hidden md:inline">Entrega</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex gap-2 items-center">
            <Mail className="h-4 w-4" />
            <span className="hidden md:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-2 items-center">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notificações</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Segurança</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Loja</CardTitle>
              <CardDescription>Configure as informações básicas da sua loja</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Nome da Loja</Label>
                  <Input id="store-name" defaultValue="Essence" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email">Email de Contato</Label>
                  <Input id="store-email" type="email" defaultValue="contato@essence.com.br" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Telefone</Label>
                  <Input id="store-phone" defaultValue="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-currency">Moeda</Label>
                  <Input id="store-currency" defaultValue="BRL" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-address">Endereço</Label>
                <Textarea id="store-address" defaultValue="Rua Exemplo, 123 - São Paulo, SP - CEP 01234-567" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="store-active" defaultChecked />
                <Label htmlFor="store-active">Loja ativa</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de SEO</CardTitle>
              <CardDescription>Otimize sua loja para mecanismos de busca</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Título da Página</Label>
                <Input id="meta-title" defaultValue="Essence - Loja de Perfumes" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Descrição</Label>
                <Textarea
                  id="meta-description"
                  defaultValue="Encontre os melhores perfumes masculinos e femininos na Essence. Fragrâncias exclusivas para todos os gostos."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Palavras-chave</Label>
                <Input
                  id="meta-keywords"
                  defaultValue="perfumes, fragrâncias, perfumes masculinos, perfumes femininos, perfumes unissex"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
              <CardDescription>Configure os métodos de pagamento disponíveis na sua loja</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Cartão de Crédito</h3>
                      <p className="text-sm text-muted-foreground">Aceite pagamentos com cartão de crédito</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 4L4 8L12 12L20 8L12 4Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 16L12 20L20 16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 12L12 16L20 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">PIX</h3>
                      <p className="text-sm text-muted-foreground">Aceite pagamentos instantâneos via PIX</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                        <path d="M7 15H17" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Boleto</h3>
                      <p className="text-sm text-muted-foreground">Aceite pagamentos via boleto bancário</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Entrega</CardTitle>
              <CardDescription>Configure as opções de entrega disponíveis na sua loja</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Correios - PAC</h3>
                      <p className="text-sm text-muted-foreground">Entrega econômica pelos Correios</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Correios - SEDEX</h3>
                      <p className="text-sm text-muted-foreground">Entrega expressa pelos Correios</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between border p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-muted p-2 rounded-md">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Transportadora</h3>
                      <p className="text-sm text-muted-foreground">Entrega via transportadora parceira</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="space-y-2 mt-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="free-shipping-min">Valor mínimo para frete grátis</Label>
                  <div className="w-[180px]">
                    <Input id="free-shipping-min" defaultValue="150" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="free-shipping-active" defaultChecked />
                  <Label htmlFor="free-shipping-active">Ativar frete grátis</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Email</CardTitle>
              <CardDescription>Configure os emails enviados pela sua loja</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">Servidor SMTP</Label>
                    <Input id="smtp-host" defaultValue="smtp.example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Porta</Label>
                    <Input id="smtp-port" defaultValue="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-user">Usuário</Label>
                    <Input id="smtp-user" defaultValue="contato@essence.com.br" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">Senha</Label>
                    <Input id="smtp-password" type="password" defaultValue="********" />
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label>Emails Automáticos</Label>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-order-confirmation" defaultChecked />
                      <Label htmlFor="email-order-confirmation">Confirmação de pedido</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="email-shipping-confirmation" defaultChecked />
                      <Label htmlFor="email-shipping-confirmation">Confirmação de envio</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="email-order-cancellation" defaultChecked />
                      <Label htmlFor="email-order-cancellation">Cancelamento de pedido</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="email-abandoned-cart" defaultChecked />
                      <Label htmlFor="email-abandoned-cart">Carrinho abandonado</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>Configure as notificações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Notificações de Pedidos</Label>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="notify-new-order" defaultChecked />
                      <Label htmlFor="notify-new-order">Novo pedido</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="notify-payment-confirmation" defaultChecked />
                      <Label htmlFor="notify-payment-confirmation">Confirmação de pagamento</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="notify-order-cancellation" defaultChecked />
                      <Label htmlFor="notify-order-cancellation">Cancelamento de pedido</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label>Notificações de Estoque</Label>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="notify-low-stock" defaultChecked />
                      <Label htmlFor="notify-low-stock">Estoque baixo</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="notify-out-of-stock" defaultChecked />
                      <Label htmlFor="notify-out-of-stock">Produto esgotado</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label>Canais de Notificação</Label>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="notify-email" defaultChecked />
                      <Label htmlFor="notify-email">Email</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="notify-sms" />
                      <Label htmlFor="notify-sms">SMS</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="notify-push" defaultChecked />
                      <Label htmlFor="notify-push">Notificações push</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Configure as opções de segurança da sua loja</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Autenticação</Label>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="security-2fa" defaultChecked />
                      <Label htmlFor="security-2fa">Autenticação de dois fatores</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="security-captcha" defaultChecked />
                      <Label htmlFor="security-captcha">CAPTCHA em formulários</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="security-login-attempts" defaultChecked />
                      <Label htmlFor="security-login-attempts">Limitar tentativas de login</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label>Proteção de Dados</Label>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="security-ssl" defaultChecked />
                      <Label htmlFor="security-ssl">Forçar SSL/HTTPS</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="security-data-encryption" defaultChecked />
                      <Label htmlFor="security-data-encryption">Criptografia de dados sensíveis</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="security-privacy-policy" defaultChecked />
                      <Label htmlFor="security-privacy-policy">Exigir aceitação da política de privacidade</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <Label>Backups</Label>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="security-auto-backup" defaultChecked />
                      <Label htmlFor="security-auto-backup">Backup automático</Label>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="security-backup-frequency">Frequência de backup</Label>
                      <div className="w-[180px]">
                        <Input id="security-backup-frequency" defaultValue="Diário" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

