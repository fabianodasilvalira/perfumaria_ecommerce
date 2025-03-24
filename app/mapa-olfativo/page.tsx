import { ScentMap } from "@/components/scent-map"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Mapa Olfativo | Essence - Loja de Perfumes",
  description: "Explore perfumes por suas notas olfativas e descubra novas fragrâncias que combinam com seu gosto",
}

export default function ScentMapPage() {
  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Mapa Olfativo</h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Explore perfumes por suas notas olfativas e descubra novas fragrâncias que combinam com seu gosto. Clique
            nas famílias olfativas para ver perfumes relacionados.
          </p>
        </div>

        <Separator />

        <ScentMap />
      </div>
    </div>
  )
}

