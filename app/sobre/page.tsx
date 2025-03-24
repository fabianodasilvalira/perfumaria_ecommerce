import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata = {
  title: "Quem Somos | Essence - Loja de Perfumes",
  description: "Conheça a história e os valores da Essence, sua loja especializada em perfumes de alta qualidade",
}

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Ana Oliveira",
      role: "Fundadora e CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
      description:
        "Apaixonada por fragrâncias desde jovem, Ana fundou a Essence com a missão de trazer perfumes exclusivos para o Brasil.",
    },
    {
      name: "Carlos Santos",
      role: "Diretor Criativo",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
      description:
        "Com mais de 15 anos de experiência no mercado de perfumaria, Carlos lidera o desenvolvimento de novas fragrâncias.",
    },
    {
      name: "Mariana Costa",
      role: "Especialista em Fragrâncias",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
      description:
        "Formada em química e especialista em perfumaria, Mariana é responsável pela curadoria das fragrâncias da Essence.",
    },
  ]

  return (
    <div className="container px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-8 md:gap-12">
        <section>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Quem Somos</h1>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Conheça a história da Essence, uma empresa dedicada a oferecer as melhores fragrâncias para nossos clientes.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Nossa História</h2>
              <p>
                Fundada em 2015, a Essence nasceu da paixão por fragrâncias e da vontade de oferecer perfumes de alta
                qualidade a preços acessíveis. O que começou como uma pequena loja em São Paulo, hoje se tornou uma
                referência no mercado de perfumaria no Brasil.
              </p>
              <p>
                Nossa jornada começou quando Ana Oliveira, após anos trabalhando no mercado de luxo internacional,
                decidiu trazer sua experiência e conhecimento para criar uma marca que valorizasse a arte da perfumaria,
                mas que fosse acessível ao público brasileiro.
              </p>
              <p>
                Ao longo dos anos, expandimos nossa presença para as principais capitais do país e desenvolvemos um
                e-commerce que atende todo o território nacional, sempre mantendo nosso compromisso com a qualidade e a
                excelência no atendimento.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1470309864661-68328b2cd0a5?q=80&w=600&auto=format&fit=crop"
                alt="Nossa loja"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-6">Nossos Valores</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">Qualidade</h3>
                  <p className="text-muted-foreground">
                    Trabalhamos apenas com as melhores matérias-primas e fragrâncias, garantindo produtos de alta
                    qualidade.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">Sustentabilidade</h3>
                  <p className="text-muted-foreground">
                    Comprometidos com práticas sustentáveis, desde a produção até a embalagem e logística.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">Inovação</h3>
                  <p className="text-muted-foreground">
                    Buscamos constantemente novas fragrâncias e tendências para oferecer o melhor aos nossos clientes.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">Transparência</h3>
                  <p className="text-muted-foreground">
                    Acreditamos em relações transparentes com nossos clientes, fornecedores e colaboradores.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">Acessibilidade</h3>
                  <p className="text-muted-foreground">
                    Democratizamos o acesso a perfumes de qualidade, com preços justos e opções para todos os gostos.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-medium">Excelência</h3>
                  <p className="text-muted-foreground">
                    Buscamos a excelência em tudo o que fazemos, do atendimento à entrega do produto.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-2xl font-semibold mb-6">Nossa Equipe</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="text-muted-foreground mt-2">{member.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section>
          <div className="bg-muted rounded-lg p-6 md:p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
              <p className="text-lg">
                "Proporcionar experiências sensoriais únicas através de fragrâncias de alta qualidade, conectando
                pessoas a momentos especiais e memórias inesquecíveis."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

