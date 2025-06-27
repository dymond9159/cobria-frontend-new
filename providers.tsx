"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "@/lib/redux/store"
import QueryProvider from "@/providers/query-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryProvider>{children}</QueryProvider>
    </Provider>
  )
}
