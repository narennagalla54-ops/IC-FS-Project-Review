import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  Brain,
  ArrowLeft,
  Download,
} from "lucide-react";

const StudentAssessmentReview = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.mode !== "student") {
      navigate("/mode-selection");
    }
  }, [isAuthenticated, user?.mode, navigate]);

  if (!isAuthenticated || user?.mode !== "student") {
    return null;
  }

  // Sample assessment data
  const assessmentData = {
    testName: "Mock Exam 1 - Constitution of India",
    totalQuestions: 50,
    correctAnswers: 39,
    wrongAnswers: 11,
    score: 78,
    passingScore: 60,
    duration: "120 minutes",
    timeTaken: "95 minutes",
    date: "2025-11-29",
  };

  const topicWisePerformance = [
    { topic: "Fundamental Rights", correct: 8, total: 10, percentage: 80 },
    { topic: "Directive Principles", correct: 7, total: 8, percentage: 87 },
    { topic: "Constitutional Structure", correct: 9, total: 10, percentage: 90 },
    { topic: "Amendment Procedures", correct: 5, total: 8, percentage: 62 },
    { topic: "Federal System", correct: 10, total: 14, percentage: 71 },
  ];

  const performanceOverTime = [
    { name: "Attempt 1", score: 72 },
    { name: "Attempt 2", score: 78 },
  ];

  const answers = [
    {
      questionNo: 1,
      question: "Which part of the Constitution contains Fundamental Rights?",
      yourAnswer: "Part III",
      correctAnswer: "Part III",
      status: "correct",
      explanation:
        "Part III of the Indian Constitution (Articles 12-35) contains the Fundamental Rights granted to the citizens of India.",
    },
    {
      questionNo: 2,
      question: "Who is the guardian of the Constitution?",
      yourAnswer: "President",
      correctAnswer: "Supreme Court",
      status: "incorrect",
      explanation:
        "The Supreme Court is the guardian of the Constitution as it has the power of judicial review. The President is the executive head.",
    },
    {
      questionNo: 3,
      question: "What is the maximum number of states that can be created in India?",
      yourAnswer: "No limit",
      correctAnswer: "Parliament can create any number",
      status: "correct",
      explanation:
        "The Parliament has the power to create, abolish, or change the boundaries of states.",
    },
    {
      questionNo: 4,
      question: "Which article deals with Right to Equality?",
      yourAnswer: "Article 14",
      correctAnswer: "Article 14",
      status: "correct",
      explanation: "Article 14 guarantees equality before the law and equal protection to all citizens.",
    },
    {
      questionNo: 5,
      question: "What is the tenure of a judge of the Supreme Court?",
      yourAnswer: "6 years",
      correctAnswer: "Until 65 years of age",
      status: "incorrect",
      explanation:
        "A judge of the Supreme Court holds office until they attain the age of 65 years.",
    },
  ];

  const scoreColor =
    assessmentData.score >= assessmentData.passingScore ? "text-green-500" : "text-red-500";

  const chartData = topicWisePerformance.map((t) => ({
    topic: t.topic.substring(0, 12),
    correct: t.correct,
    incorrect: t.total - t.correct,
  }));

  const scoreDistribution = [
    { name: "Correct", value: assessmentData.correctAnswers, fill: "#10b981" },
    { name: "Incorrect", value: assessmentData.wrongAnswers, fill: "#ef4444" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate("/student-mode")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Student Mode
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl mb-2">
            Assessment Review
          </h1>
          <p className="text-muted-foreground">
            Detailed analysis of your {assessmentData.testName}
          </p>
        </div>

        {/* Score Overview */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Your Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${scoreColor}`}>
                {assessmentData.score}%
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={assessmentData.score >= assessmentData.passingScore ? "default" : "destructive"}>
                  {assessmentData.score >= assessmentData.passingScore ? "Passed" : "Failed"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Correct Answers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">
                {assessmentData.correctAnswers}/{assessmentData.totalQuestions}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round((assessmentData.correctAnswers / assessmentData.totalQuestions) * 100)}% accuracy
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Time Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{assessmentData.timeTaken}</div>
              <p className="text-xs text-muted-foreground mt-2">
                out of {assessmentData.duration}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Passing Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {assessmentData.passingScore}%
              </div>
              <p className="text-xs text-muted-foreground mt-2">Required to pass</p>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Tabs */}
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="topicwise">Topic-wise</TabsTrigger>
            <TabsTrigger value="answers">Answers</TabsTrigger>
            <TabsTrigger value="improvements">Improvements</TabsTrigger>
          </TabsList>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Score Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                  <CardDescription>
                    Correct vs Incorrect Answers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={scoreDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {scoreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Performance Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>
                    Your score across attempts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        name="Score %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Topic-wise Tab */}
          <TabsContent value="topicwise" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic-wise Performance</CardTitle>
                <CardDescription>
                  Your performance in each topic
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="correct" fill="#10b981" name="Correct" />
                    <Bar dataKey="incorrect" fill="#ef4444" name="Incorrect" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {topicWisePerformance.map((topic) => (
                <Card key={topic.topic}>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{topic.topic}</h3>
                          <p className="text-sm text-muted-foreground">
                            {topic.correct} out of {topic.total} correct
                          </p>
                        </div>
                        <Badge
                          variant={topic.percentage >= 75 ? "default" : "secondary"}
                        >
                          {topic.percentage}%
                        </Badge>
                      </div>
                      <Progress value={topic.percentage} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Answers Tab */}
          <TabsContent value="answers" className="space-y-6">
            {answers.map((answer) => (
              <Card
                key={answer.questionNo}
                className={
                  answer.status === "correct"
                    ? "border-green-200 bg-green-50/50"
                    : "border-red-200 bg-red-50/50"
                }
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      {answer.status === "correct" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div>
                        <CardTitle className="text-base">
                          Q{answer.questionNo}. {answer.question}
                        </CardTitle>
                      </div>
                    </div>
                    <Badge
                      variant={answer.status === "correct" ? "default" : "destructive"}
                    >
                      {answer.status === "correct" ? "Correct" : "Incorrect"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-background/50 p-3 rounded border">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        Your Answer
                      </p>
                      <p className="text-sm">{answer.yourAnswer}</p>
                    </div>
                    {answer.status === "incorrect" && (
                      <div className="bg-green-500/10 p-3 rounded border border-green-500/20">
                        <p className="text-xs font-semibold text-green-700 mb-1">
                          Correct Answer
                        </p>
                        <p className="text-sm text-green-900">{answer.correctAnswer}</p>
                      </div>
                    )}
                  </div>
                  <div className="bg-blue-50 p-4 rounded border border-blue-200">
                    <p className="text-xs font-semibold text-blue-900 mb-2">
                      Explanation
                    </p>
                    <p className="text-sm text-blue-800">{answer.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Improvements Tab */}
          <TabsContent value="improvements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
                <CardDescription>
                  Focus on these topics to improve your score
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topicWisePerformance
                  .filter((t) => t.percentage < 75)
                  .sort((a, b) => a.percentage - b.percentage)
                  .map((topic) => (
                    <div
                      key={topic.topic}
                      className="p-4 border rounded-lg bg-amber-50 border-amber-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-amber-900">
                          {topic.topic}
                        </h3>
                        <Badge variant="outline" className="bg-amber-100 text-amber-900">
                          {topic.percentage}%
                        </Badge>
                      </div>
                      <p className="text-sm text-amber-800 mb-3">
                        You answered {topic.correct} out of {topic.total} questions correctly.
                        Review the study materials to improve.
                      </p>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Brain className="h-4 w-4" />
                        Study {topic.topic}
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strong Areas</CardTitle>
                <CardDescription>
                  Topics where you performed well
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topicWisePerformance
                  .filter((t) => t.percentage >= 75)
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((topic) => (
                    <div key={topic.topic} className="p-4 border rounded-lg bg-green-50 border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-green-900 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          {topic.topic}
                        </h3>
                        <Badge variant="outline" className="bg-green-100 text-green-900">
                          {topic.percentage}%
                        </Badge>
                      </div>
                      <p className="text-sm text-green-800">
                        Excellent! You have a strong understanding of this topic.
                      </p>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-1 flex-shrink-0">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Review weak topics</p>
                    <p className="text-sm text-muted-foreground">
                      Focus on Amendment Procedures and Federal System for your next attempt.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-1 flex-shrink-0">
                    <Download className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Download study materials</p>
                    <p className="text-sm text-muted-foreground">
                      Get detailed study notes for topics where you need improvement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2 mt-1 flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Practice more MCQs</p>
                    <p className="text-sm text-muted-foreground">
                      Consistent practice will help you achieve a better score next time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Button */}
        <div className="mt-8 flex gap-3">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download Report (PDF)
          </Button>
          <Button variant="outline" onClick={() => navigate("/student-mode")} className="gap-2">
            Take Another Test
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentAssessmentReview;
