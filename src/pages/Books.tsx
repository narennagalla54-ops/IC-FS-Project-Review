import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowLeft, Download, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FeedbackModal from "@/components/FeedbackModal";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const books = [
  {
    id: 1,
    title: "The Constitution of India",
    author: "Government of India",
    description: "The complete text of the Constitution of India as adopted on 26th November 1949.",
    category: "Official",
    pages: 450,
  },
  {
    id: 2,
    title: "Indian Constitutional Law",
    author: "M.P. Jain",
    description: "A comprehensive treatise on the constitutional law of India covering all aspects of the Constitution.",
    category: "Academic",
    pages: 1800,
  },
  {
    id: 3,
    title: "Introduction to the Constitution of India",
    author: "D.D. Basu",
    description: "An accessible introduction to the Indian Constitution for students and general readers.",
    category: "Educational",
    pages: 500,
  },
  {
    id: 4,
    title: "Ambedkar and the Constitution",
    author: "Christophe Jaffrelot",
    description: "A detailed examination of Dr. B.R. Ambedkar's role in drafting the Indian Constitution.",
    category: "Biography",
    pages: 320,
  },
  {
    id: 5,
    title: "Fundamental Rights in India",
    author: "H.M. Seervai",
    description: "In-depth analysis of fundamental rights guaranteed by the Indian Constitution.",
    category: "Legal",
    pages: 650,
  },
  {
    id: 6,
    title: "The Framing of India's Constitution",
    author: "B. Shiva Rao",
    description: "Historical account of the Constituent Assembly debates and the framing of the Constitution.",
    category: "History",
    pages: 880,
  },
];

const Books = () => {
  const navigate = useNavigate();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<{ id: number; title: string } | null>(null);
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

  const handleFeedbackClick = (id: number, title: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to provide feedback.",
        variant: "destructive",
      });
      return;
    }
    setSelectedBook({ id, title });
    setFeedbackOpen(true);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />
      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        itemId={selectedBook?.id || 0}
        itemTitle={selectedBook?.title || ""}
        itemType="book"
      />
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-secondary/10 p-3">
              <BookOpen className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">Constitutional Library</h1>
              <p className="text-muted-foreground">Curated collection of books on the Indian Constitution</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book.id}>
              <Card className="group h-full border-border/50 transition-all hover:border-secondary/30 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <Badge className={getCategoryColor(book.category)}>{book.category}</Badge>
                    <span className="text-xs text-muted-foreground">{book.pages} pages</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-secondary">{book.title}</CardTitle>
                  <CardDescription className="font-medium">by {book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">{book.description}</p>
                  <div className="flex gap-2">
                    <Link to={`/books/${book.id}`} className="flex-1">
                      <Button variant="link" className="h-auto p-0 text-secondary w-full justify-start">
                        Read preview →
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleFeedbackClick(book.id, book.title)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden sm:inline">Review</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border/50 bg-gradient-to-br from-card to-card/50 p-8 text-center">
          <h3 className="mb-2 text-xl font-semibold text-foreground">Access Premium Content</h3>
          <p className="mb-6 text-muted-foreground">
            Unlock full book access, downloadable PDFs, and exclusive educational materials
          </p>
          <Link to="/auth">
            <Button size="lg" className="gap-2">
              <Download className="h-4 w-4" />
              Get Premium Access
            </Button>
          </Link>
        </div>
      </div>

      {/* Dr. Ambedkar Tribute Section */}
      <section className="mt-20 border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-foreground">In Tribute To</h2>
            <p className="mb-2 text-2xl font-semibold text-primary">Dr. Bhimrao Ramji Ambedkar</p>
            <p className="mb-6 text-muted-foreground">14 April 1891 – 6 December 1956</p>
            <div className="prose prose-neutral mx-auto dark:prose-invert">
              <p className="text-foreground">
                Chief architect of the Indian Constitution, Dr. B.R. Ambedkar was a jurist, economist, social reformer, and political leader who dedicated his life to the upliftment of the oppressed and the establishment of social justice. His vision and leadership in drafting the Constitution laid the foundation for modern India's democratic framework.
              </p>
              <blockquote className="border-l-4 border-primary pl-4 italic">
                "I measure the progress of a community by the degree of progress which women have achieved."
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Books;
