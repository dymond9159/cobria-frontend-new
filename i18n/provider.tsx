"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { IntlProvider } from "react-intl"

// Import your translation files
import enMessages from "./locales/en.json"
import frMessages from "./locales/fr.json"
import esMessages from "./locales/es.json"

const messages: Record<string, Record<string, string>> = {
  en: enMessages,
  fr: frMessages,
  es: esMessages,
}

const I18nContext = createContext<{
  locale: string
  setLocale: (locale: string) => void
}>({
  locale: "en",
  setLocale: () => {},
})

export function I18nProvider({
  children,
  locale: initialLocale = "en",
}: {
  children: React.ReactNode
  locale?: string
}) {
  const [locale, setLocale] = useState(initialLocale)
  const router = useRouter()

  useEffect(() => {
    // Update the URL when locale changes
    if (locale !== initialLocale) {
      router.push(`/${locale}`)
    }
  }, [locale, initialLocale, router])

  return (
    <I18nContext.Provider value={{ locale, setLocale }}>
      <IntlProvider locale={locale} messages={messages[locale] || messages.en} defaultLocale="en">
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
