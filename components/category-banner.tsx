"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

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
      bgClass: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900",
      textClass: "text-blue-900 dark:text-blue-50",
      buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    feminino: {
      title: "Fragrâncias Femininas",
      description: "Explore nossa coleção de perfumes delicados e envolventes",
      cta: "Ver Coleção Feminina",
      link: "/femininos",
      bgClass: "bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900",
      textClass: "text-pink-900 dark:text-pink-50",
      buttonClass: "bg-pink-600 hover:bg-pink-700 text-white",
    },
    unissex: {
      title: "Fragrâncias Unissex",
      description: "Aromas versáteis e modernos para todos os estilos",
      cta: "Ver Coleção Unissex",
      link: "/unissex",
      bgClass: "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900",
      textClass: "text-purple-900 dark:text-purple-50",
      buttonClass: "bg-purple-600 hover:bg-purple-700 text-white",
    },
  }

  const data = bannerData[category]

  return (
    <motion.div
      className={`rounded-lg p-8 ${data.bgClass} shadow-sm overflow-hidden relative`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className={`text-2xl md:text-3xl font-bold mb-3 ${data.textClass}`}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {data.title}
        </motion.h2>
        <motion.p
          className={`mb-6 ${data.textClass} opacity-90`}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {data.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button asChild className={`${data.buttonClass} shadow-md hover:shadow-lg transition-all`}>
            <Link href={data.link}>{data.cta}</Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-white/10 blur-3xl"></div>
    </motion.div>
  )
}

