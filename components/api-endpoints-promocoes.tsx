import { ApiEndpoint } from "@/components/api-endpoint"

export function ApiEndpointsPromocoes() {
  return (
    <>
      <ApiEndpoint
        method="GET"
        path="/api/promocoes"
        title="Listar promoções"
        description="Retorna a lista de promoções ativas"
        queryParams={{
          page: "Número da página (padrão: 1)",
          limit: "Itens por página (padrão: 20)",
          ativas: "Filtrar por status (true/false)",
        }}
        responseBody={{
          promocoes: [
            {
              id: "ID da promoção",
              nome: "Nome da promoção",
              descricao: "Descrição da promoção",
              tipoDesconto: "Tipo de desconto (percentual, valor_fixo)",
              valorDesconto: "Valor do desconto",
              dataInicio: "Data de início",
              dataFim: "Data de término (se houver)",
              ativa: "Status da promoção",
              produtos: ["IDs dos produtos em promoção"],
              categorias: ["Categorias em promoção"],
            },
          ],
          paginacao: {
            total: "Total de promoções",
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

      <ApiEndpoint
        method="POST"
        path="/api/promocoes"
        title="Criar promoção"
        description="Cria uma nova promoção"
        requestBody={{
          nome: "Nome da promoção",
          descricao: "Descrição da promoção",
          tipoDesconto: "Tipo de desconto (percentual, valor_fixo)",
          valorDesconto: "Valor do desconto",
          dataInicio: "Data de início (formato ISO)",
          dataFim: "Data de término (opcional, formato ISO)",
          ativa: "Status inicial da promoção (true/false)",
          produtos: ["IDs dos produtos em promoção (opcional)"],
          categorias: ["Categorias em promoção (opcional)"],
        }}
        responseBody={{
          id: "ID da promoção criada",
          nome: "Nome da promoção",
          descricao: "Descrição da promoção",
          tipoDesconto: "Tipo de desconto",
          valorDesconto: "Valor do desconto",
          dataInicio: "Data de início",
          dataFim: "Data de término",
          ativa: "Status da promoção",
          produtos: ["IDs dos produtos aplicados"],
          categorias: ["Categorias aplicadas"],
        }}
        statusCodes={[
          { code: 201, description: "Promoção criada" },
          { code: 400, description: "Dados inválidos" },
          { code: 401, description: "Não autenticado" },
          { code: 403, description: "Não autorizado" },
        ]}
        authentication={true}
        adminOnly={true}
        requiredFields={["nome", "descricao", "tipoDesconto", "valorDesconto", "dataInicio"]}
      />
    </>
  )
}

