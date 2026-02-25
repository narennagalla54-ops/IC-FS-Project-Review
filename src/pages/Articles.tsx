import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, ArrowLeft, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FeedbackModal from "@/components/FeedbackModal";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Sample articles data
const articles = [
  {
    id: 1,
    number: "Article 1",
    title: "Name and territory of the Union",
    category: "Basic",
    description: "India, that is Bharat, shall be a Union of States. The territory of India shall comprise...",
  },
  {
    id: 14,
    number: "Article 14",
    title: "Equality before law",
    category: "Fundamental Rights",
    description: "The State shall not deny to any person equality before the law or the equal protection of the laws...",
  },
  {
    id: 15,
    number: "Article 15",
    title: "Prohibition of discrimination",
    category: "Fundamental Rights",
    description: "The State shall not discriminate against any citizen on grounds only of religion, race, caste, sex, place of birth...",
  },
  {
    id: 19,
    number: "Article 19",
    title: "Protection of certain rights regarding freedom of speech",
    category: "Fundamental Rights",
    description: "All citizens shall have the right to freedom of speech and expression, to assemble peacefully...",
  },
  {
    id: 21,
    number: "Article 21",
    title: "Protection of life and personal liberty",
    category: "Fundamental Rights",
    description: "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
  },
  {
    id: 32,
    number: "Article 32",
    title: "Remedies for enforcement of rights",
    category: "Fundamental Rights",
    description: "The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights...",
  },
  {
    id: 51,
    number: "Article 51A",
    title: "Fundamental Duties",
    category: "Duties",
    description: "It shall be the duty of every citizen of India to abide by the Constitution and respect its ideals...",
  },
  {
    id: 370,
    number: "Article 370",
    title: "Special provisions with respect to Jammu and Kashmir",
    category: "Advanced",
    description: "Temporary provisions with respect to the State of Jammu and Kashmir (Abrogated on August 5, 2019).",
  },
];

const Articles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<{ id: number; title: string } | null>(null);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFeedbackClick = (id: number, title: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to provide feedback.",
        variant: "destructive",
      });
      return;
    }
    setSelectedArticle({ id, title });
    setFeedbackOpen(true);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />
      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        itemId={selectedArticle?.id || 0}
        itemTitle={selectedArticle?.title || ""}
        itemType="article"
      />
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">Constitutional Articles</h1>
              <p className="text-muted-foreground">Explore the articles of the Indian Constitution</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search articles by title, number, or description..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <div key={article.id}>
              <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <Badge className={getCategoryColor(article.category)}>{article.category}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary">{article.number}</CardTitle>
                  <CardDescription className="text-base font-medium text-foreground">
                    {article.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{article.description}</p>
                  <div className="mt-4 flex gap-2">
                    <Link to={`/articles/${article.id}`} className="flex-1">
                      <Button variant="link" className="h-auto p-0 text-primary w-full justify-start">
                        Read full article →
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleFeedbackClick(article.id, article.title)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden sm:inline">Feedback</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
