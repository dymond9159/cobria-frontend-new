import type React from "react"
import { Inter } from "next/font/google"
import { Providers } from "@/providers"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/i18n/provider"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Next.js Application",
  description: "Modern Next.js application with best practices",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={params.locale || "en"} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <I18nProvider locale={params.locale || "en"}>{children}</I18nProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
