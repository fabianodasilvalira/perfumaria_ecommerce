"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "@/components/product-grid"
import { getFeaturedProducts, getNewArrivals } from "@/lib/product-service"
import { CategorySection } from "@/components/category-section"
import { HeroSlider } from "@/components/hero-slider"
import { QuizBanner } from "@/components/quiz-banner"
import { ScentMapPromo } from "@/components/scent-map-promo"
import { PromotionsSection } from "@/components/promotions-section"
import { CategoryBanner } from "@/components/category-banner"
import { motion } from "framer-motion"

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const newArrivals = getNewArrivals()

  return (
    <div className="flex flex-col gap-12 pb-12">
      <HeroSlider />

      <section className="container px-4 md:px-6">
        <CategorySection />
      </section>

      <section className="container px-4 md:px-6">
        <div className="space-y-8">
          <CategoryBanner category="masculino" />
          <CategoryBanner category="feminino" />
          <CategoryBanner category="unissex" />
        </div>
      </section>

      <PromotionsSection />

      <section className="container px-4 md:px-6">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tight">Nossos Perfumes</h2>
          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="featured">Destaques</TabsTrigger>
              <TabsTrigger value="new">Novidades</TabsTrigger>
            </TabsList>
            <TabsContent value="featured">
              <ProductGrid products={featuredProducts} />
            </TabsContent>
            <TabsContent value="new">
              <ProductGrid products={newArrivals} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </section>

      <ScentMapPromo />

      <QuizBanner />

      <section className="container px-4 md:px-6">
        <motion.div
          className="py-10 px-6 md:px-10 bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Fragrâncias que Encantam</h2>
            <p className="text-muted-foreground">
              Descubra perfumes exclusivos que combinam com sua personalidade. Fragrâncias únicas para momentos
              especiais.
            </p>
            <div className="flex justify-center mt-4">
              <Button size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all" asChild>
                <a href="/produtos">Ver Todos os Perfumes</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

