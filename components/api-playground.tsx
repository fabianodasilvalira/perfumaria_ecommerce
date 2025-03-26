"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Play, Copy } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ApiPlaygroundProps {
  method: string
  path: string
  requestBody?: Record<string, any>
}

export function ApiPlayground({ method, path, requestBody }: ApiPlaygroundProps) {
  const [requestData, setRequestData] = useState(requestBody ? JSON.stringify(requestBody, null, 2) : "{}")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado para a área de transferência",
      description: "O conteúdo foi copiado com sucesso.",
    })
  }

  const executeRequest = async () => {
    setIsLoading(true)
    setResponse("")

    try {
      // Simular uma requisição
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Resposta simulada
      const mockResponse = {
        success: true,
        timestamp: new Date().toISOString(),
        data: { message: "Esta é uma resposta simulada para fins de demonstração" },
      }

      setResponse(JSON.stringify(mockResponse, null, 2))
    } catch (error) {
      setResponse(JSON.stringify({ error: "Erro ao executar a requisição" }, null, 2))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium">Corpo da Requisição</h4>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 hover:bg-primary/10 hover:text-primary transition-colors"
            onClick={() => handleCopy(requestData)}
          >
            <Copy className="h-3.5 w-3.5 mr-1" />
            Copiar
          </Button>
        </div>
        <Card>
          <CardContent className="p-4">
            <Textarea
              value={requestData}
              onChange={(e) => setRequestData(e.target.value)}
              className="font-mono text-xs min-h-[150px]"
              placeholder="Digite o corpo da requisição em formato JSON"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={executeRequest} disabled={isLoading} className="gap-2">
          <Play className="h-4 w-4" />
          {isLoading ? "Executando..." : "Executar Requisição"}
        </Button>
      </div>

      {response && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Resposta</h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 hover:bg-primary/10 hover:text-primary transition-colors"
              onClick={() => handleCopy(response)}
            >
              <Copy className="h-3.5 w-3.5 mr-1" />
              Copiar
            </Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <pre className="text-xs bg-muted p-2 rounded-md overflow-x-auto whitespace-pre-wrap">{response}</pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

