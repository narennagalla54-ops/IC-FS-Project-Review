import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import PDFViewer from "@/components/PDFViewer";
import AIAssistant from "@/components/AIAssistant";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  Brain,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const StudentMode = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, getLearningPath } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; url: string } | null>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.mode !== "student") {
      navigate("/mode-selection");
    }
  }, [isAuthenticated, user?.mode, navigate]);

  if (!isAuthenticated || user?.mode !== "student") {
    return null;
  }

  const learningPath = getLearningPath();

  const mcqs = [
    {
      id: 1,
      topic: "Fundamental Rights",
      difficulty: "Beginner",
      questions: 20,
      completed: 12,
      score: 85,
      mcqLink: "https://saiindia.gov.in/uploads/media/MCQ-s-20210330161759.pdf",
    },
    {
      id: 2,
      topic: "Directive Principles",
      difficulty: "Intermediate",
      questions: 25,
      completed: 15,
      score: 78,
      mcqLink: "https://saiindia.gov.in/uploads/media/MCQ-s-20210330161759.pdf",
    },
    {
      id: 3,
      topic: "Constitutional Amendments",
      difficulty: "Advanced",
      questions: 30,
      completed: 8,
      score: 72,
      mcqLink: "https://saiindia.gov.in/uploads/media/MCQ-s-20210330161759.pdf",
    },
    {
      id: 4,
      topic: "Preamble & Articles",
      difficulty: "Beginner",
      questions: 15,
      completed: 15,
      score: 95,
      mcqLink: "https://saiindia.gov.in/uploads/media/MCQ-s-20210330161759.pdf",
    },
  ];

  const notes = [
    {
      id: 1,
      title: "Part III - Fundamental Rights",
      chapters: 12,
      pages: 156,
      downloadable: true,
      downloadLink: "https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2023/05/2023050195.pdf",
    },
    {
      id: 2,
      title: "Part IV - Directive Principles of State Policy",
      chapters: 8,
      pages: 98,
      downloadable: true,
      downloadLink: "https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2023/05/2023050195.pdf",
    },
    {
      id: 3,
      title: "The Preamble",
      chapters: 1,
      pages: 24,
      downloadable: true,
      downloadLink: "https://cdnbbsr.s3waas.gov.in/s380537a945c7aaa788ccfcdf1b99b5d8f/uploads/2023/05/2023050195.pdf",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Essay: Rights and Responsibilities",
      dueDate: "2025-12-15",
      status: "pending",
      marks: 100,
    },
    {
      id: 2,
      title: "Short Answer: Constitutional Structure",
      dueDate: "2025-12-08",
      status: "submitted",
      marks: 50,
    },
    {
      id: 3,
      title: "Quiz: Articles 1-50",
      dueDate: "2025-12-22",
      status: "pending",
      marks: 75,
    },
  ];

  const exams = [
    {
      id: 1,
      name: "Mock Exam 1",
      totalQuestions: 50,
      duration: 120,
      bestScore: 78,
      attempts: 2,
      testLink: "https://judicialcompetitiontimes.in/Tests?testcode=Constitution-2&testname=Constitution-of-India-Model-Test-Paper-2",
    },
    {
      id: 2,
      name: "Mid-Term Practice Test",
      totalQuestions: 40,
      duration: 90,
      bestScore: 82,
      attempts: 3,
      testLink: "https://judicialcompetitiontimes.in/Tests?testcode=Constitution-2&testname=Constitution-of-India-Model-Test-Paper-2",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                Student Mode
              </h1>
              <p className="text-muted-foreground">
                Ace your constitutional law exams
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{learningPath.totalProgress}%</div>
              <Progress value={learningPath.totalProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                MCQs Attempted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mcqs.reduce((sum, q) => sum + q.completed, 0)}/{mcqs.reduce((sum, q) => sum + q.questions, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Total questions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mcqs.reduce((sum, q) => sum + q.score, 0) / mcqs.length)}%
              </div>
              <p className="text-xs text-muted-foreground mt-2">Across all tests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground mt-2">Days in a row</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mcqs">MCQs</TabsTrigger>
            <TabsTrigger value="notes">Study Notes</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Quick Start */}
              <Card>
                <CardHeader>
                  <CardTitle>Get Started</CardTitle>
                  <CardDescription>
                    Begin your exam preparation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2 justify-start" variant="outline">
                    <Brain className="h-4 w-4" />
                    Start MCQ Practice
                  </Button>
                  <Button className="w-full gap-2 justify-start" variant="outline">
                    <BookOpen className="h-4 w-4" />
                    Download Study Notes
                  </Button>
                  <Button className="w-full gap-2 justify-start" variant="outline">
                    <ClipboardList className="h-4 w-4" />
                    Review Assignments
                  </Button>
                  <Button 
                    className="w-full gap-2 justify-start" 
                    variant="outline"
                    onClick={() => navigate("/assessment-review")}
                  >
                    <Award className="h-4 w-4" />
                    View Assessment Review
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your recent study sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">Completed MCQ: Fundamental Rights</p>
                        <p className="text-xs text-muted-foreground">Score: 85%</p>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">Downloaded: Part III Notes</p>
                        <p className="text-xs text-muted-foreground">156 pages</p>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-sm">Attempted Mock Exam 1</p>
                        <p className="text-xs text-muted-foreground">78% score</p>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Assistant Section */}
            <div>
              <AIAssistant />
            </div>
          </TabsContent>

          {/* MCQs Tab */}
          <TabsContent value="mcqs" className="space-y-6">
            {mcqs.map((mcq) => (
              <Card key={mcq.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{mcq.topic}</CardTitle>
                      <CardDescription className="mt-1">
                        {mcq.questions} questions • {mcq.difficulty}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{mcq.score}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {mcq.completed}/{mcq.questions}
                      </span>
                    </div>
                    <Progress value={(mcq.completed / mcq.questions) * 100} />
                  </div>
                  <Button className="w-full gap-2">
                    <a href={mcq.mcqLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                      <Brain className="h-4 w-4" />
                      Continue Practice
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Study Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            {notes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    {note.title}
                  </CardTitle>
                  <CardDescription>
                    {note.chapters} chapters • {note.pages} pages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => {
                        setSelectedPdf({ title: note.title, url: note.downloadLink });
                        setPdfViewerOpen(true);
                      }}
                    >
                      <BookOpen className="h-4 w-4" />
                      Read Online
                    </Button>
                    {note.downloadable && (
                      <a href={note.downloadLink} target="_blank" rel="noopener noreferrer" download>
                        <Button variant="outline" className="gap-2">
                          Download PDF
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams" className="space-y-6">
            {exams.map((exam) => (
              <Card key={exam.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-accent" />
                        {exam.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {exam.totalQuestions} questions • {exam.duration} mins
                      </CardDescription>
                    </div>
                    <Badge className="bg-accent/10 text-accent">
                      Best: {exam.bestScore}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Attempts: {exam.attempts}
                  </div>
                  <Button className="w-full gap-2">
                    <a href={exam.testLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full">
                      <Award className="h-4 w-4" />
                      Take Exam Again
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* PDF Viewer Modal */}
        {selectedPdf && (
          <PDFViewer
            isOpen={pdfViewerOpen}
            onClose={() => {
              setPdfViewerOpen(false);
              setSelectedPdf(null);
            }}
            title={selectedPdf.title}
            pdfUrl={selectedPdf.url}
          />
        )}
      </div>
    </div>
  );
};

export default StudentMode;
