import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Users,
  TrendingUp,
  Award,
  BookOpen,
  ArrowLeft,
  Shield,
  Download,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, getAllUserProgress } = useAuth();
  const [userProgress, setUserProgress] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/auth");
    } else {
      setUserProgress(getAllUserProgress());
    }
  }, [isAuthenticated, user, navigate, getAllUserProgress]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  // Sample admin user progress data (in real app, this would come from database)
  const sampleProgress = [
    {
      userId: "1",
      userName: "Raj Kumar",
      userEmail: "raj@example.com",
      userRole: "student",
      articlesCompleted: 8,
      booksCompleted: 3,
      videosCompleted: 2,
      totalProgress: 43,
      averageRating: 4.5,
      lastActive: Date.now() - 86400000,
    },
    {
      userId: "2",
      userName: "Priya Singh",
      userEmail: "priya@example.com",
      userRole: "citizen",
      articlesCompleted: 12,
      booksCompleted: 5,
      videosCompleted: 3,
      totalProgress: 67,
      averageRating: 4.7,
      lastActive: Date.now() - 3600000,
    },
    {
      userId: "3",
      userName: "Amit Patel",
      userEmail: "amit@example.com",
      userRole: "student",
      articlesCompleted: 15,
      booksCompleted: 8,
      videosCompleted: 3,
      totalProgress: 87,
      averageRating: 4.8,
      lastActive: Date.now() - 1800000,
    },
    {
      userId: "4",
      userName: "Neha Gupta",
      userEmail: "neha@example.com",
      userRole: "citizen",
      articlesCompleted: 6,
      booksCompleted: 2,
      videosCompleted: 1,
      totalProgress: 30,
      averageRating: 4.2,
      lastActive: Date.now() - 604800000,
    },
  ];

  const displayProgress = userProgress.length > 0 ? userProgress : sampleProgress;

  const totalUsers = displayProgress.length;
  const studentCount = displayProgress.filter(p => p.userRole === "student").length;
  const citizenCount = displayProgress.filter(p => p.userRole === "citizen").length;
  const avgProgress = Math.round(
    displayProgress.reduce((sum, p) => sum + p.totalProgress, 0) / totalUsers
  );
  const avgRating = Math.round(
    (displayProgress.reduce((sum, p) => sum + p.averageRating, 0) / totalUsers) * 10
  ) / 10;

  const roleDistribution = [
    {
      name: "Students",
      value: studentCount,
      fill: "#3b82f6",
    },
    {
      name: "Citizens",
      value: citizenCount,
      fill: "#10b981",
    },
  ];

  const completionData = [
    {
      name: "Articles",
      completed: Math.round(
        displayProgress.reduce((sum, p) => sum + p.articlesCompleted, 0) / totalUsers
      ),
    },
    {
      name: "Books",
      completed: Math.round(
        displayProgress.reduce((sum, p) => sum + p.booksCompleted, 0) / totalUsers
      ),
    },
    {
      name: "Videos",
      completed: Math.round(
        displayProgress.reduce((sum, p) => sum + p.videosCompleted, 0) / totalUsers
      ),
    },
  ];

  const activityData = displayProgress
    .map(p => ({
      name: p.userName.split(" ")[0],
      progress: p.totalProgress,
      rating: p.averageRating,
    }))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-accent/10 p-3">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor all users' learning progress and analytics
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Active learners
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgProgress}%</div>
              <Progress value={avgProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgRating}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Community satisfaction
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                User Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-primary">Students:</span>
                  <span className="font-semibold">{studentCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-secondary">Citizens:</span>
                  <span className="font-semibold">{citizenCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* User Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution by Role</CardTitle>
                  <CardDescription>
                    Students vs Citizens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={roleDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {roleDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Completion Rates */}
              <Card>
                <CardHeader>
                  <CardTitle>Avg Completion by Content Type</CardTitle>
                  <CardDescription>
                    Average items completed per user
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={completionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Users Progress</CardTitle>
                <CardDescription>
                  Detailed view of each user's learning activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Role</th>
                        <th className="text-center py-3 px-4 font-semibold">Progress</th>
                        <th className="text-center py-3 px-4 font-semibold">Rating</th>
                        <th className="text-center py-3 px-4 font-semibold">Articles</th>
                        <th className="text-center py-3 px-4 font-semibold">Books</th>
                        <th className="text-center py-3 px-4 font-semibold">Videos</th>
                        <th className="text-left py-3 px-4 font-semibold">Last Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayProgress.map((user) => (
                        <tr key={user.userId} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4">{user.userName}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.userEmail}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={user.userRole === "student" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}
                            >
                              {user.userRole}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Progress value={user.totalProgress} className="w-16" />
                              <span className="text-sm font-semibold">{user.totalProgress}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center font-semibold">{user.averageRating}</td>
                          <td className="py-3 px-4 text-center">{user.articlesCompleted}</td>
                          <td className="py-3 px-4 text-center">{user.booksCompleted}</td>
                          <td className="py-3 px-4 text-center">{user.videosCompleted}</td>
                          <td className="py-3 px-4 text-muted-foreground text-xs">
                            {new Date(user.lastActive).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Progress Comparison</CardTitle>
                <CardDescription>
                  Progress vs Average Rating by user
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="progress"
                      stroke="#3b82f6"
                      name="Progress %"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="rating"
                      stroke="#f59e0b"
                      name="Avg Rating"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Report</CardTitle>
                <CardDescription>
                  Download admin reports and analytics
                </CardDescription>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export as CSV
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export as PDF
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
