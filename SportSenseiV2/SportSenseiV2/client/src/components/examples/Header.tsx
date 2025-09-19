import { ThemeProvider } from "../ThemeProvider"
import { Header } from "../Header"

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header
          username="Alex Champion"
          currentStep="home"
          onNavigate={(step) => console.log('Navigate to:', step)}
          onLogout={() => console.log('Logout clicked')}
        />
        <div className="container p-8">
          <p className="text-muted-foreground">Page content would go here...</p>
        </div>
      </div>
    </ThemeProvider>
  )
}