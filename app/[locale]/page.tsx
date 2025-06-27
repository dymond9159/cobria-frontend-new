import { Counter } from "@/components/counter"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { StoreInitializer } from "@/components/store-initializer"
import { ColorTable } from "@/components/color-table"
import { ColorSamples } from "@/components/color-samples"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      {/* This component initializes the Redux store on the client side */}
      <StoreInitializer />

      <div className="container max-w-5xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Modern Next.js Architecture</h1>
          <div className="flex space-x-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-8">
            <Counter />
            <ColorSamples />
          </div>
          <ColorTable />
        </div>
      </div>
    </main>
  )
}
