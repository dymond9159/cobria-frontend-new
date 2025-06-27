"use client"

import { useI18n } from "@/i18n/provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocale("en")}>English {locale === "en" && "✓"}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("fr")}>Français {locale === "fr" && "✓"}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocale("es")}>Español {locale === "es" && "✓"}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
