import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function QuizBanner() {
  return (
    <section className="container px-4 md:px-6">
      <div className="relative overflow-hidden rounded-lg bg-primary/10 p-8">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592945403486-a0f38c51e80e?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Não sabe qual perfume escolher?</h2>
            <p className="text-muted-foreground max-w-[500px]">
              Responda algumas perguntas simples e descubra o perfume perfeito para você ou para presentear alguém
              especial.
            </p>
          </div>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/quiz">
              <Sparkles className="h-4 w-4" />
              Fazer o Quiz
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

