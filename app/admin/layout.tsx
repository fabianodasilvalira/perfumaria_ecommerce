"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/admin/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está autenticado e é admin
    const checkAuth = () => {
      // Evitar verificações repetidas durante o carregamento
      if (!isLoading) return

      const user = localStorage.getItem("user")
      const token = localStorage.getItem("token")

      if (!user || !token) {
        router.push("/login")
        return
      }

      try {
        const userData = JSON.parse(user)
        if (userData.role !== "admin") {
          router.push("/")
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, isLoading])
  // Remover isLoading da dependência se ainda causar problemas

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}

