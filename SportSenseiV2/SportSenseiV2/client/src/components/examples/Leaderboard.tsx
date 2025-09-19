import { Leaderboard } from "../Leaderboard"

export default function LeaderboardExample() {
  return (
    <div className="p-8">
      <Leaderboard
        category="normal"
        gameId="high-jump"
        currentUser="John Doe"
      />
    </div>
  )
}