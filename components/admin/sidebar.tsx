"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  Tag,
  Ticket,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  PlusCircle,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>(["cadastros"])

  const handleLogout = () => {
    // Limpar dados de autenticação
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    })

    router.push("/login")
  }

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Produtos",
      href: "/admin/produtos",
      icon: Package,
    },
    {
      title: "Usuários",
      href: "/admin/usuarios",
      icon: Users,
    },
    {
      title: "Pedidos",
      href: "/admin/pedidos",
      icon: ShoppingBag,
    },
    {
      title: "Promoções",
      href: "/admin/promocoes",
      icon: Tag,
    },
    {
      title: "Cupons",
      href: "/admin/cupons",
      icon: Ticket,
    },
    {
      title: "Configurações",
      href: "/admin/configuracoes",
      icon: Settings,
    },
  ]

  const cadastroItems = [
    {
      title: "Novo Produto",
      href: "/admin/produtos/cadastrar",
      icon: Package,
    },
    {
      title: "Nova Promoção",
      href: "/admin/promocoes/cadastrar",
      icon: Tag,
    },
    {
      title: "Novo Cupom",
      href: "/admin/cupons/cadastrar",
      icon: Ticket,
    },
    {
      title: "Novo Usuário",
      href: "/admin/usuarios/cadastrar",
      icon: Users,
    },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Mobile toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-background border-r transition-all duration-300 md:relative",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center px-4 border-b">
            <Link href="/admin" className="flex items-center gap-2">
              {!collapsed && <span className="text-xl font-bold">Admin</span>}
              {collapsed && <span className="text-xl font-bold">A</span>}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto hidden md:flex"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <ScrollArea className="flex-1 py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/50 transition-colors",
                    pathname === item.href && "bg-muted",
                    collapsed && "justify-center",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              ))}

              {/* Seção de Cadastros */}
              {!collapsed ? (
                <Collapsible
                  open={openSections.includes("cadastros")}
                  onOpenChange={() => toggleSection("cadastros")}
                  className="mt-2"
                >
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <PlusCircle className="h-5 w-5" />
                        <span>Cadastros</span>
                      </div>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-transform",
                          openSections.includes("cadastros") && "rotate-90",
                        )}
                      />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="pl-4 pt-1 grid gap-1">
                      {cadastroItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/50 transition-colors",
                            pathname === item.href && "bg-muted",
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <div className="mt-2">
                  <Link
                    href="/admin/produtos/cadastrar"
                    className={cn(
                      "flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium hover:bg-muted/50 transition-colors",
                      pathname === "/admin/produtos/cadastrar" && "bg-muted",
                    )}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Link>
                </div>
              )}
            </nav>
          </ScrollArea>
          <div className="p-2 border-t">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50",
                collapsed && "justify-center",
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              {!collapsed && "Sair"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

