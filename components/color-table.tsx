"use client"

import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"

interface ColorItem {
  name: string
  variable: string
  cssVar: string
  foreground: string
  foregroundCssVar: string
}

export function ColorTable() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Colors to display in the table
  const colors: ColorItem[] = [
    {
      name: "Primary",
      variable: "--primary",
      cssVar: "var(--primary)",
      foreground: "--primary-foreground",
      foregroundCssVar: "var(--primary-foreground)",
    },
    {
      name: "Secondary",
      variable: "--secondary",
      cssVar: "var(--secondary)",
      foreground: "--secondary-foreground",
      foregroundCssVar: "var(--secondary-foreground)",
    },
    {
      name: "System",
      variable: "--system",
      cssVar: "var(--system)",
      foreground: "--system-foreground",
      foregroundCssVar: "var(--system-foreground)",
    },
    {
      name: "Warning",
      variable: "--warning",
      cssVar: "var(--warning)",
      foreground: "--warning-foreground",
      foregroundCssVar: "var(--warning-foreground)",
    },
    {
      name: "Success",
      variable: "--success",
      cssVar: "var(--success)",
      foreground: "--success-foreground",
      foregroundCssVar: "var(--success-foreground)",
    },
    {
      name: "Info",
      variable: "--info",
      cssVar: "var(--info)",
      foreground: "--info-foreground",
      foregroundCssVar: "var(--info-foreground)",
    },
    {
      name: "Error",
      variable: "--error",
      cssVar: "var(--error)",
      foreground: "--error-foreground",
      foregroundCssVar: "var(--error-foreground)",
    },
    {
      name: "Muted",
      variable: "--muted",
      cssVar: "var(--muted)",
      foreground: "--muted-foreground",
      foregroundCssVar: "var(--muted-foreground)",
    },
    {
      name: "Accent",
      variable: "--accent",
      cssVar: "var(--accent)",
      foreground: "--accent-foreground",
      foregroundCssVar: "var(--accent-foreground)",
    },
    {
      name: "Destructive",
      variable: "--destructive",
      cssVar: "var(--destructive)",
      foreground: "--destructive-foreground",
      foregroundCssVar: "var(--destructive-foreground)",
    },
    {
      name: "Background",
      variable: "--background",
      cssVar: "var(--background)",
      foreground: "--foreground",
      foregroundCssVar: "var(--foreground)",
    },
    {
      name: "Card",
      variable: "--card",
      cssVar: "var(--card)",
      foreground: "--card-foreground",
      foregroundCssVar: "var(--card-foreground)",
    },
    {
      name: "Popover",
      variable: "--popover",
      cssVar: "var(--popover)",
      foreground: "--popover-foreground",
      foregroundCssVar: "var(--popover-foreground)",
    },
    { name: "Border", variable: "--border", cssVar: "var(--border)", foreground: "", foregroundCssVar: "" },
    { name: "Input", variable: "--input", cssVar: "var(--input)", foreground: "", foregroundCssVar: "" },
    { name: "Ring", variable: "--ring", cssVar: "var(--ring)", foreground: "", foregroundCssVar: "" },
  ]

  // Function to get computed color value
  const getComputedColor = (variable: string) => {
    if (typeof window !== "undefined") {
      const style = getComputedStyle(document.documentElement)
      return style.getPropertyValue(variable).trim()
    }
    return ""
  }

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color System</CardTitle>
        <CardDescription>
          Current theme: <span className="font-medium">{theme || "system"}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Variable</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Foreground</TableHead>
              <TableHead>Sample</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colors.map((color) => (
              <TableRow key={color.name}>
                <TableCell className="font-medium">{color.name}</TableCell>
                <TableCell className="font-mono text-xs">{color.variable}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md border" style={{ backgroundColor: color.cssVar }}></div>
                    <span className="font-mono text-xs">{mounted ? getComputedColor(color.variable) : ""}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {color.foreground && (
                    <div className="flex items-center gap-2">
                      <div
                        className="h-6 w-6 rounded-md border"
                        style={{ backgroundColor: color.foregroundCssVar }}
                      ></div>
                      <span className="font-mono text-xs">{mounted ? getComputedColor(color.foreground) : ""}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {color.foreground && (
                    <div
                      className="rounded-md px-3 py-1 text-center"
                      style={{
                        backgroundColor: color.cssVar,
                        color: color.foregroundCssVar,
                      }}
                    >
                      Text
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
