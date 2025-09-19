import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  TrendingUp, 
  Target, 
  Clock, 
  Volume2, 
  FileText 
} from "lucide-react"

interface FeedbackScore {
  category: string
  score: number
  maxScore: number
  feedback: string
}

interface AIFeedback {
  overallScore: number
  maxOverallScore: number
  scores: FeedbackScore[]
  strengths: string[]
  improvements: string[]
  nextSteps: string[]
  voiceFeedback?: string
}

interface FeedbackDisplayProps {
  feedback: AIFeedback
  gameId: string
  onRetry?: () => void
  onNext?: () => void
}

// TODO: Remove mock data when connecting to real AI backend
const mockFeedback: AIFeedback = {
  overallScore: 8.2,
  maxOverallScore: 10,
  scores: [
    {
      category: "Form & Technique",
      score: 8.5,
      maxScore: 10,
      feedback: "Excellent arm extension and follow-through. Your release angle is very close to optimal."
    },
    {
      category: "Power & Speed",
      score: 7.8,
      maxScore: 10,
      feedback: "Good power generation. Focus on explosive hip drive for more distance."
    },
    {
      category: "Positioning",
      score: 8.3,
      maxScore: 10,
      feedback: "Great stance and approach. Consistent footwork throughout the throw."
    }
  ],
  strengths: [
    "Consistent release angle close to 45 degrees",
    "Strong core engagement throughout movement",
    "Excellent balance and stability"
  ],
  improvements: [
    "Increase hip rotation speed for more power",
    "Work on grip strength for better control",
    "Extend follow-through for maximum distance"
  ],
  nextSteps: [
    "Practice explosive hip drive exercises",
    "Record slow-motion videos to analyze technique",
    "Focus on grip strengthening workouts"
  ],
  voiceFeedback: "Overall excellent performance! Your technique shows great fundamentals..."
}

const getScoreColor = (score: number, maxScore: number): string => {
  const percentage = (score / maxScore) * 100
  if (percentage >= 80) return "text-success"
  if (percentage >= 60) return "text-warning"
  return "text-destructive"
}

const getScoreIcon = (score: number, maxScore: number) => {
  const percentage = (score / maxScore) * 100
  if (percentage >= 80) return <CheckCircle className="h-5 w-5 text-success" />
  if (percentage >= 60) return <AlertCircle className="h-5 w-5 text-warning" />
  return <XCircle className="h-5 w-5 text-destructive" />
}

export function FeedbackDisplay({ feedback = mockFeedback, gameId, onRetry, onNext }: FeedbackDisplayProps) {
  const playVoiceFeedback = () => {
    if (feedback.voiceFeedback) {
      // TODO: Implement text-to-speech or audio playback
      console.log('Playing voice feedback:', feedback.voiceFeedback)
      // For now, just show an alert
      alert('Voice feedback would play here: ' + feedback.voiceFeedback.substring(0, 100) + '...')
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Performance Analysis</h2>
        <p className="text-muted-foreground">
          AI-powered feedback for your {gameId.replace('-', ' ')} performance
        </p>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Overall Performance
          </CardTitle>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">
              {feedback.overallScore}/{feedback.maxOverallScore}
            </div>
            <Progress 
              value={(feedback.overallScore / feedback.maxOverallScore) * 100} 
              className="h-3 w-48 mx-auto" 
            />
            <Badge 
              variant={(feedback.overallScore / feedback.maxOverallScore) >= 0.8 ? "default" : 
                      (feedback.overallScore / feedback.maxOverallScore) >= 0.6 ? "secondary" : "destructive"}
            >
              {(feedback.overallScore / feedback.maxOverallScore) >= 0.8 ? "Excellent" : 
               (feedback.overallScore / feedback.maxOverallScore) >= 0.6 ? "Good" : "Needs Improvement"}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Scores */}
      <div className="grid md:grid-cols-3 gap-6">
        {feedback.scores.map((score, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <span>{score.category}</span>
                {getScoreIcon(score.score, score.maxScore)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${getScoreColor(score.score, score.maxScore)}`}>
                    {score.score}/{score.maxScore}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((score.score / score.maxScore) * 100)}%
                  </span>
                </div>
                <Progress value={(score.score / score.maxScore) * 100} className="h-2" />
                <p className="text-sm text-muted-foreground">{score.feedback}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Strengths and Improvements */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <CheckCircle className="h-5 w-5" />
              Strengths
            </CardTitle>
            <CardDescription>What you're doing well</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Target className="h-5 w-5" />
              Areas for Improvement
            </CardTitle>
            <CardDescription>Focus areas for better performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recommended Next Steps
          </CardTitle>
          <CardDescription>Action items to improve your performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {feedback.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                  {index + 1}
                </div>
                <span className="text-sm">{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {feedback.voiceFeedback && (
          <Button
            variant="outline"
            onClick={playVoiceFeedback}
            className="flex items-center gap-2"
            data-testid="button-voice-feedback"
          >
            <Volume2 className="h-4 w-4" />
            Play Voice Feedback
          </Button>
        )}
        
        {onRetry && (
          <Button
            variant="outline"
            onClick={onRetry}
            data-testid="button-retry"
          >
            <FileText className="h-4 w-4 mr-2" />
            Upload Another Video
          </Button>
        )}
        
        {onNext && (
          <Button
            onClick={onNext}
            data-testid="button-continue"
          >
            Continue Training
          </Button>
        )}
      </div>
    </div>
  )
}