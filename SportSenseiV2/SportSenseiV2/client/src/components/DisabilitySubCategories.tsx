import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accessibility, Hand, Eye } from "lucide-react"

export type DisabilityType = "leg" | "hand" | "blind"

interface DisabilitySubCategoriesProps {
  onSubCategorySelect: (type: DisabilityType) => void
  selectedSubCategory?: DisabilityType
}

export function DisabilitySubCategories({ onSubCategorySelect, selectedSubCategory }: DisabilitySubCategoriesProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Select Your Adaptive Category</h2>
        <p className="text-muted-foreground">
          Choose the category that matches your specific needs for the most relevant coaching and competition experience.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card 
          className={`cursor-pointer transition-all hover-elevate ${
            selectedSubCategory === "leg" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSubCategorySelect("leg")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Accessibility className="h-8 w-8 text-primary" />
            </div>
            <CardTitle data-testid="card-leg-disability">Leg Disability</CardTitle>
            <CardDescription>
              Seated and upper-body focused athletic events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Seated Javelin Throw</p>
              <p>• Wheelchair Racing</p>
              <p>• Arm Strength Games</p>
              <p>• Medicine ball throw</p>
            </div>
            <Button 
              variant={selectedSubCategory === "leg" ? "default" : "outline"}
              className="w-full mt-4"
              onClick={(e) => {
                e.stopPropagation()
                onSubCategorySelect("leg")
              }}
              data-testid="button-select-leg"
            >
              Select Category
            </Button>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover-elevate ${
            selectedSubCategory === "hand" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSubCategorySelect("hand")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Hand className="h-8 w-8 text-primary" />
            </div>
            <CardTitle data-testid="card-hand-disability">One/Two Hand Disability</CardTitle>
            <CardDescription>
              Adapted throwing and racing events for hand limitations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• One-hand Shot Put</p>
              <p>• One-hand Javelin</p>
              <p>• Wheelchair Racing</p>
              <p>• Adaptive techniques</p>
            </div>
            <Button 
              variant={selectedSubCategory === "hand" ? "default" : "outline"}
              className="w-full mt-4"
              onClick={(e) => {
                e.stopPropagation()
                onSubCategorySelect("hand")
              }}
              data-testid="button-select-hand"
            >
              Select Category
            </Button>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover-elevate ${
            selectedSubCategory === "blind" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onSubCategorySelect("blind")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <CardTitle data-testid="card-blind-disability">Blind People</CardTitle>
            <CardDescription>
              Audio-guided sports with sound-based navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Guided Running</p>
              <p>• Goalball (sound ball)</p>
              <p>• Audio Target Throw</p>
              <p>• Voice guidance system</p>
            </div>
            <Button 
              variant={selectedSubCategory === "blind" ? "default" : "outline"}
              className="w-full mt-4"
              onClick={(e) => {
                e.stopPropagation()
                onSubCategorySelect("blind")
              }}
              data-testid="button-select-blind"
            >
              Select Category
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}