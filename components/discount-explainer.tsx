import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

interface DiscountExplainerProps {
  originalPrice: number
  discountPercentage: number
}

export function DiscountExplainer({ originalPrice, discountPercentage }: DiscountExplainerProps) {
  const discountAmount = originalPrice * (discountPercentage / 100)
  const finalPrice = originalPrice - discountAmount

  return (
    <Card>
      <CardHeader>
        <CardTitle>Como calculamos seu desconto</CardTitle>
        <CardDescription>Entenda como o valor do desconto é aplicado ao produto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Preço original</TableCell>
              <TableCell className="text-right">R$ {originalPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Desconto ({discountPercentage}%)</TableCell>
              <TableCell className="text-right text-red-600">- R$ {discountAmount.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow className="font-medium">
              <TableCell>Preço final</TableCell>
              <TableCell className="text-right">R$ {finalPrice.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Separator />

        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Fórmula do cálculo:</strong>
          </p>
          <p>Valor do desconto = Preço original × (Percentual de desconto ÷ 100)</p>
          <p>Preço final = Preço original - Valor do desconto</p>
          <p className="mt-4">
            Exemplo: Para um produto de R$ {originalPrice.toFixed(2)} com {discountPercentage}% de desconto:
          </p>
          <p>
            Valor do desconto = R$ {originalPrice.toFixed(2)} × ({discountPercentage} ÷ 100) = R${" "}
            {discountAmount.toFixed(2)}
          </p>
          <p>
            Preço final = R$ {originalPrice.toFixed(2)} - R$ {discountAmount.toFixed(2)} = R$ {finalPrice.toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

