"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ApiEndpoint } from "@/components/api-endpoint"
import { ApiEndpointsPromocoes } from "@/components/api-endpoints-promocoes"
import { ApiEndpointsCupons } from "@/components/api-endpoints-cupons"
import { ApiSearch } from "@/components/api-search"
import { Code, Database, Info, Search, ShoppingCart, Star, Users } from "lucide-react"

export function ApiDocsClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("auth")

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase())

    // Se a busca não estiver vazia, mude para a aba que contém o primeiro resultado
    if (query) {
      // Lógica para determinar qual aba contém o resultado da pesquisa
      // Esta é uma implementação simplificada
      if (query.includes("auth") || query.includes("login") || query.includes("register")) {
        setActiveTab("auth")
      } else if (query.includes("user") || query.includes("profile")) {
        setActiveTab("users")
      } else if (query.includes("product") || query.includes("catalog")) {
        setActiveTab("products")
      } else if (query.includes("promo") || query.includes("discount")) {
        setActiveTab("promotions")
      } else if (query.includes("coupon") || query.includes("cupom")) {
        setActiveTab("coupons")
      } else if (query.includes("cart") || query.includes("carrinho")) {
        setActiveTab("cart")
      }
      // ... e assim por diante
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Documentação da API</h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Documentação completa dos endpoints da API para integração com o sistema Essence.
          </p>
        </div>

        <div className="bg-muted p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Info className="h-4 w-4 text-blue-500" />
            <span>Esta documentação é interativa. Clique em "Ver detalhes" para explorar cada endpoint.</span>
          </div>
        </div>

        <ApiSearch onSearch={handleSearch} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex overflow-x-auto pb-2">
            <TabsList className="h-auto justify-start">
              <TabsTrigger value="auth" className="flex gap-2 items-center">
                <Users className="h-4 w-4" />
                Autenticação
                <Badge>5</Badge>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex gap-2 items-center">
                <Users className="h-4 w-4" />
                Usuários
                <Badge>7</Badge>
              </TabsTrigger>
              <TabsTrigger value="products" className="flex gap-2 items-center">
                <Database className="h-4 w-4" />
                Produtos
                <Badge>8</Badge>
              </TabsTrigger>
              <TabsTrigger value="promotions" className="flex gap-2 items-center">
                <Badge variant="outline" className="gap-1 border-green-500 text-green-500">
                  %
                </Badge>
                Promoções
                <Badge>2</Badge>
              </TabsTrigger>
              <TabsTrigger value="coupons" className="flex gap-2 items-center">
                <Badge variant="outline" className="gap-1 border-amber-500 text-amber-500">
                  $
                </Badge>
                Cupons
                <Badge>3</Badge>
              </TabsTrigger>
              <TabsTrigger value="cart" className="flex gap-2 items-center">
                <ShoppingCart className="h-4 w-4" />
                Carrinho
                <Badge>6</Badge>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex gap-2 items-center">
                <ShoppingCart className="h-4 w-4" />
                Pedidos
                <Badge>7</Badge>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex gap-2 items-center">
                <Star className="h-4 w-4" />
                Avaliações
                <Badge>4</Badge>
              </TabsTrigger>
              <TabsTrigger value="scent-map" className="flex gap-2 items-center">
                <Search className="h-4 w-4" />
                Mapa Olfativo
                <Badge>4</Badge>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex gap-2 items-center">
                <Code className="h-4 w-4" />
                Admin
                <Badge>10</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Autenticação */}
          <TabsContent value="auth" className="mt-6 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Autenticação e Autorização
                </CardTitle>
                <CardDescription>Endpoints para autenticação, registro e gerenciamento de tokens.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ApiEndpoint
                  method="POST"
                  path="/api/auth/register"
                  title="Registro de usuário"
                  description="Cria uma nova conta de usuário"
                  requestBody={{
                    name: "Nome completo do usuário",
                    email: "Email do usuário",
                    password: "Senha (mínimo 8 caracteres)",
                    phone: "Telefone (opcional)",
                  }}
                  responseBody={{
                    id: "ID único do usuário",
                    name: "Nome do usuário",
                    email: "Email do usuário",
                    createdAt: "Data de criação da conta",
                  }}
                  statusCodes={[
                    { code: 201, description: "Usuário criado com sucesso" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 409, description: "Email já cadastrado" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="POST"
                  path="/api/auth/login"
                  title="Login"
                  description="Autentica um usuário e retorna tokens de acesso"
                  requestBody={{
                    email: "Email do usuário",
                    password: "Senha do usuário",
                  }}
                  responseBody={{
                    user: {
                      id: "ID do usuário",
                      name: "Nome do usuário",
                      email: "Email do usuário",
                    },
                    accessToken: "Token JWT para autenticação",
                    refreshToken: "Token para renovação do accessToken",
                  }}
                  statusCodes={[
                    { code: 200, description: "Login realizado com sucesso" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 401, description: "Credenciais inválidas" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="POST"
                  path="/api/auth/refresh-token"
                  title="Renovar token"
                  description="Renova o token de acesso usando o refresh token"
                  requestBody={{
                    refreshToken: "Refresh token válido",
                  }}
                  responseBody={{
                    accessToken: "Novo token JWT para autenticação",
                    refreshToken: "Novo refresh token",
                  }}
                  statusCodes={[
                    { code: 200, description: "Token renovado com sucesso" },
                    { code: 401, description: "Refresh token inválido ou expirado" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="POST"
                  path="/api/auth/logout"
                  title="Logout"
                  description="Invalida os tokens do usuário"
                  requestBody={{
                    refreshToken: "Refresh token a ser invalidado",
                  }}
                  responseBody={{
                    success: "true",
                  }}
                  statusCodes={[
                    { code: 200, description: "Logout realizado com sucesso" },
                    { code: 401, description: "Token inválido" },
                  ]}
                  authentication={true}
                />

                <Separator />

                <ApiEndpoint
                  method="POST"
                  path="/api/auth/forgot-password"
                  title="Recuperação de senha"
                  description="Envia um email com link para redefinição de senha"
                  requestBody={{
                    email: "Email do usuário",
                  }}
                  responseBody={{
                    success: "true",
                    message: "Email enviado com instruções",
                  }}
                  statusCodes={[
                    { code: 200, description: "Email enviado com sucesso" },
                    { code: 404, description: "Email não encontrado" },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promoções */}
          <TabsContent value="promotions" className="mt-6 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1 border-green-500 text-green-500">
                    %
                  </Badge>
                  Promoções
                </CardTitle>
                <CardDescription>
                  Endpoints para consulta de produtos em promoção e gerenciamento de descontos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ApiEndpointsPromocoes />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cupons */}
          <TabsContent value="coupons" className="mt-6 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1 border-amber-500 text-amber-500">
                    $
                  </Badge>
                  Cupons de Desconto
                </CardTitle>
                <CardDescription>Endpoints para gerenciamento e aplicação de cupons de desconto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ApiEndpointsCupons />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outros conteúdos existentes */}
        </Tabs>
      </div>
    </div>
  )
}

