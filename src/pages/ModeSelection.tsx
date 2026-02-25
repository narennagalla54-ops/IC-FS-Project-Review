import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Shield } from "lucide-react";
import { useEffect } from "react";

const ModeSelection = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, setUserMode } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleSelectMode = (mode: "student" | "citizen") => {
    setUserMode(mode);
    if (user && (user.role as string) === "admin") {
      navigate("/admin");
    } else if (mode === "student") {
      navigate("/student-mode");
    } else {
      navigate("/citizen-mode");
    }
  };

  // Admin goes directly to admin dashboard
  if (user && (user.role as string) === "admin") {
    navigate("/admin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Welcome, {user?.name}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your learning path to get started
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Student Mode */}
          <Card className="group border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer">
            <CardHeader className="pb-4">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Student Mode</CardTitle>
              <CardDescription>
                Master the Constitution for your studies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">What you'll get:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span>Interactive MCQs and quizzes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span>Study notes for exams</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span>Practice papers and assignments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span>Progress tracking and analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span>Expert explanations</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={() => handleSelectMode("student")}
                size="lg"
                className="w-full group-hover:bg-primary/90"
              >
                Enter Student Mode
              </Button>
            </CardContent>
          </Card>

          {/* Citizen Mode */}
          <Card className="group border-2 border-secondary/20 hover:border-secondary/50 transition-all hover:shadow-lg cursor-pointer">
            <CardHeader className="pb-4">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-secondary/10 p-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Citizen Mode</CardTitle>
              <CardDescription>
                Understand your rights and duties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">What you'll get:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    <span>Fundamental Rights & Duties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    <span>Right to Information (RTI)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    <span>Voting Rights & Elections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    <span>Citizen responsibilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-secondary flex-shrink-0" />
                    <span>Easy-to-understand guides</span>
                  </li>
                </ul>
              </div>
              <Button
                onClick={() => handleSelectMode("citizen")}
                size="lg"
                className="w-full bg-secondary hover:bg-secondary/90"
              >
                Enter Citizen Mode
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Admin Notice */}
        {user && (user.role as string) === "admin" && (
          <div className="mt-12 text-center">
            <Card className="border-accent/20 bg-accent/5 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">Admin Access</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You have administrative access to view all users' progress and analytics.
                </p>
                <Button onClick={() => navigate("/admin")} variant="outline">
                  Go to Admin Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeSelection;
