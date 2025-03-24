"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Play, Copy } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface ApiPlaygroundProps {
  method: string
  path: string
  requestBody?: Record<string, any>
}

export function ApiPlayground({ method, path, requestBody }: ApiPlaygroundProps) {
  const [url, setUrl] = useState(`https://api.essence.com.br${path}`)
  const [body, setBody] = useState(requestBody ? JSON.stringify(requestBody, null, 2) : "")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendRequest = async () => {
    setLoading(true)
    setResponse("Enviando requisição...")

    try {
      // Simulação de uma requisição
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Resposta simulada
      const simulatedResponse = {
        success: true,
        data: requestBody || { message: "Requisição processada com sucesso" },
        timestamp: new Date().toISOString(),
      }

      setResponse(JSON.stringify(simulatedResponse, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({ error: "Erro ao processar a requisição" }, null, 2))
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado para a área de transferência",
      description: "O conteúdo foi copiado com sucesso.",
    })
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>API Playground</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="request" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="request">Requisição</TabsTrigger>
            <TabsTrigger value="response">Resposta</TabsTrigger>
          </TabsList>

          <TabsContent value="request" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <div className="flex gap-2">
                <div className="bg-muted px-3 py-2 rounded-md font-mono text-sm">{method}</div>
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="font-mono text-sm flex-1"
                />
              </div>
            </div>

            {(method === "POST" || method === "PUT" || method === "PATCH") && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="body">Corpo da Requisição</Label>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(body)}>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copiar
                  </Button>
                </div>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="font-mono text-sm min-h-[200px]"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="response" className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Resposta</Label>
                {response && (
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(response)}>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copiar
                  </Button>
                )}
              </div>
              <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto whitespace-pre">
                {response || "Nenhuma resposta ainda. Clique em 'Enviar Requisição' para testar."}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSendRequest} disabled={loading} className="gap-2">
          <Play className="h-4 w-4" />
          {loading ? "Enviando..." : "Enviar Requisição"}
        </Button>
      </CardFooter>
    </Card>
  )
}

