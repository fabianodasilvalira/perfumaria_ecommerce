"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

type MenuType = "products" | "more" | null

interface MenuContextType {
  openMenu: MenuType
  setOpenMenu: (menu: MenuType) => void
  toggleMenu: (menu: MenuType) => void
}

const MenuContext = createContext<MenuContextType>({
  openMenu: null,
  setOpenMenu: () => {},
  toggleMenu: () => {},
})

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState<MenuType>(null)
  const pathname = usePathname()

  // Fechar o menu quando a rota mudar
  useEffect(() => {
    setOpenMenu(null)
  }, [pathname])

  // Função para alternar o menu
  const toggleMenu = (menu: MenuType) => {
    setOpenMenu((current) => (current === menu ? null : menu))
  }

  return <MenuContext.Provider value={{ openMenu, setOpenMenu, toggleMenu }}>{children}</MenuContext.Provider>
}

export const useMenu = () => useContext(MenuContext)

