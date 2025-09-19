import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { UsernameEntry } from "@/components/UsernameEntry";
import { CategorySelection, type Category } from "@/components/CategorySelection";
import { DisabilitySubCategories, type DisabilityType } from "@/components/DisabilitySubCategories";
import { GameSelection } from "@/components/GameSelection";
import { VideoUpload } from "@/components/VideoUpload";
import { FeedbackDisplay } from "@/components/FeedbackDisplay";
import { Leaderboard } from "@/components/Leaderboard";

type AppStep = 
  | "username" 
  | "category" 
  | "subcategory" 
  | "game" 
  | "upload" 
  | "feedback" 
  | "leaderboard" 
  | "home";

interface UserState {
  username: string;
  category?: Category;
  disabilityType?: DisabilityType;
  selectedGame?: string;
  uploadedVideo?: any;
}

function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>("username");
  const [userState, setUserState] = useState<UserState>({ username: "" });

  useEffect(() => {
    // Check if user has previously set username
    const savedUsername = localStorage.getItem("sportsensei-username");
    if (savedUsername) {
      setUserState(prev => ({ ...prev, username: savedUsername }));
      setCurrentStep("home");
    }
  }, []);

  const handleUsernameSet = (username: string) => {
    setUserState(prev => ({ ...prev, username }));
    setCurrentStep("category");
  };

  const handleCategorySelect = (category: Category) => {
    setUserState(prev => ({ ...prev, category }));
    if (category === "disability") {
      setCurrentStep("subcategory");
    } else {
      setCurrentStep("game");
    }
  };

  const handleSubCategorySelect = (disabilityType: DisabilityType) => {
    setUserState(prev => ({ ...prev, disabilityType }));
    setCurrentStep("game");
  };

  const handleGameSelect = (gameId: string) => {
    setUserState(prev => ({ ...prev, selectedGame: gameId }));
    setCurrentStep("upload");
  };

  const handleVideoUploaded = (video: any) => {
    setUserState(prev => ({ ...prev, uploadedVideo: video }));
    setCurrentStep("feedback");
  };

  const handleNavigate = (step: string) => {
    switch (step) {
      case "home":
        setCurrentStep("category");
        break;
      case "leaderboard":
        setCurrentStep("leaderboard");
        break;
      case "progress":
        // TODO: Implement progress tracking page
        console.log("Progress tracking coming soon!");
        break;
      default:
        setCurrentStep(step as AppStep);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sportsensei-username");
    setUserState({ username: "" });
    setCurrentStep("username");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "username":
        return (
          <UsernameEntry
            open={true}
            onUsernameSet={handleUsernameSet}
          />
        );

      case "category":
        return (
          <div className="container py-8">
            <CategorySelection
              onCategorySelect={handleCategorySelect}
              selectedCategory={userState.category}
            />
          </div>
        );

      case "subcategory":
        return (
          <div className="container py-8">
            <DisabilitySubCategories
              onSubCategorySelect={handleSubCategorySelect}
              selectedSubCategory={userState.disabilityType}
            />
          </div>
        );

      case "game":
        return (
          <div className="container py-8">
            <GameSelection
              category={userState.category!}
              disabilityType={userState.disabilityType}
              onGameSelect={handleGameSelect}
              selectedGame={userState.selectedGame}
            />
          </div>
        );

      case "upload":
        return (
          <div className="container py-8">
            <VideoUpload
              onVideoUploaded={handleVideoUploaded}
              gameId={userState.selectedGame}
            />
          </div>
        );

      case "feedback":
        return (
          <div className="container py-8">
            <FeedbackDisplay
              gameId={userState.selectedGame!}
              feedback={{
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
              }}
              onRetry={() => setCurrentStep("upload")}
              onNext={() => setCurrentStep("leaderboard")}
            />
          </div>
        );

      case "leaderboard":
        return (
          <div className="container py-8">
            <Leaderboard
              category={userState.category!}
              disabilityType={userState.disabilityType}
              gameId={userState.selectedGame}
              currentUser={userState.username}
            />
          </div>
        );

      case "home":
      default:
        return (
          <div className="container py-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">Welcome back, {userState.username}!</h1>
                <p className="text-xl text-muted-foreground">
                  Ready to continue your athletic journey? Choose your training focus.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="p-8 border rounded-lg cursor-pointer hover-elevate"
                  onClick={() => setCurrentStep("category")}
                  data-testid="card-start-training"
                >
                  <h3 className="text-2xl font-semibold mb-4">Start Training</h3>
                  <p className="text-muted-foreground">
                    Upload videos and get AI-powered feedback to improve your performance.
                  </p>
                </div>

                <div
                  className="p-8 border rounded-lg cursor-pointer hover-elevate"
                  onClick={() => setCurrentStep("leaderboard")}
                  data-testid="card-view-rankings"
                >
                  <h3 className="text-2xl font-semibold mb-4">View Rankings</h3>
                  <p className="text-muted-foreground">
                    See how you stack up against other athletes in your category.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-background">
            {currentStep !== "username" && (
              <Header
                username={userState.username}
                currentStep={currentStep}
                onNavigate={handleNavigate}
                onLogout={handleLogout}
              />
            )}
            <main className="min-h-[calc(100vh-4rem)]">
              {renderCurrentStep()}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
