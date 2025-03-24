import { ApiEndpoint } from "@/components/api-endpoint"
import { Separator } from "@/components/ui/separator"

export function ApiEndpointsCupons() {
  return (
    <>
      <ApiEndpoint
        method="GET"
        path="/api/cupons"
        title="Listar cupons disponíveis"
        description="Retorna uma lista de cupons de desconto ativos"
        queryParams={{
          page: "Número da página (padrão: 1)",
          limit: "Itens por página (padrão: 20, max: 50)",
          type: "Tipo de cupom (percentage, fixed) (opcional)",
          minValue: "Valor mínimo do desconto (opcional)",
          maxValue: "Valor máximo do desconto (opcional)",
        }}
        responseBody={{
          coupons: [
            {
              id: "ID do cupom",
              code: "Código do cupom",
              type: "Tipo (percentage, fixed)",
              value: "Valor do desconto",
              minPurchase: "Valor mínimo de compra",
              startDate: "Data de início",
              endDate: "Data de término",
              usesLeft: "Usos restantes",
              description: "Descrição do cupom",
            },
          ],
          pagination: {
            total: "Total de cupons",
            pages: "Total de páginas",
            page: "Página atual",
            limit: "Itens por página",
          },
        }}
        statusCodes={[
          { code: 200, description: "Sucesso" },
          { code: 401, description: "Não autenticado" },
        ]}
        authentication={true}
      />

      <Separator className="my-6" />

      <ApiEndpoint
        method="GET"
        path="/api/cupons/{code}"
        title="Verificar cupom"
        description="Verifica a validade de um cupom de desconto"
        pathParams={{
          code: "Código do cupom",
        }}
        responseBody={{
          valid: "Se o cupom é válido",
          coupon: {
            id: "ID do cupom",
            code: "Código do cupom",
            type: "Tipo (percentage, fixed)",
            value: "Valor do desconto",
            minPurchase: "Valor mínimo de compra",
            description: "Descrição do cupom",
            validUntil: "Data de validade",
          },
          message: "Mensagem informativa (em caso de erro)",
        }}
        statusCodes={[
          { code: 200, description: "Cupom válido" },
          { code: 400, description: "Cupom inválido ou expirado" },
          { code: 404, description: "Cupom não encontrado" },
        ]}
      />

      <Separator className="my-6" />

      <ApiEndpoint
        method="POST"
        path="/api/cupons/apply"
        title="Aplicar cupom"
        description="Aplica um cupom de desconto ao carrinho"
        requestBody={{
          code: "Código do cupom",
          cartId: "ID do carrinho (opcional)",
        }}
        responseBody={{
          success: "Se o cupom foi aplicado com sucesso",
          discount: "Valor do desconto aplicado",
          cart: {
            subtotal: "Valor subtotal",
            discount: "Valor do desconto",
            total: "Valor total após desconto",
            items: ["Itens do carrinho"],
          },
          message: "Mensagem informativa",
        }}
        statusCodes={[
          { code: 200, description: "Cupom aplicado com sucesso" },
          { code: 400, description: "Cupom inválido ou não aplicável" },
          { code: 401, description: "Não autenticado" },
          { code: 404, description: "Cupom não encontrado" },
        ]}
        authentication={true}
      />
    </>
  )
}

