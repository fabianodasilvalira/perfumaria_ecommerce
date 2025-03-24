"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { getRecommendedProducts } from "@/lib/product-service"
import { ProductGrid } from "@/components/product-grid"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: "occasion",
      question: "Para qual ocasião você está procurando um perfume?",
      options: [
        { value: "daily", label: "Uso diário" },
        { value: "work", label: "Ambiente de trabalho" },
        { value: "night", label: "Eventos noturnos" },
        { value: "special", label: "Ocasiões especiais" },
      ],
    },
    {
      id: "intensity",
      question: "Qual intensidade de fragrância você prefere?",
      options: [
        { value: "light", label: "Leve e sutil" },
        { value: "moderate", label: "Moderada" },
        { value: "strong", label: "Intensa e marcante" },
        { value: "very-strong", label: "Muito intensa e duradoura" },
      ],
    },
    {
      id: "notes",
      question: "Quais notas aromáticas você mais aprecia?",
      options: [
        { value: "floral", label: "Florais (rosa, jasmim, lavanda)" },
        { value: "fruity", label: "Frutais (cítricos, frutas vermelhas)" },
        { value: "woody", label: "Amadeiradas (sândalo, cedro, patchouli)" },
        { value: "oriental", label: "Orientais (âmbar, baunilha, especiarias)" },
      ],
    },
    {
      id: "season",
      question: "Em qual estação do ano você mais usaria este perfume?",
      options: [
        { value: "spring", label: "Primavera" },
        { value: "summer", label: "Verão" },
        { value: "autumn", label: "Outono" },
        { value: "winter", label: "Inverno" },
      ],
    },
    {
      id: "gender",
      question: "Qual tipo de fragrância você está buscando?",
      options: [
        { value: "masculine", label: "Masculina" },
        { value: "feminine", label: "Feminina" },
        { value: "unisex", label: "Unissex" },
        { value: "no-preference", label: "Sem preferência" },
      ],
    },
  ]

  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    })
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100
  const recommendedProducts = getRecommendedProducts(answers)

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Descubra seu Perfume Ideal</h1>
        <p className="text-center text-muted-foreground mb-8">
          Responda algumas perguntas simples e encontraremos as fragrâncias perfeitas para você
        </p>

        {!showResults ? (
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">
                  Pergunta {currentStep + 1} de {questions.length}
                </div>
                <Progress value={progress} className="h-2 w-full max-w-[100px]" />
              </div>
              <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={answers[currentQuestion.id] || ""} onValueChange={handleAnswer} className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="cursor-pointer flex-1 py-2">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button onClick={handleNext} disabled={!answers[currentQuestion.id]}>
                {currentStep === questions.length - 1 ? "Ver Resultados" : "Próxima"}
                {currentStep !== questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Suas Fragrâncias Recomendadas</CardTitle>
                <CardDescription>
                  Com base nas suas respostas, selecionamos estes perfumes que combinam com seu perfil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProductGrid products={recommendedProducts} />
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={handleRestart}>Refazer o Quiz</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

