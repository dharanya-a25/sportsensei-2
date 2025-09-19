import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart } from "lucide-react"

export type Category = "normal" | "disability"

interface CategorySelectionProps {
  onCategorySelect: (category: Category) => void
  selectedCategory?: Category
}

export function CategorySelection({ onCategorySelect, selectedCategory }: CategorySelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Choose Your Category</h2>
        <p className="text-muted-foreground">
          Select the category that best fits your athletic profile. This helps us provide personalized coaching and appropriate competition groups.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card 
          className={`cursor-pointer transition-all hover-elevate ${
            selectedCategory === "normal" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onCategorySelect("normal")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle data-testid="card-normal-category">Normal People</CardTitle>
            <CardDescription>
              Standard athletic categories with traditional sports and competitions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• High Jump competitions</p>
              <p>• Shot Put events</p>
              <p>• Javelin Throw challenges</p>
              <p>• Standard scoring metrics</p>
            </div>
            <Button 
              variant={selectedCategory === "normal" ? "default" : "outline"}
              className="w-full mt-4"
              onClick={(e) => {
                e.stopPropagation()
                onCategorySelect("normal")
              }}
              data-testid="button-select-normal"
            >
              Select Category
            </Button>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover-elevate ${
            selectedCategory === "disability" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => onCategorySelect("disability")}
        >
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <CardTitle data-testid="card-disability-category">People with Disability</CardTitle>
            <CardDescription>
              Adaptive sports with specialized coaching and inclusive competition formats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Adaptive sports categories</p>
              <p>• Specialized coaching feedback</p>
              <p>• Inclusive competition formats</p>
              <p>• Accessibility-first design</p>
            </div>
            <Button 
              variant={selectedCategory === "disability" ? "default" : "outline"}
              className="w-full mt-4"
              onClick={(e) => {
                e.stopPropagation()
                onCategorySelect("disability")
              }}
              data-testid="button-select-disability"
            >
              Select Category
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}