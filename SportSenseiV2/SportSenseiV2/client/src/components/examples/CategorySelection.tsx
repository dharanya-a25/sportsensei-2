import { useState } from "react"
import { CategorySelection, type Category } from "../CategorySelection"

export default function CategorySelectionExample() {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>()

  return (
    <div className="p-8">
      <CategorySelection
        onCategorySelect={(category) => {
          setSelectedCategory(category)
          console.log('Category selected:', category)
        }}
        selectedCategory={selectedCategory}
      />
    </div>
  )
}