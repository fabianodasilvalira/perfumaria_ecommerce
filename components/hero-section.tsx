import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 py-10 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 md:gap-10 items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Descubra sua fragrância ideal
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Perfumes exclusivos que combinam com sua personalidade. Fragrâncias únicas para momentos especiais.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Button size="lg" asChild>
                  <Link href="/produtos?categoria=feminino">Perfumes Femininos</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/produtos?categoria=masculino">Perfumes Masculinos</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1615104100945-249c3c0d55cb?q=80&w=1000&auto=format&fit=crop"
                alt="Coleção de perfumes"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center">
                <div className="text-center p-6 bg-background/80 rounded-lg backdrop-blur-sm">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Novidades</h2>
                  <p className="text-muted-foreground mb-4">Fragrâncias recém-chegadas</p>
                  <Button variant="secondary" asChild>
                    <Link href="/produtos?ordenar=novidades">Ver Lançamentos</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

