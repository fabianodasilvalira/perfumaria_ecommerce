import { ApiEndpoint } from "@/components/api-endpoint"

export function ApiEndpointsPagamentos() {
  return (
    <>
      <ApiEndpoint
        method="POST"
        path="/api/pagamentos/processar"
        title="Processar pagamento"
        description="Processa o pagamento de um pedido"
        requestBody={{
          pedidoId: "ID do pedido",
          metodoPagamento: "Método de pagamento (cartao, boleto, pix)",
          dadosPagamento: {
            cartao: {
              numero: "Número do cartão",
              nome: "Nome no cartão",
              validade: "Data de validade",
              cvv: "Código de segurança",
              parcelas: "Número de parcelas",
            },
          },
        }}
        responseBody={{
          success: true,
          transacaoId: "ID da transação",
          status: "Status do pagamento",
          mensagem: "Mensagem de retorno",
          dadosPagamento: {
            url: "URL para pagamento (boleto/pix)",
            qrCode: "QR Code para PIX",
            codigoBarras: "Código de barras do boleto",
            dataVencimento: "Data de vencimento do boleto",
          },
        }}
        statusCodes={[
          { code: 200, description: "Pagamento processado" },
          { code: 400, description: "Dados inválidos" },
          { code: 401, description: "Não autenticado" },
          { code: 404, description: "Pedido não encontrado" },
          { code: 422, description: "Erro no processamento do pagamento" },
        ]}
        authentication={true}
        requiredFields={["pedidoId", "metodoPagamento"]}
      />

      <ApiEndpoint
        method="GET"
        path="/api/pagamentos/status/{transacaoId}"
        title="Verificar status do pagamento"
        description="Verifica o status atual de uma transação de pagamento"
        pathParams={{
          transacaoId: "ID da transação",
        }}
        responseBody={{
          transacaoId: "ID da transação",
          pedidoId: "ID do pedido relacionado",
          status: "Status do pagamento",
          metodoPagamento: "Método de pagamento utilizado",
          valor: "Valor da transação",
          dataProcessamento: "Data de processamento",
          detalhes: {
            autorizacao: "Código de autorização",
            bandeira: "Bandeira do cartão (se aplicável)",
            parcelas: "Número de parcelas (se aplicável)",
            ultimosDigitos: "Últimos dígitos do cartão (se aplicável)",
          },
        }}
        statusCodes={[
          { code: 200, description: "Sucesso" },
          { code: 401, description: "Não autenticado" },
          { code: 404, description: "Transação não encontrada" },
        ]}
        authentication={true}
      />

      <ApiEndpoint
        method="POST"
        path="/api/pagamentos/reembolso"
        title="Solicitar reembolso"
        description="Solicita o reembolso de um pagamento"
        requestBody={{
          transacaoId: "ID da transação",
          motivo: "Motivo do reembolso",
          valorReembolso: "Valor a ser reembolsado (opcional, padrão: valor total)",
          observacoes: "Observações adicionais",
        }}
        responseBody={{
          success: true,
          reembolsoId: "ID do reembolso",
          status: "Status do reembolso",
          valorReembolsado: "Valor a ser reembolsado",
          dataProcessamento: "Data de processamento",
          previsaoReembolso: "Previsão para o reembolso",
        }}
        statusCodes={[
          { code: 200, description: "Reembolso solicitado" },
          { code: 400, description: "Dados inválidos" },
          { code: 401, description: "Não autenticado" },
          { code: 404, description: "Transação não encontrada" },
          { code: 422, description: "Erro no processamento do reembolso" },
        ]}
        authentication={true}
        requiredFields={["transacaoId", "motivo"]}
      />
    </>
  )
}

