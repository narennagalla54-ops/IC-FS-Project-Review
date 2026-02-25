import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Share2, MessageSquare, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import FeedbackModal from "@/components/FeedbackModal";
import Header from "@/components/Header";

// Extended article data
const articlesData: Record<string, any> = {
  "1": {
    number: "Article 1",
    title: "Name and territory of the Union",
    category: "Basic",
    content: `India, that is Bharat, shall be a Union of States.

The territory of India shall comprise:
(a) the territories of the States;
(b) the Union territories specified in the First Schedule; and
(c) such other territories as may be acquired.

This article establishes India as a Union of States and defines its territorial boundaries. It emphasizes that India is not a federation but a Union, signifying the indestructibility of the country.`,
  },
  "14": {
    number: "Article 14",
    title: "Equality before law",
    category: "Fundamental Rights",
    content: `The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.

This article is the foundation of equality in India and ensures that:
- Every person, citizen or non-citizen, is equal before law
- The State cannot deny equal protection of laws
- No person or class of persons shall be privileged

However, reasonable classification is permitted if:
- The classification is based on intelligible differentia
- The differentia has a rational relation to the object sought to be achieved

This article embodies the principle that all persons in similar circumstances shall be treated alike both in privileges conferred and liabilities imposed.`,
  },
  "21": {
    number: "Article 21",
    title: "Protection of life and personal liberty",
    category: "Fundamental Rights",
    content: `No person shall be deprived of his life or personal liberty except according to procedure established by law.

This is one of the most important fundamental rights. The Supreme Court has interpreted this article expansively to include:
- Right to live with human dignity
- Right to food, water, and shelter
- Right to education
- Right to privacy
- Right to a clean environment
- Right to healthcare
- Right to speedy trial

The "procedure established by law" must be just, fair, and reasonable. Any law depriving a person of life or personal liberty must stand the test of Article 14 (equality before law).`,
  },
};

const ArticleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { isAuthenticated, addBookmark, markItemAsViewed } = useAuth();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const article = articlesData[id || "1"];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const handleShare = () => {
    toast({
      title: "Link Copied",
      description: "Article link has been copied to clipboard.",
    });
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to bookmark articles.",
        variant: "destructive",
      });
      return;
    }

    addBookmark({
      id: parseInt(id || "1"),
      type: "article",
      title: article.title,
      timestamp: Date.now(),
    });

    toast({
      title: "Bookmarked!",
      description: "This article has been saved to your bookmarks.",
    });
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

  // Mark as viewed when component mounts
  useState(() => {
    if (isAuthenticated) {
      markItemAsViewed(parseInt(id || "1"), "article");
    }
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Basic":
        return "bg-primary/10 text-primary border-primary/20";
      case "Fundamental Rights":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "Duties":
        return "bg-accent/10 text-accent border-accent/20";
      case "Advanced":
        return "bg-gold/10 text-gold border-gold/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Article not found</h1>
        <Link to="/articles">
          <Button>Back to Articles</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />
      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        itemId={parseInt(id || "1")}
        itemTitle={article.title}
        itemType="article"
      />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Link to="/articles" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Articles
        </Link>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <Badge className={getCategoryColor(article.category)}>{article.category}</Badge>
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
              <div className="mb-2 flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <span className="text-lg font-semibold text-primary">{article.number}</span>
              </div>
              <CardTitle className="text-3xl">{article.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="prose prose-neutral max-w-none dark:prose-invert">
            <div className="whitespace-pre-line text-foreground leading-relaxed">
              {article.content}
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        <div className="mt-8 rounded-lg border border-border/50 bg-gradient-to-br from-card to-card/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1 font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Share Your Feedback
              </h3>
              <p className="text-sm text-muted-foreground">
                Help us improve by rating and reviewing this article
              </p>
            </div>
            <Button
              onClick={handleFeedback}
              className="gap-2"
              disabled={!isAuthenticated}
            >
              <MessageSquare className="h-4 w-4" />
              Give Feedback
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-border/50 bg-muted/30 p-6">
          <h3 className="mb-2 font-semibold text-foreground">Need more information?</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Explore our comprehensive library of constitutional articles and educational resources.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/articles">
              <Button variant="outline" size="sm">Browse All Articles</Button>
            </Link>
            <Link to="/books">
              <Button variant="outline" size="sm">Explore Books</Button>
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard">
                <Button variant="outline" size="sm">View Dashboard</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
