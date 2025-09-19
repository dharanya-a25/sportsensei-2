import { ThemeProvider } from "../ThemeProvider"
import { ThemeToggle } from "../ThemeToggle"

export default function ThemeToggleExample() {
  return (
    <ThemeProvider>
      <div className="p-8 space-y-4">
        <h3 className="text-lg font-semibold">Theme Toggle</h3>
        <p className="text-muted-foreground">Toggle between light and dark themes</p>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}