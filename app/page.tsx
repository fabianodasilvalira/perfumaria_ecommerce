import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "@/components/product-grid"
import { getFeaturedProducts, getNewArrivals } from "@/lib/product-service"
import { CategorySection } from "@/components/category-section"
import { HeroSlider } from "@/components/hero-slider"
import { QuizBanner } from "@/components/quiz-banner"
import { ScentMapPromo } from "@/components/scent-map-promo"
import { PromotionsSection } from "@/components/promotions-section"
// Importar o componente CategoryBanner
import { CategoryBanner } from "@/components/category-banner"

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const newArrivals = getNewArrivals()

  return (
    <div className="flex flex-col gap-8 pb-8">
      <HeroSlider />

      <section className="container px-4 md:px-6">
        <CategorySection />
      </section>

      {/* Adicionar os banners de categorias após a seção de categorias */}
      {/* Encontre a seção após <CategorySection /> e adicione: */}
      <div className="container px-4 md:px-6">
        <div className="space-y-6 mt-12">
          <CategoryBanner category="masculino" />
          <CategoryBanner category="feminino" />
          <CategoryBanner category="unissex" />
        </div>
      </div>

      <PromotionsSection />

      <section className="container px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Nossos Perfumes</h2>
          <Tabs defaultValue="featured" className="w-full">
            <TabsList className="mb-4">
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
        </div>
      </section>

      <ScentMapPromo />

      <QuizBanner />

      <section className="container px-4 md:px-6 py-6 bg-muted/50 rounded-lg">
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Fragrâncias que Encantam</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Descubra perfumes exclusivos que combinam com sua personalidade. Fragrâncias únicas para momentos especiais.
          </p>
          <div className="flex justify-center mt-2">
            <Button size="lg" className="rounded-full" asChild>
              <a href="/produtos">Ver Todos os Perfumes</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

