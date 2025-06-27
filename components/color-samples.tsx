import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

export function ColorSamples() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Usage Examples</CardTitle>
        <CardDescription>Examples of components using color variables</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Buttons</h3>
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Badges</h3>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-success text-success-foreground">Success</Badge>
            <Badge className="bg-warning text-warning-foreground">Warning</Badge>
            <Badge className="bg-info text-info-foreground">Info</Badge>
            <Badge className="bg-error text-error-foreground">Error</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Alerts</h3>
          <div className="space-y-2">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is a default alert using system colors.</AlertDescription>
            </Alert>

            <Alert className="border-success bg-success/10">
              <CheckCircle className="h-4 w-4 text-success" />
              <AlertTitle className="text-success">Success</AlertTitle>
              <AlertDescription>This is a success alert using success color variables.</AlertDescription>
            </Alert>

            <Alert className="border-warning bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertTitle className="text-warning">Warning</AlertTitle>
              <AlertDescription>This is a warning alert using warning color variables.</AlertDescription>
            </Alert>

            <Alert className="border-info bg-info/10">
              <Info className="h-4 w-4 text-info" />
              <AlertTitle className="text-info">Info</AlertTitle>
              <AlertDescription>This is an info alert using info color variables.</AlertDescription>
            </Alert>

            <Alert className="border-error bg-error/10">
              <AlertCircle className="h-4 w-4 text-error" />
              <AlertTitle className="text-error">Error</AlertTitle>
              <AlertDescription>This is an error alert using error color variables.</AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Text Colors</h3>
          <div className="space-y-1">
            <p className="text-primary">This text uses the primary color variable</p>
            <p className="text-secondary">This text uses the secondary color variable</p>
            <p className="text-success">This text uses the success color variable</p>
            <p className="text-warning">This text uses the warning color variable</p>
            <p className="text-info">This text uses the info color variable</p>
            <p className="text-error">This text uses the error color variable</p>
            <p className="text-muted-foreground">This text uses the muted foreground color variable</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
