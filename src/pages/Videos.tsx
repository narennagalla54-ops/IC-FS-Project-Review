import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import FeedbackModal from "@/components/FeedbackModal";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/translations";
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
import { ArrowLeft, Play, MessageSquare, Bookmark, Share2, Eye } from "lucide-react";

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

const videos: Video[] = [
  {
    id: 1,
    title: "Introduction to Indian Constitution",
    description: "A comprehensive introduction to the Indian Constitution, covering its basic structure and fundamental principles.",
    duration: "12:45",
    youtubeUrl: "https://www.youtube.com/watch?v=sDstf8ockUo",
    youtubeId: "sDstf8ockUo",
    category: "Introduction",
    views: 15420,
    thumbnail: "https://img.youtube.com/vi/sDstf8ockUo/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "The Making of Indian Constitution",
    description: "Explore the fascinating journey of how the Indian Constitution was drafted and adopted by the Constituent Assembly.",
    duration: "18:32",
    youtubeUrl: "https://www.youtube.com/watch?v=XrKEtEzqZ7g",
    youtubeId: "XrKEtEzqZ7g",
    category: "History",
    views: 22150,
    thumbnail: "https://img.youtube.com/vi/XrKEtEzqZ7g/maxresdefault.jpg",
  },
  {
    id: 3,
    title: "The Story of Indian Constitution",
    description: "Discover the inspiring story behind India's Constitution and its role in shaping modern democracy.",
    duration: "15:20",
    youtubeUrl: "https://www.youtube.com/watch?v=rhkV7b3et_s",
    youtubeId: "rhkV7b3et_s",
    category: "Analysis",
    views: 18950,
    thumbnail: "https://img.youtube.com/vi/rhkV7b3et_s/maxresdefault.jpg",
  },
];

const Videos = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isAuthenticated, addBookmark, markItemAsViewed } = useAuth();
  const { toast } = useToast();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const t = (key: string) => getTranslation(language, key, key);

  const handleVideoClick = (video: Video) => {
    if (isAuthenticated) {
      markItemAsViewed(video.id, "video");
    }
    // Open video detail page
    navigate(`/video/${video.id}`);
  };

  const handleBookmark = (video: Video) => {
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

  const handleShare = (video: Video) => {
    const text = `Check out this video: ${video.title} - ${video.youtubeUrl}`;
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: video.youtubeUrl,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      toast({
        title: "Link Copied",
        description: "Video link has been copied to clipboard.",
      });
    }
  };

  const handleFeedback = (video: Video) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to provide feedback.",
        variant: "destructive",
      });
      return;
    }
    setSelectedVideo({ id: video.id, title: video.title });
    setFeedbackOpen(true);
  };

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
        itemId={selectedVideo?.id || 0}
        itemTitle={selectedVideo?.title || ""}
        itemType="video"
      />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-accent/10 p-3">
              <Play className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                Constitutional Videos
              </h1>
              <p className="text-muted-foreground">
                Learn about the Indian Constitution through engaging video content
              </p>
            </div>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col">
              <Card className="group h-full border-border/50 transition-all hover:border-accent/30 hover:shadow-lg">
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-black">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-40 w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() => handleVideoClick(video)}
                      className="rounded-full bg-accent p-3 text-white hover:bg-accent/90 transition-colors"
                      title="Open video"
                    >
                      <Play className="h-6 w-6 fill-current" />
                    </button>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                    {video.duration}
                  </div>
                </div>

                <CardHeader className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <Badge className={getCategoryColor(video.category)}>
                      {video.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-accent">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {video.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 border-t pt-4">
                  {/* Views */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span>{video.views.toLocaleString()} views</span>
                  </div>

                  {/* Description Expand */}
                  {expandedVideo === video.id && (
                    <p className="text-sm text-muted-foreground">
                      {video.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => handleVideoClick(video)}
                    >
                      <Play className="h-4 w-4" />
                      Watch
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBookmark(video)}
                      title="Bookmark"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(video)}
                      title="Share"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Feedback Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => handleFeedback(video)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Rate & Review
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 rounded-lg border border-border/50 bg-muted/30 p-6">
          <h3 className="mb-3 font-semibold text-foreground">
            📚 Learn at Your Own Pace
          </h3>
          <p className="text-sm text-muted-foreground">
            These videos are designed to help you understand different aspects of the Indian Constitution. Watch them in any order, bookmark your favorites, and share your feedback to help us improve.
          </p>
        </div>

        {/* Explore More */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/articles">
            <Button variant="outline">
              Read Articles
            </Button>
          </Link>
          <Link to="/books">
            <Button variant="outline">
              Browse Books
            </Button>
          </Link>
          {isAuthenticated && (
            <Link to="/dashboard">
              <Button variant="outline">
                View Learning Path
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;
