import { FeedbackDisplay } from "../FeedbackDisplay"

export default function FeedbackDisplayExample() {
  return (
    <div className="p-8">
      <FeedbackDisplay
        gameId="javelin-throw"
        feedback={{
          overallScore: 8.2,
          maxOverallScore: 10,
          scores: [
            {
              category: "Form & Technique",
              score: 8.5,
              maxScore: 10,
              feedback: "Excellent arm extension and follow-through."
            },
            {
              category: "Power & Speed",
              score: 7.8,
              maxScore: 10,
              feedback: "Good power generation. Focus on explosive hip drive."
            }
          ],
          strengths: ["Consistent release angle", "Strong core engagement"],
          improvements: ["Increase hip rotation speed", "Work on grip strength"],
          nextSteps: ["Practice explosive hip drive exercises", "Record slow-motion videos"],
          voiceFeedback: "Overall excellent performance!"
        }}
        onRetry={() => console.log('Retry clicked')}
        onNext={() => console.log('Next clicked')}
      />
    </div>
  )
}