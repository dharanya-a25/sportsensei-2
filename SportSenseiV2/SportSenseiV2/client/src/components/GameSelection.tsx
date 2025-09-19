import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Zap } from "lucide-react"
import type { Category } from "./CategorySelection"
import type { DisabilityType } from "./DisabilitySubCategories"

interface Game {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

interface GameSelectionProps {
  category: Category
  disabilityType?: DisabilityType
  onGameSelect: (gameId: string) => void
  selectedGame?: string
}

const getGamesForCategory = (category: Category, disabilityType?: DisabilityType): Game[] => {
  if (category === "normal") {
    return [
      {
        id: "high-jump",
        name: "High Jump",
        description: "Leap over a horizontal bar at great heights",
        icon: <Trophy className="h-6 w-6" />,
        difficulty: "Intermediate"
      },
      {
        id: "shot-put",
        name: "Shot Put",
        description: "Throw a heavy metal ball as far as possible",
        icon: <Target className="h-6 w-6" />,
        difficulty: "Beginner"
      },
      {
        id: "javelin-throw",
        name: "Javelin Throw",
        description: "Launch a spear-like implement for maximum distance",
        icon: <Zap className="h-6 w-6" />,
        difficulty: "Advanced"
      }
    ]
  }

  switch (disabilityType) {
    case "leg":
      return [
        {
          id: "seated-javelin",
          name: "Seated Javelin Throw",
          description: "Javelin throwing from a seated position",
          icon: <Zap className="h-6 w-6" />,
          difficulty: "Intermediate"
        },
        {
          id: "wheelchair-racing",
          name: "Wheelchair Racing",
          description: "High-speed racing in specialized wheelchairs",
          icon: <Trophy className="h-6 w-6" />,
          difficulty: "Advanced"
        },
        {
          id: "medicine-ball",
          name: "Medicine Ball Throw",
          description: "Upper body strength focused throwing event",
          icon: <Target className="h-6 w-6" />,
          difficulty: "Beginner"
        }
      ]
    case "hand":
      return [
        {
          id: "one-hand-shot-put",
          name: "One-hand Shot Put",
          description: "Shot put adapted for single-hand technique",
          icon: <Target className="h-6 w-6" />,
          difficulty: "Intermediate"
        },
        {
          id: "one-hand-javelin",
          name: "One-hand Javelin",
          description: "Javelin throwing with adapted grip technique",
          icon: <Zap className="h-6 w-6" />,
          difficulty: "Advanced"
        },
        {
          id: "wheelchair-racing-hand",
          name: "Wheelchair Racing",
          description: "Racing adapted for hand limitations",
          icon: <Trophy className="h-6 w-6" />,
          difficulty: "Intermediate"
        }
      ]
    case "blind":
      return [
        {
          id: "guided-running",
          name: "Guided Running",
          description: "Running with audio guidance and sighted guide",
          icon: <Trophy className="h-6 w-6" />,
          difficulty: "Intermediate"
        },
        {
          id: "goalball",
          name: "Goalball",
          description: "Team sport with sound-enabled ball",
          icon: <Target className="h-6 w-6" />,
          difficulty: "Beginner"
        },
        {
          id: "audio-target-throw",
          name: "Audio Target Throw",
          description: "Throwing sport using sound cues for targeting",
          icon: <Zap className="h-6 w-6" />,
          difficulty: "Advanced"
        }
      ]
    default:
      return []
  }
}

export function GameSelection({ category, disabilityType, onGameSelect, selectedGame }: GameSelectionProps) {
  const games = getGamesForCategory(category, disabilityType)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Choose Your Sport</h2>
        <p className="text-muted-foreground">
          Select a sport to start training and competing. Each sport offers personalized AI coaching.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {games.map((game) => (
          <Card 
            key={game.id}
            className={`cursor-pointer transition-all hover-elevate ${
              selectedGame === game.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => onGameSelect(game.id)}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                {game.icon}
              </div>
              <CardTitle data-testid={`card-game-${game.id}`}>{game.name}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Badge 
                  variant={game.difficulty === "Beginner" ? "secondary" : 
                          game.difficulty === "Intermediate" ? "default" : "destructive"}
                >
                  {game.difficulty}
                </Badge>
              </div>
              <Button 
                variant={selectedGame === game.id ? "default" : "outline"}
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  onGameSelect(game.id)
                }}
                data-testid={`button-select-${game.id}`}
              >
                Select Sport
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}