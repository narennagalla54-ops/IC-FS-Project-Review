import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import UserAssistant from "@/components/UserAssistant";
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
  LineChart,
  Line,
} from "recharts";
import {
  BookOpen,
  Bookmark,
  MessageSquare,
  TrendingUp,
  Award,
  Star,
  ArrowRight,
  HelpCircle,
  Play,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, bookmarks, feedbacks, getLearningPath, isAuthenticated } = useAuth();
  const [assistantOpen, setAssistantOpen] = useState(false);

  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }

  const learningPath = getLearningPath();

  // Sample data for charts
  const learningData = [
    { name: "Articles", completed: learningPath.articlesCompleted, target: 15 },
    { name: "Books", completed: learningPath.booksCompleted, target: 10 },
    { name: "Videos", completed: learningPath.videosCompleted, target: 3 },
  ];

  const feedbackData = [
    { name: "Week 1", rating: 4.2, reviews: 8 },
    { name: "Week 2", rating: 4.5, reviews: 12 },
    { name: "Week 3", rating: 4.3, reviews: 10 },
    { name: "Week 4", rating: 4.7, reviews: 15 },
  ];

  const topArticles = [
    {
      id: 1,
      title: "Equality before law",
      rating: 4.8,
      reviews: 42,
      category: "Fundamental Rights",
    },
    {
      id: 14,
      title: "Protection of life and personal liberty",
      rating: 4.6,
      reviews: 38,
      category: "Fundamental Rights",
    },
    {
      id: 19,
      title: "Freedom of speech and expression",
      rating: 4.9,
      reviews: 45,
      category: "Fundamental Rights",
    },
  ];

  const topBooks = [
    {
      id: 1,
      title: "The Constitution of India",
      rating: 4.7,
      reviews: 28,
      author: "Government of India",
    },
    {
      id: 2,
      title: "Indian Constitutional Law",
      rating: 4.5,
      reviews: 22,
      author: "M.P. Jain",
    },
    {
      id: 3,
      title: "Ambedkar and the Constitution",
      rating: 4.8,
      reviews: 31,
      author: "Christophe Jaffrelot",
    },
  ];

  const topVideos = [
    {
      id: 1,
      title: "Introduction to Indian Constitution",
      rating: 4.9,
      reviews: 34,
      duration: "12:45",
    },
    {
      id: 2,
      title: "The Making of Indian Constitution",
      rating: 4.7,
      reviews: 28,
      duration: "18:32",
    },
    {
      id: 3,
      title: "The Story of Indian Constitution",
      rating: 4.6,
      reviews: 25,
      duration: "15:20",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />
      <UserAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Track your learning journey and explore constitutional knowledge
            </p>
          </div>
          <Button
            onClick={() => setAssistantOpen(true)}
            variant="outline"
            className="gap-2"
          >
            <HelpCircle className="h-4 w-4" />
            Need Help?
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Overall Progress
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
                Items Viewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {learningPath.articlesCompleted +
                  learningPath.booksCompleted +
                  learningPath.videosCompleted}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Keep learning!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {learningPath.averageRating}
                </span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {feedbacks.length} reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Bookmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookmarks.length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Saved for later
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="learning-path" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
            <TabsTrigger value="feedback">Feedback & Ratings</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          </TabsList>

          {/* Learning Path Tab */}
          <TabsContent value="learning-path" className="space-y-6">
            {/* Learning Categories */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Completed
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {learningPath.articlesCompleted}/15
                        </span>
                      </div>
                      <Progress
                        value={(learningPath.articlesCompleted / 15) * 100}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/articles")}
                    >
                      Explore Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-secondary" />
                    Books
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Completed
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {learningPath.booksCompleted}/10
                        </span>
                      </div>
                      <Progress
                        value={(learningPath.booksCompleted / 10) * 100}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/books")}
                    >
                      Browse Books
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Play className="h-5 w-5 text-accent" />
                    Videos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Completed
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {learningPath.videosCompleted}/3
                        </span>
                      </div>
                      <Progress
                        value={(learningPath.videosCompleted / 3) * 100}
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/videos")}
                    >
                      Watch Videos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Learning Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress Overview</CardTitle>
                <CardDescription>
                  Track your progress across different content types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={learningData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                    <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Rated Articles */}
            <Card>
              <CardHeader>
                <CardTitle>Top Rated Articles</CardTitle>
                <CardDescription>
                  Most appreciated content from our community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topArticles.map((article) => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between border-b pb-4 last:border-b-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {article.title}
                        </h4>
                        <Badge variant="outline" className="mt-1">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {article.rating}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {article.reviews} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            {/* Feedback Analytics Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Your Feedback Trend</CardTitle>
                <CardDescription>
                  Average rating and review count over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={feedbackData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="rating"
                      stroke="#f59e0b"
                      name="Avg Rating"
                    />
                    <Line
                      type="monotone"
                      dataKey="reviews"
                      stroke="#3b82f6"
                      name="Reviews Count"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Feedback Submitted</CardTitle>
                <CardDescription>
                  Your latest reviews and ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {feedbacks.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">
                      No feedback submitted yet. Start by reviewing your favorite
                      articles and books!
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => navigate("/articles")}
                    >
                      Browse Articles
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {feedbacks.slice(0, 5).map((feedback) => (
                      <div
                        key={feedback.id}
                        className="border-b pb-4 last:border-b-0"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-foreground">
                              {feedback.title}
                            </h4>
                            <Badge variant="outline" className="text-xs mt-1">
                              {feedback.type}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < feedback.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {feedback.comment && (
                          <p className="text-sm text-muted-foreground">
                            {feedback.comment}
                          </p>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(feedback.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Books with Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Top Rated Books</CardTitle>
                <CardDescription>
                  Community favorites in our library
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topBooks.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center justify-between border-b pb-4 last:border-b-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {book.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          by {book.author}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {book.rating}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {book.reviews} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Videos with Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-accent" />
                  Top Rated Videos
                </CardTitle>
                <CardDescription>
                  Most appreciated educational videos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center justify-between border-b pb-4 last:border-b-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {video.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {video.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {video.rating}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {video.reviews} reviews
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/video/${video.id}`)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookmarks Tab */}
          <TabsContent value="bookmarks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Bookmarked Items</CardTitle>
                <CardDescription>
                  Items you've saved for later reference
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookmarks.length === 0 ? (
                  <div className="text-center py-8">
                    <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">
                      No bookmarks yet. Bookmark your favorite articles and
                      books!
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => navigate("/articles")}
                    >
                      Start Exploring
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookmarks.map((bookmark, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border-b pb-3 last:border-b-0"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">
                            {bookmark.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {bookmark.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(bookmark.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/${bookmark.type === "article" ? "articles" : "books"}/${bookmark.id}`
                            )
                          }
                        >
                          Open
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievements Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>
              Milestones you've reached in your learning journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {learningPath.totalProgress >= 25 && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="font-semibold text-sm">Quarter Way</p>
                  <p className="text-xs text-muted-foreground">
                    25% progress achieved
                  </p>
                </div>
              )}
              {feedbacks.length >= 5 && (
                <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4 text-center">
                  <div className="text-2xl mb-2">💬</div>
                  <p className="font-semibold text-sm">Reviewer</p>
                  <p className="text-xs text-muted-foreground">
                    5 feedbacks submitted
                  </p>
                </div>
              )}
              {bookmarks.length >= 10 && (
                <div className="rounded-lg border border-accent/20 bg-accent/5 p-4 text-center">
                  <div className="text-2xl mb-2">🔖</div>
                  <p className="font-semibold text-sm">Collector</p>
                  <p className="text-xs text-muted-foreground">
                    10 bookmarks saved
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
