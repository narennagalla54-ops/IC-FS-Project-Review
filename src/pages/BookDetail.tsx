import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Download, Share2, MessageSquare, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import FeedbackModal from "@/components/FeedbackModal";
import Header from "@/components/Header";

const booksData: Record<string, any> = {
  "1": {
    title: "The Constitution of India",
    author: "Government of India",
    category: "Official",
    pages: 450,
    year: 1950,
    preview: `PREAMBLE

WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens:

JUSTICE, social, economic and political;

LIBERTY of thought, expression, belief, faith and worship;

EQUALITY of status and of opportunity;

and to promote among them all

FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation;

IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.

---

PART I - THE UNION AND ITS TERRITORY

Article 1: Name and territory of the Union
India, that is Bharat, shall be a Union of States. The territory of India shall comprise the territories of the States, the Union territories specified in the First Schedule, and such other territories as may be acquired.

This foundational document establishes the framework of India's governance, defines the powers of the government, and guarantees fundamental rights to all citizens.`,
  },
  "2": {
    title: "Indian Constitutional Law",
    author: "M.P. Jain",
    category: "Academic",
    pages: 1800,
    year: 2014,
    preview: `Indian Constitutional Law by M.P. Jain is a comprehensive treatise that covers all aspects of constitutional law in India. This authoritative work is widely used by students, lawyers, and scholars.

Chapter 1: Introduction to Constitutional Law

Constitutional law is the body of law that defines the relationship between the different entities within a state, namely the executive, the legislature, and the judiciary. In India, the Constitution serves as the supreme law of the land.

The Indian Constitution, adopted on November 26, 1949, and coming into force on January 26, 1950, is the longest written constitution of any sovereign country in the world. It consists of a Preamble, 25 Parts containing 448 Articles, and 12 Schedules.

Key Features of the Indian Constitution:
- Federal structure with unitary features
- Parliamentary form of government
- Fundamental Rights and Duties
- Directive Principles of State Policy
- Independent Judiciary
- Single Citizenship

This volume examines these features in detail, providing historical context, judicial interpretations, and comparative perspectives.`,
  },
};

const BookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const { isAuthenticated, addBookmark, markItemAsViewed } = useAuth();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const book = booksData[id || "1"];

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
      description: "Book link has been copied to clipboard.",
    });
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to bookmark books.",
        variant: "destructive",
      });
      return;
    }

    addBookmark({
      id: parseInt(id || "1"),
      type: "book",
      title: book.title,
      timestamp: Date.now(),
    });

    toast({
      title: "Bookmarked!",
      description: "This book has been saved to your bookmarks.",
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

  const handleDownload = () => {
    toast({
      title: "Premium Feature",
      description: "Please upgrade to access downloadable content.",
    });
  };

  // Mark as viewed when component mounts
  useState(() => {
    if (isAuthenticated) {
      markItemAsViewed(parseInt(id || "1"), "book");
    }
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Official":
        return "bg-primary/10 text-primary border-primary/20";
      case "Academic":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "Educational":
        return "bg-accent/10 text-accent border-accent/20";
      case "Legal":
        return "bg-gold/10 text-gold border-gold/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Book not found</h1>
        <Link to="/books">
          <Button>Back to Library</Button>
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
        itemTitle={book.title}
        itemType="book"
      />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Link to="/books" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </Link>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <Badge className={getCategoryColor(book.category)}>{book.category}</Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={handleBookmark} className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" onClick={handleDownload} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-full bg-secondary/10 p-2">
                  <BookOpen className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{book.pages} pages</span>
                  <span>•</span>
                  <span>Published {book.year}</span>
                </div>
              </div>
              <CardTitle className="text-3xl">{book.title}</CardTitle>
              <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-medium text-foreground">📖 Book Preview</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Unlock full access with a premium account
              </p>
            </div>
            <div className="prose prose-neutral max-w-none dark:prose-invert">
              <div className="whitespace-pre-line text-foreground leading-relaxed">
                {book.preview}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="mt-8 rounded-lg border border-border/50 bg-gradient-to-br from-card to-card/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1 font-semibold text-foreground flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-secondary" />
                    Share Your Feedback
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Help us improve by rating and reviewing this book
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

            <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                This is a preview. Get full access to this book and many more with a premium account.
              </p>
              <Link to="/auth">
                <Button className="gap-2">
                  Get Premium Access
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookDetail;
