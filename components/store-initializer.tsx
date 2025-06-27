"use client"

import { useEffect } from "react"
import { initializeStore } from "@/lib/redux/store"

export function StoreInitializer() {
  useEffect(() => {
    // Initialize the store on the client side
    initializeStore()
  }, [])

  return null
}
