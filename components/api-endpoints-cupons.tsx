import { ApiEndpoint } from "@/components/api-endpoint"

export function ApiEndpointsCupons() {
  return (
    <>
      <ApiEndpoint
        method="GET"
        path="/api/cupons"
        title="Listar cupons"
        description="Retorna a lista de cupons disponíveis (apenas para administradores)"
        queryParams={{
          page: "Número da página (padrão: 1)",
          limit: "Itens por página (padrão: 20)",
          ativos: "Filtrar por status (true/false)",
        }}
        responseBody={{
          cupons: [
            {
              id: "ID do cupom",
              codigo: "Código do cupom",
              descricao: "Descrição do cupom",
              tipoDesconto: "Tipo de desconto (percentual, valor_fixo)",
              valorDesconto: "Valor do desconto",
              valorMinimo: "Valor mínimo de compra (se houver)",
              usoMaximo: "Número máximo de usos",
              usosRealizados: "Número de usos realizados",
              dataInicio: "Data de início",
              dataFim: "Data de término (se houver)",
              ativo: "Status do cupom",
            },
          ],
          paginacao: {
            total: "Total de cupons",
            pagina: "Página atual",
            totalPaginas: "Total de páginas",
          },
        }}
        statusCodes={[
          { code: 200, description: "Sucesso" },
          { code: 401, description: "Não autenticado" },
          { code: 403, description: "Não autorizado" },
        ]}
        authentication={true}
        adminOnly={true}
      />

      <ApiEndpoint
        method="POST"
        path="/api/cupons"
        title="Criar cupom"
        description="Cria um novo cupom de desconto"
        requestBody={{
          codigo: "Código do cupom",
          descricao: "Descrição do cupom",
          tipoDesconto: "Tipo de desconto (percentual, valor_fixo)",
          valorDesconto: "Valor do desconto",
          valorMinimo: "Valor mínimo de compra (opcional)",
          usoMaximo: "Número máximo de usos (opcional)",
          dataInicio: "Data de início (formato ISO)",
          dataFim: "Data de término (opcional, formato ISO)",
          ativo: "Status inicial do cupom (true/false)",
        }}
        responseBody={{
          id: "ID do cupom criado",
          codigo: "Código do cupom",
          descricao: "Descrição do cupom",
          tipoDesconto: "Tipo de desconto",
          valorDesconto: "Valor do desconto",
          valorMinimo: "Valor mínimo de compra",
          usoMaximo: "Número máximo de usos",
          usosRealizados: 0,
          dataInicio: "Data de início",
          dataFim: "Data de término",
          ativo: "Status do cupom",
        }}
        statusCodes={[
          { code: 201, description: "Cupom criado" },
          { code: 400, description: "Dados inválidos" },
          { code: 401, description: "Não autenticado" },
          { code: 403, description: "Não autorizado" },
          { code: 409, description: "Código de cupom já existe" },
        ]}
        authentication={true}
        adminOnly={true}
        requiredFields={["codigo", "descricao", "tipoDesconto", "valorDesconto", "dataInicio"]}
      />

      <ApiEndpoint
        method="GET"
        path="/api/cupons/validar/{codigo}"
        title="Validar cupom"
        description="Verifica se um cupom é válido e retorna suas informações"
        pathParams={{
          codigo: "Código do cupom",
        }}
        queryParams={{
          valorCompra: "Valor total da compra (para validar valor mínimo)",
        }}
        responseBody={{
          valido: "Se o cupom é válido",
          cupom: {
            codigo: "Código do cupom",
            descricao: "Descrição do cupom",
            tipoDesconto: "Tipo de desconto",
            valorDesconto: "Valor do desconto",
            valorMinimo: "Valor mínimo de compra",
          },
          valorDescontoCalculado: "Valor do desconto calculado com base no valor da compra",
          mensagem: "Mensagem informativa (em caso de cupom inválido)",
        }}
        statusCodes={[
          { code: 200, description: "Sucesso" },
          { code: 400, description: "Parâmetros inválidos" },
          { code: 404, description: "Cupom não encontrado" },
        ]}
      />
    </>
  )
}

