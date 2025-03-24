import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Map } from "lucide-react"

export function ScentMapPromo() {
  return (
    <section className="container px-4 md:px-6">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 p-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Explore o Mapa Olfativo</h2>
            <p className="text-muted-foreground max-w-[500px]">
              Descubra perfumes por famílias olfativas e encontre fragrâncias que combinam com seu gosto de forma visual
              e interativa.
            </p>
          </div>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/mapa-olfativo">
              <Map className="h-4 w-4" />
              Explorar Mapa
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

