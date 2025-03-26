"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion } from "framer-motion"

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="grid gap-6">
      <h2 className="text-2xl font-bold tracking-tight">Categorias</h2>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Link
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
              <Card className="overflow-hidden h-full transition-all hover:shadow-lg group">
                <div className="aspect-square relative bg-muted">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <CardContent className="p-4 text-white relative z-10">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-sm text-white/90 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {category.description}
                      </p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

