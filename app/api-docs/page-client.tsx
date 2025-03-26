"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ApiEndpoint } from "@/components/api-endpoint"
import { ApiSearch } from "@/components/api-search"
import {
  Database,
  ShoppingCart,
  Star,
  Users,
  Package,
  Percent,
  Map,
  Ticket,
  FileText,
  CreditCard,
  Bell,
  Lock,
} from "lucide-react"
import { motion } from "framer-motion"
import { ApiEndpointsPromocoes } from "@/components/api-endpoints-promocoes"
import { ApiEndpointsCupons } from "@/components/api-endpoints-cupons"
import { ApiEndpointsPagamentos } from "@/components/api-endpoints-pagamentos"

export function ApiDocsClient() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("products")
  const [mounted, setMounted] = useState(false)

  // Garantir que o componente só seja renderizado no cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase())

    // Se a busca não estiver vazia, mude para a aba que contém o primeiro resultado
    if (query) {
      if (query.includes("product") || query.includes("produto")) {
        setActiveTab("products")
      } else if (query.includes("cart") || query.includes("carrinho")) {
        setActiveTab("cart")
      } else if (query.includes("order") || query.includes("pedido")) {
        setActiveTab("orders")
      } else if (query.includes("user") || query.includes("usuario")) {
        setActiveTab("users")
      } else if (query.includes("promo") || query.includes("discount")) {
        setActiveTab("promotions")
      } else if (query.includes("coupon") || query.includes("cupom")) {
        setActiveTab("coupons")
      } else if (query.includes("review") || query.includes("avaliacao")) {
        setActiveTab("reviews")
      } else if (query.includes("scent") || query.includes("olfativo")) {
        setActiveTab("scent-map")
      } else if (query.includes("delivery") || query.includes("entrega")) {
        setActiveTab("delivery")
      } else if (query.includes("payment") || query.includes("pagamento")) {
        setActiveTab("payment")
      } else if (query.includes("notification") || query.includes("notificacao")) {
        setActiveTab("notifications")
      } else if (query.includes("security") || query.includes("seguranca")) {
        setActiveTab("security")
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <motion.div
        className="flex flex-col gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
            Documentação da API
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Documentação completa dos endpoints da API para integração com o sistema Essence.
          </p>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-primary" />
            <span>Esta documentação é interativa. Clique em "Ver detalhes" para explorar cada endpoint.</span>
          </div>
        </div>

        <ApiSearch onSearch={handleSearch} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            <TabsList className="h-auto justify-start">
              <TabsTrigger value="products" className="flex gap-2 items-center">
                <Database className="h-4 w-4" />
                Produtos
                <Badge>4</Badge>
              </TabsTrigger>
              <TabsTrigger value="cart" className="flex gap-2 items-center">
                <ShoppingCart className="h-4 w-4" />
                Carrinho
                <Badge>5</Badge>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex gap-2 items-center">
                <Package className="h-4 w-4" />
                Pedidos
                <Badge>3</Badge>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex gap-2 items-center">
                <Users className="h-4 w-4" />
                Usuários
                <Badge>4</Badge>
              </TabsTrigger>
              <TabsTrigger value="promotions" className="flex gap-2 items-center">
                <Percent className="h-4 w-4" />
                Promoções
                <Badge>2</Badge>
              </TabsTrigger>
              <TabsTrigger value="coupons" className="flex gap-2 items-center">
                <Ticket className="h-4 w-4" />
                Cupons
                <Badge>3</Badge>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex gap-2 items-center">
                <Star className="h-4 w-4" />
                Avaliações
                <Badge>2</Badge>
              </TabsTrigger>
              <TabsTrigger value="scent-map" className="flex gap-2 items-center">
                <Map className="h-4 w-4" />
                Mapa Olfativo
                <Badge>3</Badge>
              </TabsTrigger>
              <TabsTrigger value="delivery" className="flex gap-2 items-center">
                <Package className="h-4 w-4" />
                Entregas
                <Badge>2</Badge>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex gap-2 items-center">
                <CreditCard className="h-4 w-4" />
                Pagamentos
                <Badge>3</Badge>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex gap-2 items-center">
                <Bell className="h-4 w-4" />
                Notificações
                <Badge>2</Badge>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex gap-2 items-center">
                <Lock className="h-4 w-4" />
                Segurança
                <Badge>3</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Produtos */}
          <TabsContent value="products" className="mt-6 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Produtos
                </CardTitle>
                <CardDescription>Endpoints para consulta e gerenciamento de produtos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <ApiEndpoint
                  method="GET"
                  path="/api/produtos"
                  title="Listar produtos"
                  description="Retorna uma lista paginada de produtos com filtros"
                  queryParams={{
                    page: "Número da página (padrão: 1)",
                    limit: "Itens por página (padrão: 20, max: 100)",
                    categoria: "Filtrar por categoria (masculino, feminino, unissex)",
                    marca: "Filtrar por marca",
                    precoMin: "Preço mínimo",
                    precoMax: "Preço máximo",
                    ordenar: "Ordenação (preco_asc, preco_desc, nome_asc, nome_desc, mais_vendidos)",
                    search: "Termo de busca para pesquisar produtos",
                    familiaOlfativa: "Filtrar por família olfativa",
                    emPromocao: "Filtrar produtos em promoção (true/false)",
                    lancamento: "Filtrar produtos novos (true/false)",
                  }}
                  responseBody={{
                    produtos: [
                      {
                        id: "ID do produto",
                        nome: "Nome do produto",
                        descricao: "Descrição curta",
                        preco: "Preço original",
                        precoPromocional: "Preço com desconto (se aplicável)",
                        categoria: "Categoria",
                        marca: "Marca",
                        imagens: ["URLs das imagens"],
                        avaliacao: "Avaliação média",
                        numeroAvaliacoes: "Número de avaliações",
                        familiaOlfativa: "Família olfativa principal",
                        emEstoque: "Disponibilidade em estoque",
                        lancamento: "Se é um lançamento",
                        emPromocao: "Se está em promoção",
                        percentualDesconto: "Percentual de desconto (se aplicável)",
                      },
                    ],
                    paginacao: {
                      total: "Total de produtos",
                      pagina: "Página atual",
                      totalPaginas: "Total de páginas",
                      porPagina: "Itens por página",
                    },
                    filtrosDisponiveis: {
                      categorias: ["Lista de categorias disponíveis"],
                      marcas: ["Lista de marcas disponíveis"],
                      familiasOlfativas: ["Lista de famílias olfativas disponíveis"],
                      faixasPreco: ["Faixas de preço sugeridas"],
                    },
                  }}
                  statusCodes={[
                    { code: 200, description: "Sucesso" },
                    { code: 400, description: "Parâmetros inválidos" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="GET"
                  path="/api/produtos/{id}"
                  title="Obter produto"
                  description="Retorna os detalhes de um produto específico"
                  pathParams={{
                    id: "ID único do produto",
                  }}
                  responseBody={{
                    id: "ID do produto",
                    nome: "Nome do produto",
                    descricao: "Descrição curta",
                    descricaoLonga: "Descrição completa",
                    preco: "Preço original",
                    precoPromocional: "Preço com desconto (se aplicável)",
                    categoria: "Categoria",
                    marca: "Marca",
                    imagens: ["URLs das imagens"],
                    avaliacao: "Avaliação média",
                    numeroAvaliacoes: "Número de avaliações",
                    caracteristicas: {
                      volume: "Tamanhos disponíveis",
                      concentracao: "Tipo de concentração",
                      familia: "Família olfativa",
                      notasTopo: ["Notas de topo"],
                      notasCoracao: ["Notas de coração"],
                      notasFundo: ["Notas de fundo"],
                      duracaoMedia: "Duração média em horas",
                      silage: "Projeção do perfume (baixa, média, alta)",
                      ocasioes: ["Ocasiões recomendadas"],
                      estacoes: ["Estações recomendadas"],
                    },
                    estoque: {
                      "50ml": "Quantidade disponível",
                      "100ml": "Quantidade disponível",
                      "150ml": "Quantidade disponível",
                    },
                    lancamento: "Se é um lançamento",
                    emPromocao: "Se está em promoção",
                    percentualDesconto: "Percentual de desconto (se aplicável)",
                    dataInicio: "Data de início da promoção (se aplicável)",
                    dataFim: "Data de término da promoção (se aplicável)",
                    produtosRelacionados: ["IDs de produtos relacionados"],
                    tags: ["Tags associadas ao produto"],
                  }}
                  statusCodes={[
                    { code: 200, description: "Sucesso" },
                    { code: 404, description: "Produto não encontrado" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="POST"
                  path="/api/produtos"
                  title="Criar produto"
                  description="Cria um novo produto no catálogo"
                  requestBody={{
                    nome: "Nome do produto",
                    descricao: "Descrição curta",
                    descricaoLonga: "Descrição completa",
                    preco: "Preço original",
                    categoria: "Categoria",
                    marca: "Marca",
                    tipo: "Tipo de perfume",
                    fragancia: "Descrição da fragrância",
                    notas: {
                      topo: "Notas de topo",
                      coracao: "Notas de coração",
                      fundo: "Notas de fundo",
                    },
                    tamanhos: ["Tamanhos disponíveis"],
                    imagens: ["URLs das imagens"],
                    lancamento: "Se é um lançamento",
                    destaque: "Se deve ser destacado",
                    familiaOlfativa: "Família olfativa principal",
                    estoque: {
                      "50ml": "Quantidade disponível",
                      "100ml": "Quantidade disponível",
                    },
                    tags: ["Tags associadas ao produto"],
                  }}
                  responseBody={{
                    id: "ID do produto criado",
                    nome: "Nome do produto",
                    descricao: "Descrição curta",
                    preco: "Preço original",
                    // Outros campos retornados
                  }}
                  statusCodes={[
                    { code: 201, description: "Produto criado" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 401, description: "Não autenticado" },
                    { code: 403, description: "Não autorizado" },
                  ]}
                  authentication={true}
                  adminOnly={true}
                  requiredFields={[
                    "nome",
                    "descricao",
                    "preco",
                    "categoria",
                    "marca",
                    "tipo",
                    "fragancia",
                    "tamanhos",
                    "imagens",
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="PUT"
                  path="/api/produtos/{id}"
                  title="Atualizar produto"
                  description="Atualiza um produto existente"
                  pathParams={{
                    id: "ID único do produto",
                  }}
                  requestBody={{
                    nome: "Nome do produto",
                    descricao: "Descrição curta",
                    descricaoLonga: "Descrição completa",
                    preco: "Preço original",
                    categoria: "Categoria",
                    marca: "Marca",
                    // Outros campos atualizáveis
                  }}
                  responseBody={{
                    id: "ID do produto",
                    nome: "Nome do produto atualizado",
                    // Outros campos atualizados
                  }}
                  statusCodes={[
                    { code: 200, description: "Produto atualizado" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 401, description: "Não autenticado" },
                    { code: 403, description: "Não autorizado" },
                    { code: 404, description: "Produto não encontrado" },
                  ]}
                  authentication={true}
                  adminOnly={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carrinho */}
          <TabsContent value="cart" className="mt-6 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Carrinho
                </CardTitle>
                <CardDescription>Endpoints para gerenciamento do carrinho de compras.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <ApiEndpoint
                  method="GET"
                  path="/api/carrinho"
                  title="Obter carrinho"
                  description="Retorna os itens do carrinho do usuário atual"
                  responseBody={{
                    id: "ID do carrinho",
                    items: [
                      {
                        id: "ID do item no carrinho",
                        productId: "ID do produto",
                        name: "Nome do produto",
                        price: "Preço unitário",
                        quantity: "Quantidade",
                        size: "Tamanho (ml)",
                        image: "URL da imagem",
                        discount: "Desconto aplicado (se houver)",
                        finalPrice: "Preço final após desconto",
                      },
                    ],
                    subtotal: "Valor subtotal",
                    discount: "Valor do desconto (se aplicável)",
                    shipping: "Valor do frete (se calculado)",
                    total: "Valor total",
                    couponCode: "Código do cupom aplicado (se houver)",
                    couponDiscount: "Valor do desconto do cupom",
                    estimatedDelivery: "Data estimada de entrega (se calculada)",
                  }}
                  statusCodes={[
                    { code: 200, description: "Sucesso" },
                    { code: 401, description: "Não autenticado" },
                  ]}
                  authentication={true}
                />

                <Separator />

                <ApiEndpoint
                  method="POST"
                  path="/api/carrinho"
                  title="Adicionar ao carrinho"
                  description="Adiciona um produto ao carrinho"
                  requestBody={{
                    productId: "ID do produto",
                    quantity: "Quantidade (padrão: 1)",
                    size: "Tamanho (ml)",
                  }}
                  responseBody={{
                    success: true,
                    message: "Produto adicionado ao carrinho",
                    cart: {
                      id: "ID do carrinho",
                      items: [
                        {
                          id: "ID do item no carrinho",
                          productId: "ID do produto",
                          name: "Nome do produto",
                          price: "Preço unitário",
                          quantity: "Quantidade",
                          size: "Tamanho (ml)",
                          image: "URL da imagem",
                          discount: "Desconto aplicado (se houver)",
                          finalPrice: "Preço final após desconto",
                        },
                      ],
                      subtotal: "Valor subtotal",
                      total: "Valor total",
                      itemCount: "Número total de itens",
                    },
                  }}
                  statusCodes={[
                    { code: 200, description: "Sucesso" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 404, description: "Produto não encontrado" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="PUT"
                  path="/api/carrinho/{itemId}"
                  title="Atualizar item do carrinho"
                  description="Atualiza a quantidade de um item no carrinho"
                  pathParams={{
                    itemId: "ID do item no carrinho",
                  }}
                  requestBody={{
                    quantity: "Nova quantidade",
                    size: "Novo tamanho (opcional)",
                  }}
                  responseBody={{
                    success: true,
                    message: "Item atualizado",
                    cart: {
                      id: "ID do carrinho",
                      items: ["Itens atualizados do carrinho"],
                      subtotal: "Valor subtotal",
                      total: "Valor total",
                      itemCount: "Número total de itens",
                    },
                  }}
                  statusCodes={[
                    { code: 200, description: "Sucesso" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 404, description: "Item não encontrado" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="DELETE"
                  path="/api/carrinho/{itemId}"
                  title="Remover item do carrinho"
                  description="Remove um item do carrinho"
                  pathParams={{
                    itemId: "ID do item no carrinho",
                  }}
                  responseBody={{
                    success: true,
                    message: "Item removido",
                    cart: {
                      id: "ID do carrinho",
                      items: ["Itens restantes do carrinho"],
                      subtotal: "Valor subtotal",
                      total: "Valor total",
                      itemCount: "Número total de itens",
                    },
                  }}
                  statusCodes={[
                    { code: 200, description: "Sucesso" },
                    { code: 404, description: "Item não encontrado" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="DELETE"
                  path="/api/carrinho"
                  title="Limpar carrinho"
                  description="Remove todos os itens do carrinho"
                  responseBody={{
                    success: true,
                    message: "Carrinho esvaziado",
                  }}
                  statusCodes={[{ code: 200, description: "Sucesso" }]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pedidos */}
          <TabsContent value="orders" className="mt-6 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Pedidos
                </CardTitle>
                <CardDescription>Endpoints para gerenciamento de pedidos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <ApiEndpoint
                  method="GET"
                  path="/api/pedidos"
                  title="Listar pedidos"
                  description="Retorna a lista de pedidos do usuário"
                  queryParams={{
                    page: "Número da página (padrão: 1)",
                    limit: "Itens por página (padrão: 10)",
                    status: "Filtrar por status (pendente, pago, enviado, entregue, cancelado)",
                    dataInicio: "Filtrar por data inicial (formato: YYYY-MM-DD)",
                    dataFim: "Filtrar por data final (formato: YYYY-MM-DD)",
                    ordenar: "Ordenação (data_desc, data_asc, valor_desc, valor_asc)",
                  }}
                  responseBody={{
                    pedidos: [
                      {
                        id: "ID do pedido",
                        numero: "Número do pedido",
                        data: "Data de criação",
                        status: "Status do pedido",
                        valorTotal: "Valor total",
                        formaPagamento: "Forma de pagamento",
                        itens: ["Quantidade de itens"],
                        statusEntrega: "Status da entrega",
                        dataEstimadaEntrega: "Data estimada de entrega",
                        codigoRastreamento: "Código de rastreamento (se disponível)",
                      },
                    ],
                    paginacao: {
                      total: "Total de pedidos",
                      pagina: "Página atual",
                      totalPaginas: "Total de páginas",
                    },
                  }}
                  statusCodes={[
                    { code: 200, description: "Sucesso" },
                    { code: 401, description: "Não autenticado" },
                  ]}
                  authentication={true}
                />

                <Separator />

                <ApiEndpoint
                  method="GET"
                  path="/api/pedidos/{id}"
                  title="Detalhes do pedido"
                  description="Retorna os detalhes de um pedido específico"
                  pathParams={{
                    id: "ID do pedido",
                  }}
                  responseBody={{
                    id: "ID do pedido",
                    numero: "Número do pedido",
                    data: "Data de criação",
                    status: "Status do pedido",
                    valorSubtotal: "Valor subtotal",
                    valorFrete: "Valor do frete",
                    valorDesconto: "Valor do desconto",
                    valorTotal: "Valor total",
                    formaPagamento: "Forma de pagamento",
                    cupomAplicado: "Cupom aplicado (se houver)",
                    endereco: {
                      rua: "Rua",
                      numero: "Número",
                      complemento: "Complemento",
                      bairro: "Bairro",
                      cidade: "Cidade",
                      estado: "Estado",
                      cep: "CEP",
                    },
                    itens: [
                      {
                        id: "ID do item",
                        produtoId: "ID do produto",
                        nome: "Nome do produto",
                        quantidade: "Quantidade",
                        tamanho: "Tamanho (ml)",
                        preco: "Preço unitário",
                        subtotal: "Subtotal do item",
                        imagem: "URL da imagem",
                      },
                    ],
                    rastreamento: {
                      codigo: "Código de rastreamento",
                      transportadora: "Transportadora",
                      status: "Status da entrega",
                      atualizadoEm: "Data da última atualização",
                      historico: [
                        {
                          data: "Data do evento",
                          status: "Status",
                          local: "Local",
                          descricao: "Descrição",
                        },
                      ],
                    },
                    historicoStatus: [
                      {
                        data: "Data da mudança de status",
                        status: "Status",
                        observacao: "Observação",
                      },
                    ],
                    notaFiscal: {
                      numero: "Número da nota fiscal",
                      serie: "Série",
                      dataEmissao: "Data de emissão",
                      url: "URL para download",
                    },
                  }}
                  statusCodes={[
                    { code: 200, description: "Sucesso" },
                    { code: 401, description: "Não autenticado" },
                    { code: 404, description: "Pedido não encontrado" },
                  ]}
                  authentication={true}
                />

                <Separator />

                <ApiEndpoint
                  method="POST"
                  path="/api/pedidos"
                  title="Criar pedido"
                  description="Cria um novo pedido a partir do carrinho atual"
                  requestBody={{
                    enderecoId: "ID do endereço de entrega",
                    formaPagamento: "Forma de pagamento",
                    cupom: "Código do cupom (opcional)",
                    observacoes: "Observações (opcional)",
                    presenteEmbrulho: "Se deve ser embrulhado para presente (opcional)",
                    mensagemPresente: "Mensagem para presente (opcional)",
                  }}
                  responseBody={{
                    success: true,
                    message: "Pedido criado com sucesso",
                    pedido: {
                      id: "ID do pedido",
                      numero: "Número do pedido",
                      status: "Status inicial do pedido",
                      valorTotal: "Valor total",
                      pagamento: {
                        url: "URL para pagamento (se aplicável)",
                        qrCode: "QR Code para pagamento (se aplicável)",
                        boleto: "URL do boleto (se aplicável)",
                        pix: "Dados do PIX (se aplicável)",
                      },
                    },
                  }}
                  statusCodes={[
                    { code: 201, description: "Pedido criado" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 401, description: "Não autenticado" },
                  ]}
                  authentication={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usuários */}
          <TabsContent value="users" className="mt-6 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Usuários
                </CardTitle>
                <CardDescription>Endpoints para gerenciamento de usuários e autenticação.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <ApiEndpoint
                  method="POST"
                  path="/api/auth/register"
                  title="Cadastrar usuário"
                  description="Cria uma nova conta de usuário"
                  requestBody={{
                    nome: "Nome completo",
                    email: "Email",
                    senha: "Senha",
                    telefone: "Telefone (opcional)",
                    dataNascimento: "Data de nascimento (opcional)",
                  }}
                  responseBody={{
                    success: true,
                    message: "Usuário cadastrado com sucesso",
                    user: {
                      id: "ID do usuário",
                      nome: "Nome do usuário",
                      email: "Email do usuário",
                    },
                    token: "Token de acesso (JWT)",
                    refreshToken: "Token de atualização",
                  }}
                  statusCodes={[
                    { code: 201, description: "Usuário criado" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 409, description: "Email já cadastrado" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="POST"
                  path="/api/auth/login"
                  title="Login"
                  description="Autentica um usuário e retorna um token de acesso"
                  requestBody={{
                    email: "Email",
                    senha: "Senha",
                  }}
                  responseBody={{
                    success: true,
                    token: "Token de acesso (JWT)",
                    refreshToken: "Token de atualização",
                    expiresIn: "Tempo de expiração em segundos",
                    user: {
                      id: "ID do usuário",
                      nome: "Nome do usuário",
                      email: "Email do usuário",
                      avatar: "URL do avatar (se disponível)",
                      role: "Papel do usuário (cliente, admin)",
                    },
                  }}
                  statusCodes={[
                    { code: 200, description: "Login bem-sucedido" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 401, description: "Credenciais inválidas" },
                  ]}
                />

                <Separator />

                <ApiEndpoint
                  method="GET"
                  path="/api/usuarios/perfil"
                  title="Obter perfil"
                  description="Retorna os dados do perfil do usuário autenticado"
                  responseBody={{
                    id: "ID do usuário",
                    nome: "Nome completo",
                    email: "Email",
                    telefone: "Telefone",
                    dataNascimento: "Data de nascimento",
                    dataCadastro: "Data de cadastro",
                    avatar: "URL do avatar",
                    enderecos: [
                      {
                        id: "ID do endereço",
                        nome: "Nome do endereço",
                        cep: "CEP",
                        rua: "Rua",
                        numero: "Número",
                        complemento: "Complemento",
                        bairro: "Bairro",
                        cidade: "Cidade",
                        estado: "Estado",
                        principal: "Se é o endereço principal",
                      },
                    ],
                    preferencias: {
                      notificacoes: "Preferências de notificação",
                      newsletter: "Inscrição na newsletter",
                      familiasOlfativasFavoritas: ["Famílias olfativas favoritas"],
                    },
                    estatisticas: {
                      totalPedidos: "Total de pedidos realizados",
                      totalGasto: "Valor total gasto",
                      ultimoAcesso: "Data do último acesso",
                    },
                  }}
                  statusCodes={[
                    { code: 200, description: "Sucesso" },
                    { code: 401, description: "Não autenticado" },
                  ]}
                  authentication={true}
                />

                <Separator />

                <ApiEndpoint
                  method="PUT"
                  path="/api/usuarios/perfil"
                  title="Atualizar perfil"
                  description="Atualiza os dados do perfil do usuário"
                  requestBody={{
                    nome: "Nome completo",
                    telefone: "Telefone",
                    dataNascimento: "Data de nascimento",
                    senhaAtual: "Senha atual (se for alterar a senha)",
                    novaSenha: "Nova senha (opcional)",
                    avatar: "URL do avatar (opcional)",
                    preferencias: {
                      notificacoes: "Preferências de notificação",
                      newsletter: "Inscrição na newsletter",
                      familiasOlfativasFavoritas: ["Famílias olfativas favoritas"],
                    },
                  }}
                  responseBody={{
                    success: true,
                    message: "Perfil atualizado com sucesso",
                    user: {
                      id: "ID do usuário",
                      nome: "Nome atualizado",
                      email: "Email",
                      telefone: "Telefone atualizado",
                      dataNascimento: "Data de nascimento atualizada",
                      avatar: "URL do avatar atualizado",
                    },
                  }}
                  statusCodes={[
                    { code: 200, description: "Perfil atualizado" },
                    { code: 400, description: "Dados inválidos" },
                    { code: 401, description: "Não autenticado ou senha atual incorreta" },
                  ]}
                  authentication={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Promoções */}
          <TabsContent value="promotions" className="mt-6 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-primary" />
                  Promoções
                </CardTitle>
                <CardDescription>Endpoints para consulta de produtos em promoção.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <ApiEndpointsPromocoes />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cupons */}
          <TabsContent value="coupons" className="mt-6 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-primary" />
                  Cupons
                </CardTitle>
                <CardDescription>Endpoints para gerenciamento de cupons de desconto.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <ApiEndpointsCupons />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pagamentos */}
          <TabsContent value="payment" className="mt-6 space-y-8">
            <Card className="border-none shadow-sm">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Pagamentos
                </CardTitle>
                <CardDescription>Endpoints para processamento de pagamentos.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <ApiEndpointsPagamentos />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outros conteúdos de abas... */}
        </Tabs>
      </motion.div>
    </div>
  )
}

