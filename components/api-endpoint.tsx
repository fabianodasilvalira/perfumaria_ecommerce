"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronRight, Copy, ExternalLink, Lock, Play } from "lucide-react"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { ApiPlayground } from "./api-playground"

interface ApiEndpointProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  path: string
  title: string
  description: string
  pathParams?: Record<string, string>
  queryParams?: Record<string, string>
  requestBody?: Record<string, any>
  responseBody?: Record<string, any>
  statusCodes: Array<{ code: number; description: string }>
  authentication?: boolean
  adminOnly?: boolean
}

export function ApiEndpoint({
  method,
  path,
  title,
  description,
  pathParams,
  queryParams,
  requestBody,
  responseBody,
  statusCodes,
  authentication = false,
  adminOnly = false,
}: ApiEndpointProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [showPlayground, setShowPlayground] = useState(false)

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-500"
      case "POST":
        return "bg-green-500"
      case "PUT":
        return "bg-amber-500"
      case "DELETE":
        return "bg-red-500"
      case "PATCH":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusCodeColor = (code: number) => {
    if (code >= 200 && code < 300) return "bg-green-500"
    if (code >= 300 && code < 400) return "bg-blue-500"
    if (code >= 400 && code < 500) return "bg-amber-500"
    if (code >= 500) return "bg-red-500"
    return "bg-gray-500"
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado para a área de transferência",
      description: "O conteúdo foi copiado com sucesso.",
    })
  }

  // Gera um exemplo de código para a requisição
  const generateRequestExample = () => {
    let url = `https://api.essence.com.br${path}`

    // Substitui parâmetros de caminho por valores de exemplo
    if (pathParams) {
      Object.keys(pathParams).forEach((param) => {
        url = url.replace(`{${param}}`, `exemplo-${param}`)
      })
    }

    // Adiciona parâmetros de consulta se existirem
    if (queryParams && Object.keys(queryParams).length > 0) {
      url += "?"
      url += Object.keys(queryParams)
        .map((key, index) => `${index > 0 ? "&" : ""}${key}=valor-exemplo`)
        .join("")
    }

    let code = `// Usando fetch\n`
    code += `const options = {\n`
    code += `  method: "${method}",\n`

    if (authentication) {
      code += `  headers: {\n`
      code += `    "Authorization": "Bearer seu-token-aqui",\n`
      if (requestBody) {
        code += `    "Content-Type": "application/json"\n`
      }
      code += `  },\n`
    } else if (requestBody) {
      code += `  headers: {\n`
      code += `    "Content-Type": "application/json"\n`
      code += `  },\n`
    }

    if (requestBody) {
      code += `  body: JSON.stringify(${JSON.stringify(requestBody, null, 2)})\n`
    }

    code += `};\n\n`
    code += `fetch("${url}", options)\n`
    code += `  .then(response => response.json())\n`
    code += `  .then(data => console.log(data))\n`
    code += `  .catch(error => console.error("Erro:", error));`

    return code
  }

  return (
    <div className="space-y-2 border rounded-lg p-4 bg-card">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Badge className={`${getMethodColor(method)} font-mono`}>{method}</Badge>
            <h3 className="text-lg font-semibold">{title}</h3>
            {authentication && (
              <Badge variant="outline" className="gap-1">
                <Lock className="h-3 w-3" />
                Auth
              </Badge>
            )}
            {adminOnly && <Badge variant="destructive">Admin</Badge>}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              {isOpen ? "Ocultar detalhes" : "Ver detalhes"}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </div>

      <div className="flex items-center justify-between font-mono text-sm bg-muted p-2 rounded-md overflow-x-auto">
        <code className="text-xs md:text-sm">{path}</code>
        <Button variant="ghost" size="sm" className="h-8" onClick={() => copyToClipboard(path)}>
          <Copy className="h-3.5 w-3.5" />
        </Button>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleContent className="space-y-4 mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="parameters">Parâmetros</TabsTrigger>
              <TabsTrigger value="responses">Respostas</TabsTrigger>
              <TabsTrigger value="code">Código</TabsTrigger>
            </TabsList>

            {/* Visão Geral */}
            <TabsContent value="overview" className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Descrição</h4>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm">{description}</p>
                    {authentication && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                        <Lock className="h-4 w-4" />
                        <span>Este endpoint requer autenticação.</span>
                      </div>
                    )}
                    {adminOnly && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                        <span>Este endpoint é restrito a administradores.</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Códigos de Status</h4>
                <Card>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      {statusCodes.map((status) => (
                        <li key={status.code} className="flex items-center gap-2">
                          <Badge className={`${getStatusCodeColor(status.code)} font-mono`}>{status.code}</Badge>
                          <span className="text-sm text-muted-foreground">{status.description}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Parâmetros */}
            <TabsContent value="parameters" className="space-y-4">
              {pathParams && Object.keys(pathParams).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Parâmetros de URL</h4>
                  <Card>
                    <CardContent className="p-4">
                      <ul className="space-y-2">
                        {Object.entries(pathParams).map(([key, value]) => (
                          <li key={key} className="grid grid-cols-3 gap-2">
                            <span className="font-mono text-sm">{key}</span>
                            <span className="col-span-2 text-sm text-muted-foreground">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {queryParams && Object.keys(queryParams).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Parâmetros de Consulta</h4>
                  <Card>
                    <CardContent className="p-4">
                      <ul className="space-y-2">
                        {Object.entries(queryParams).map(([key, value]) => (
                          <li key={key} className="grid grid-cols-3 gap-2">
                            <span className="font-mono text-sm">{key}</span>
                            <span className="col-span-2 text-sm text-muted-foreground">{value}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {requestBody && Object.keys(requestBody).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Corpo da Requisição</h4>
                  <Card>
                    <CardContent className="p-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(JSON.stringify(requestBody, null, 2))}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                        {JSON.stringify(requestBody, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}

              {(!pathParams || Object.keys(pathParams).length === 0) &&
                (!queryParams || Object.keys(queryParams).length === 0) &&
                (!requestBody || Object.keys(requestBody).length === 0) && (
                  <div className="text-center py-4 text-muted-foreground">Este endpoint não requer parâmetros.</div>
                )}
            </TabsContent>

            {/* Respostas */}
            <TabsContent value="responses" className="space-y-4">
              {responseBody && Object.keys(responseBody).length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Resposta de Sucesso</h4>
                  <Card>
                    <CardContent className="p-4 relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(JSON.stringify(responseBody, null, 2))}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto">
                        {JSON.stringify(responseBody, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </div>
              )}

              {(!responseBody || Object.keys(responseBody).length === 0) && (
                <div className="text-center py-4 text-muted-foreground">
                  Não há exemplo de resposta disponível para este endpoint.
                </div>
              )}
            </TabsContent>

            {/* Código */}
            <TabsContent value="code" className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Exemplo de Código</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8"
                    onClick={() => copyToClipboard(generateRequestExample())}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copiar
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-4">
                    <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto whitespace-pre-wrap">
                      {generateRequestExample()}
                    </pre>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 mr-2"
                  onClick={() => window.open("https://www.postman.com", "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                  Testar no Postman
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setShowPlayground(!showPlayground)}
                >
                  <Play className="h-4 w-4" />
                  {showPlayground ? "Ocultar Playground" : "Testar no Playground"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {showPlayground && <ApiPlayground method={method} path={path} requestBody={requestBody} />}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

