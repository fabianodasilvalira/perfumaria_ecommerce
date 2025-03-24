import { ApiEndpoint } from "@/components/api-endpoint"
import { Separator } from "@/components/ui/separator"

export function ApiEndpointsPromocoes() {
  return (
    <>
      <ApiEndpoint
        method="GET"
        path="/api/promocoes"
        title="Listar produtos em promoção"
        description="Retorna uma lista de produtos com desconto ativo"
        queryParams={{
          page: "Número da página (padrão: 1)",
          limit: "Itens por página (padrão: 20, max: 50)",
          minDiscount: "Desconto mínimo em percentual (opcional)",
          maxDiscount: "Desconto máximo em percentual (opcional)",
          category: "Filtrar por categoria (opcional)",
          brand: "Filtrar por marca (opcional)",
          sort: "Ordenação (discount_desc, discount_asc, price_asc, price_desc)",
        }}
        responseBody={{
          products: [
            {
              id: "ID do produto",
              name: "Nome do produto",
              description: "Descrição curta",
              originalPrice: "Preço original",
              discountedPrice: "Preço com desconto",
              discountPercentage: "Percentual de desconto",
              category: "Categoria",
              brand: "Marca",
              images: ["URLs das imagens"],
              rating: "Avaliação média",
            },
          ],
          pagination: {
            total: "Total de produtos",
            pages: "Total de páginas",
            page: "Página atual",
            limit: "Itens por página",
          },
        }}
        statusCodes={[{ code: 200, description: "Sucesso" }]}
      />

      <Separator className="my-6" />

      <ApiEndpoint
        method="GET"
        path="/api/promocoes/{id}"
        title="Obter produto em promoção"
        description="Retorna os detalhes de um produto específico em promoção"
        pathParams={{
          id: "ID do produto",
        }}
        responseBody={{
          id: "ID do produto",
          name: "Nome do produto",
          description: "Descrição curta",
          fullDescription: "Descrição completa",
          originalPrice: "Preço original",
          discountedPrice: "Preço com desconto",
          discountPercentage: "Percentual de desconto",
          discountStartDate: "Data de início da promoção",
          discountEndDate: "Data de término da promoção (opcional)",
          category: "Categoria",
          brand: "Marca",
          images: ["URLs das imagens"],
          rating: "Avaliação média",
          reviewCount: "Número de avaliações",
          stock: {
            "50ml": "Quantidade em estoque",
            "100ml": "Quantidade em estoque",
          },
        }}
        statusCodes={[
          { code: 200, description: "Sucesso" },
          { code: 404, description: "Produto não encontrado" },
        ]}
      />
    </>
  )
}

