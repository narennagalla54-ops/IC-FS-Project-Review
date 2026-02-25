import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FeedbackModal from "@/components/FeedbackModal";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Play,
  Share2,
  Bookmark,
  MessageSquare,
  Eye,
  Star,
  ThumbsUp,
} from "lucide-react";

interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  youtubeUrl: string;
  youtubeId: string;
  category: "Introduction" | "History" | "Analysis";
  views: number;
  thumbnail?: string;
}

const videosData: Record<string, Video> = {
  "1": {
    id: 1,
    title: "Introduction to Indian Constitution",
    description:
      "A comprehensive introduction to the Indian Constitution, covering its basic structure and fundamental principles. This video provides an excellent starting point for anyone wanting to understand the framework of India's democratic governance. Learn about the Preamble, different parts, and the significance of each.",
    duration: "12:45",
    youtubeUrl: "https://www.youtube.com/watch?v=sDstf8ockUo",
    youtubeId: "sDstf8ockUo",
    category: "Introduction",
    views: 15420,
    thumbnail: "https://img.youtube.com/vi/sDstf8ockUo/maxresdefault.jpg",
  },
  "2": {
    id: 2,
    title: "The Making of Indian Constitution",
    description:
      "Explore the fascinating journey of how the Indian Constitution was drafted and adopted by the Constituent Assembly. Discover the key figures who shaped our Constitution, the debates, deliberations, and the historical context that led to the creation of the world's longest written constitution. Understand the challenges faced and compromises made to ensure unity in diversity.",
    duration: "18:32",
    youtubeUrl: "https://www.youtube.com/watch?v=XrKEtEzqZ7g",
    youtubeId: "XrKEtEzqZ7g",
    category: "History",
    views: 22150,
    thumbnail: "https://img.youtube.com/vi/XrKEtEzqZ7g/maxresdefault.jpg",
  },
  "3": {
    id: 3,
    title: "The Story of Indian Constitution",
    description:
      "Discover the inspiring story behind India's Constitution and its role in shaping modern democracy. This video narrates the compelling narrative of how our Constitution has protected fundamental rights, ensured justice, and promoted liberty for all citizens. Learn how the Constitution continues to evolve and adapt to contemporary challenges.",
    duration: "15:20",
    youtubeUrl: "https://www.youtube.com/watch?v=rhkV7b3et_s",
    youtubeId: "rhkV7b3et_s",
    category: "Analysis",
    views: 18950,
    thumbnail: "https://img.youtube.com/vi/rhkV7b3et_s/maxresdefault.jpg",
  },
};

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, addBookmark, markItemAsViewed, feedbacks } =
    useAuth();
  const { toast } = useToast();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const video = videosData[id || "1"];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Video not found</h1>
        <Link to="/videos">
          <Button>Back to Videos</Button>
        </Link>
      </div>
    );
  }

  const handleWatch = () => {
    if (isAuthenticated) {
      markItemAsViewed(video.id, "video");
    }
    window.open(video.youtubeUrl, "_blank");
    toast({
      title: "Opening Video",
      description: "The video will open in a new tab.",
    });
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to bookmark videos.",
        variant: "destructive",
      });
      return;
    }

    addBookmark({
      id: video.id,
      type: "video",
      title: video.title,
      timestamp: Date.now(),
    });

    toast({
      title: "Bookmarked!",
      description: "This video has been saved to your bookmarks.",
    });
  };

  const handleShare = () => {
    const text = `Check out this video: ${video.title} - ${video.youtubeUrl}`;
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: video.youtubeUrl,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Link Copied",
        description: "Video link has been copied to clipboard.",
      });
    }
  };

  const handleFeedback = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to provide feedback.",
        variant: "destructive",
      });
      return;
    }
    setFeedbackOpen(true);
  };

  // Get feedbacks for this video
  const videoFeedbacks = feedbacks.filter(
    (f) => f.itemId === video.id && f.type === "video"
  );

  const averageRating =
    videoFeedbacks.length > 0
      ? Math.round(
          (videoFeedbacks.reduce((sum, f) => sum + f.rating, 0) /
            videoFeedbacks.length) *
            10
        ) / 10
      : 0;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Introduction":
        return "bg-primary/10 text-primary border-primary/20";
      case "History":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "Analysis":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />
      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        itemId={video.id}
        itemTitle={video.title}
        itemType="video"
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Link
          to="/videos"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Videos
        </Link>

        <Card className="border-border/50 shadow-lg mb-8">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <Badge className={getCategoryColor(video.category)}>
                {video.category}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={handleBookmark} className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-accent/10 p-2">
                  <Play className="h-5 w-5 text-accent" />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{video.duration}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {video.views.toLocaleString()} views
                  </span>
                </div>
              </div>
              <CardTitle className="text-3xl">{video.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">{video.description}</p>

            {/* Watch Button */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button onClick={handleWatch} size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                Watch Video on YouTube
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <Card className="border-border/50 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  Community Feedback
                </CardTitle>
                <CardDescription>
                  {videoFeedbacks.length} people have reviewed this video
                </CardDescription>
              </div>
              <Button onClick={handleFeedback} className="gap-2" disabled={!isAuthenticated}>
                <MessageSquare className="h-4 w-4" />
                {isAuthenticated ? "Leave Feedback" : "Sign In to Review"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating Summary */}
            {videoFeedbacks.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <Card className="bg-muted/50 border-border/50">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="mb-2 flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold">{averageRating}</span>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.round(averageRating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {videoFeedbacks.length} review
                        {videoFeedbacks.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50 border-border/50">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const count = videoFeedbacks.filter(
                          (f) => f.rating === stars
                        ).length;
                        const percentage =
                          videoFeedbacks.length > 0
                            ? Math.round((count / videoFeedbacks.length) * 100)
                            : 0;
                        return (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {stars} star{stars !== 1 ? "s" : ""}
                            </span>
                            <div className="flex-1 h-2 bg-muted rounded">
                              <div
                                className="h-full bg-yellow-400 rounded transition-all"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : null}

            {/* Reviews List */}
            <div className="space-y-4">
              {videoFeedbacks.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground mb-4">
                    No reviews yet. Be the first to share your thoughts!
                  </p>
                  <Button onClick={handleFeedback} disabled={!isAuthenticated}>
                    Write a Review
                  </Button>
                </div>
              ) : (
                videoFeedbacks.map((feedback) => (
                  <Card key={feedback.id} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex gap-1 mb-1">
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
                          <p className="text-sm text-muted-foreground">
                            {new Date(feedback.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                      </div>
                      {feedback.comment && (
                        <p className="text-sm text-foreground mt-2">
                          {feedback.comment}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Related Content */}
        <div className="rounded-lg border border-border/50 bg-muted/30 p-6">
          <h3 className="mb-3 font-semibold text-foreground">Explore More</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/videos">
              <Button variant="outline">All Videos</Button>
            </Link>
            <Link to="/articles">
              <Button variant="outline">Read Articles</Button>
            </Link>
            <Link to="/books">
              <Button variant="outline">Browse Books</Button>
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard">
                <Button variant="outline">View Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
