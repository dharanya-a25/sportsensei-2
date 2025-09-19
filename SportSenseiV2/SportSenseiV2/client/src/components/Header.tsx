import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "./ThemeToggle"
import { 
  User, 
  Trophy, 
  Settings, 
  LogOut, 
  Activity,
  BarChart3 
} from "lucide-react"

interface HeaderProps {
  username?: string
  currentStep: string
  onNavigate?: (step: string) => void
  onLogout?: () => void
}

export function Header({ username, currentStep, onNavigate, onLogout }: HeaderProps) {
  const navigationSteps = [
    { id: "home", label: "Home", icon: Activity },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "progress", label: "Progress", icon: BarChart3 },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">SportSensei</span>
          </div>
          
          {username && (
            <nav className="hidden md:flex items-center gap-2">
              {navigationSteps.map((step) => {
                const Icon = step.icon
                return (
                  <Button
                    key={step.id}
                    variant={currentStep === step.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onNavigate?.(step.id)}
                    className="flex items-center gap-2"
                    data-testid={`nav-${step.id}`}
                  >
                    <Icon className="h-4 w-4" />
                    {step.label}
                  </Button>
                )
              })}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {username ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-testid="user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={username} />
                    <AvatarFallback>
                      {username.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Athlete Profile
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate?.("profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate?.("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Badge variant="outline">Welcome</Badge>
          )}
        </div>
      </div>
    </header>
  )
}