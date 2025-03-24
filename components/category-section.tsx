import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function CategorySection() {
  const categories = [
    {
      id: "masculino",
      name: "Masculinos",
      description: "Fragrâncias marcantes e sofisticadas",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "feminino",
      name: "Femininos",
      description: "Perfumes delicados e envolventes",
      image: "https://images.unsplash.com/photo-1588405748880-b434362febd6?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "unissex",
      name: "Unissex",
      description: "Aromas versáteis para todos",
      image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: "kits",
      name: "Kits",
      description: "Conjuntos perfeitos para presente",
      image: "https://images.unsplash.com/photo-1585652757141-8837d676fac8?q=80&w=500&auto=format&fit=crop",
    },
  ]

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold tracking-tight">Categorias</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={
              category.id === "masculino"
                ? "/masculinos"
                : category.id === "feminino"
                  ? "/femininos"
                  : category.id === "unissex"
                    ? "/unissex"
                    : `/produtos?categoria=${category.id}`
            }
          >
            <Card className="overflow-hidden h-full transition-all hover:shadow-md">
              <div className="aspect-square relative bg-muted">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <CardContent className="p-4 text-white">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-white/80 mt-1">{category.description}</p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

