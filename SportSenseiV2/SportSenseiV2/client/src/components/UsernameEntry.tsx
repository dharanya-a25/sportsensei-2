import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"

interface UsernameEntryProps {
  open: boolean
  onUsernameSet: (username: string) => void
}

export function UsernameEntry({ open, onUsernameSet }: UsernameEntryProps) {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      localStorage.setItem("sportsensei-username", username.trim())
      onUsernameSet(username.trim())
    }
  }

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Welcome to SportSensei
          </DialogTitle>
          <DialogDescription>
            Enter your username to get started. This will be displayed on leaderboards and saved locally for your progress tracking.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              data-testid="input-username"
              aria-describedby="username-desc"
            />
            <p id="username-desc" className="text-sm text-muted-foreground">
              Choose a name that represents you in competitions
            </p>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!username.trim()}
            data-testid="button-save-username"
          >
            Start Your Journey
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}