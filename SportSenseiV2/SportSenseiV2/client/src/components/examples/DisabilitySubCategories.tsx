import { useState } from "react"
import { DisabilitySubCategories, type DisabilityType } from "../DisabilitySubCategories"

export default function DisabilitySubCategoriesExample() {
  const [selectedSubCategory, setSelectedSubCategory] = useState<DisabilityType | undefined>()

  return (
    <div className="p-8">
      <DisabilitySubCategories
        onSubCategorySelect={(type) => {
          setSelectedSubCategory(type)
          console.log('Sub-category selected:', type)
        }}
        selectedSubCategory={selectedSubCategory}
      />
    </div>
  )
}