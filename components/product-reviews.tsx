import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  // Normalmente, você buscaria as avaliações do produto com base no ID
  const reviews = [
    {
      id: "1",
      author: "Maria Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "2 semanas atrás",
      rating: 5,
      content:
        "Perfume maravilhoso! A fragrância é exatamente como descrita e dura o dia todo. Embalagem elegante e entrega rápida. Recomendo muito!",
    },
    {
      id: "2",
      author: "João Santos",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "1 mês atrás",
      rating: 4,
      content:
        "Gostei bastante do perfume, tem um aroma agradável e sofisticado. A fixação é boa, mas poderia durar um pouco mais. No geral, estou satisfeito com a compra.",
    },
    {
      id: "3",
      author: "Ana Oliveira",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "3 meses atrás",
      rating: 5,
      content:
        "Simplesmente perfeito! Recebo muitos elogios quando uso. A fragrância é única e marcante, exatamente o que eu procurava.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Avaliações dos Clientes</h3>
        <Button size="sm">Escrever Avaliação</Button>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b last:border-0">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="font-medium">{review.author}</h4>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                  </div>
                </div>
                <p className="mt-2 text-sm">{review.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline">Ver Mais Avaliações</Button>
      </div>
    </div>
  )
}

