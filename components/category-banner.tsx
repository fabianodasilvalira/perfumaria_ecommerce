import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CategoryBannerProps {
  category: "masculino" | "feminino" | "unissex"
}

export function CategoryBanner({ category }: CategoryBannerProps) {
  const bannerData = {
    masculino: {
      title: "Fragrâncias Masculinas",
      description: "Descubra perfumes marcantes e sofisticados para todas as ocasiões",
      cta: "Ver Coleção Masculina",
      link: "/masculinos",
      bgClass: "bg-blue-50 dark:bg-blue-950",
      textClass: "text-blue-900 dark:text-blue-50",
      buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    feminino: {
      title: "Fragrâncias Femininas",
      description: "Explore nossa coleção de perfumes delicados e envolventes",
      cta: "Ver Coleção Feminina",
      link: "/femininos",
      bgClass: "bg-pink-50 dark:bg-pink-950",
      textClass: "text-pink-900 dark:text-pink-50",
      buttonClass: "bg-pink-600 hover:bg-pink-700 text-white",
    },
    unissex: {
      title: "Fragrâncias Unissex",
      description: "Aromas versáteis e modernos para todos os estilos",
      cta: "Ver Coleção Unissex",
      link: "/unissex",
      bgClass: "bg-purple-50 dark:bg-purple-950",
      textClass: "text-purple-900 dark:text-purple-50",
      buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
    },
  }

  const data = bannerData[category]

  return (
    <div className={`rounded-lg p-6 ${data.bgClass}`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${data.textClass}`}>{data.title}</h2>
        <p className={`mb-6 ${data.textClass} opacity-90`}>{data.description}</p>
        <Button asChild className={data.buttonClass}>
          <Link href={data.link}>{data.cta}</Link>
        </Button>
      </div>
    </div>
  )
}

