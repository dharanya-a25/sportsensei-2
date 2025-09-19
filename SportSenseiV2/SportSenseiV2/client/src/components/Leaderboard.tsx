import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"
import type { Category } from "./CategorySelection"
import type { DisabilityType } from "./DisabilitySubCategories"

interface LeaderboardEntry {
  id: string
  username: string
  score: number
  category: string
  game: string
  avatar?: string
  trend: "up" | "down" | "same"
  rank: number
}

interface LeaderboardProps {
  category: Category
  disabilityType?: DisabilityType
  gameId?: string
  currentUser?: string
}

// TODO: Remove mock data when connecting to real backend
const mockLeaderboardData: LeaderboardEntry[] = [
  {
    id: "1",
    username: "Alex Champion",
    score: 2450,
    category: "normal",
    game: "high-jump",
    trend: "up",
    rank: 1
  },
  {
    id: "2",
    username: "Sarah Strong",
    score: 2380,
    category: "normal",
    game: "high-jump",
    trend: "same",
    rank: 2
  },
  {
    id: "3",
    username: "Marcus Power",
    score: 2350,
    category: "leg",
    game: "seated-javelin",
    trend: "up",
    rank: 3
  },
  {
    id: "4",
    username: "Elena Swift",
    score: 2290,
    category: "blind",
    game: "guided-running",
    trend: "down",
    rank: 4
  },
  {
    id: "5",
    username: "David Ace",
    score: 2240,
    category: "hand",
    game: "one-hand-shot-put",
    trend: "up",
    rank: 5
  }
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <span className="text-muted-foreground font-semibold">#{rank}</span>
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-success" />
    case "down":
      return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />
    default:
      return <div className="h-4 w-4 bg-muted-foreground rounded-full" />
  }
}

export function Leaderboard({ category, disabilityType, gameId, currentUser }: LeaderboardProps) {
  // TODO: Filter based on actual category/game when connecting to backend
  const filteredData = mockLeaderboardData.slice(0, 10)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          Leaderboard
        </h2>
        <p className="text-muted-foreground">
          Top performers in {category === "disability" ? `${disabilityType} category` : "standard category"}
          {gameId && ` for ${gameId.replace('-', ' ')}`}
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Rankings</span>
            <Badge variant="outline">{filteredData.length} Athletes</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((entry, index) => (
              <div
                key={entry.id}
                className={`
                  flex items-center justify-between p-4 rounded-lg border transition-colors
                  ${entry.username === currentUser ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50'}
                `}
                data-testid={`leaderboard-entry-${entry.rank}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 min-w-[60px]">
                    {getRankIcon(entry.rank)}
                    {getTrendIcon(entry.trend)}
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.avatar} alt={entry.username} />
                    <AvatarFallback>
                      {entry.username.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-medium">{entry.username}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {entry.game.replace('-', ' ')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-lg">{entry.score.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
          
          {currentUser && !filteredData.find(e => e.username === currentUser) && (
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 min-w-[60px]">
                    <span className="text-muted-foreground font-semibold">#--</span>
                  </div>
                  
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {currentUser.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-medium">{currentUser} (You)</p>
                    <p className="text-sm text-muted-foreground">No scores yet</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-semibold text-lg text-muted-foreground">--</p>
                  <p className="text-sm text-muted-foreground">points</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}