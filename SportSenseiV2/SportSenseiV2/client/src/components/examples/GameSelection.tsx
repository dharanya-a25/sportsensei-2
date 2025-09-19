import { useState } from "react"
import { GameSelection } from "../GameSelection"
import type { Category } from "../CategorySelection"
import type { DisabilityType } from "../DisabilitySubCategories"

export default function GameSelectionExample() {
  const [selectedGame, setSelectedGame] = useState<string | undefined>()

  return (
    <div className="p-8">
      <GameSelection
        category="normal"
        onGameSelect={(gameId) => {
          setSelectedGame(gameId)
          console.log('Game selected:', gameId)
        }}
        selectedGame={selectedGame}
      />
    </div>
  )
}