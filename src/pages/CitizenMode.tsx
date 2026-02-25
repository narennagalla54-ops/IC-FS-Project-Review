import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
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
import {
  Users,
  Heart,
  Vote,
  FileText,
  Info,
  ArrowRight,
  CheckCircle2,
  Shield,
} from "lucide-react";

const CitizenMode = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("rights");

  useEffect(() => {
    if (!isAuthenticated || user?.mode !== "citizen") {
      navigate("/mode-selection");
    }
  }, [isAuthenticated, user?.mode, navigate]);

  if (!isAuthenticated || user?.mode !== "citizen") {
    return null;
  }

  const fundamentalRights = [
    {
      id: 1,
      article: "Article 14",
      title: "Equality before Law",
      description:
        "The State shall not deny to any person equality before the law or equal protection of the laws within the territory of India.",
      icon: "⚖️",
    },
    {
      id: 2,
      article: "Article 15",
      title: "Prohibition of Discrimination",
      description:
        "No citizen shall be discriminated against on grounds of religion, race, caste, sex or place of birth.",
      icon: "🛡️",
    },
    {
      id: 3,
      article: "Article 19",
      title: "Freedom of Expression",
      description:
        "Citizens have the right to freedom of speech and expression, freedom of assembly, freedom of association.",
      icon: "🗣️",
    },
    {
      id: 4,
      article: "Article 21",
      title: "Right to Life and Liberty",
      description:
        "No person shall be deprived of his life or personal liberty except according to procedure established by law.",
      icon: "❤️",
    },
  ];

  const fundamentalDuties = [
    {
      id: 1,
      article: "Article 51A(a)",
      title: "Respect Constitution & Laws",
      description: "To abide by the Constitution and respect its ideals and institutions",
      icon: "📜",
    },
    {
      id: 2,
      article: "Article 51A(b)",
      title: "Cherish Ideals",
      description:
        "To cherish and follow the noble ideals which inspired our national struggle for freedom",
      icon: "💫",
    },
    {
      id: 3,
      article: "Article 51A(d)",
      title: "Maintain Harmony",
      description:
        "To promote harmony and the spirit of common brotherhood amongst all the people of India",
      icon: "🤝",
    },
    {
      id: 4,
      article: "Article 51A(e)",
      title: "Protect Environment",
      description:
        "To protect and improve the natural environment including forests, lakes, wildlife",
      icon: "🌱",
    },
  ];

  const rtiGuide = [
    {
      id: 1,
      title: "What is RTI?",
      content:
        "Right to Information (RTI) is a fundamental right that allows any Indian citizen to seek information from government agencies and public authorities.",
      icon: <Info className="h-6 w-6 text-primary" />,
    },
    {
      id: 2,
      title: "How to File RTI",
      content:
        "You can file an RTI application by submitting Form A to the Public Information Officer (PIO) of the concerned department or authority.",
      icon: <FileText className="h-6 w-6 text-primary" />,
    },
    {
      id: 3,
      title: "Response Time",
      content:
        "The PIO must provide information within 30 days. This can be extended to 45 days if large files are involved.",
      icon: <Info className="h-6 w-6 text-primary" />,
    },
  ];

  const votingGuide = [
    {
      id: 1,
      title: "Who Can Vote?",
      points: [
        "Must be a citizen of India",
        "Must be at least 18 years of age",
        "Must not be disqualified by law",
        "Must be registered as a voter",
      ],
    },
    {
      id: 2,
      title: "Election Types",
      points: [
        "General Elections - Every 5 years",
        "By-elections - For specific vacancies",
        "Local Elections - Municipal and Panchayat",
        "State Elections - For state assemblies",
      ],
    },
    {
      id: 3,
      title: "Your Voting Rights",
      points: [
        "Vote for your representatives",
        "Vote in fair and secret ballot",
        "Vote without any coercion",
        "Know about candidates and policies",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="rounded-full bg-secondary/10 p-3">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                Citizen Mode
              </h1>
              <p className="text-muted-foreground">
                Know your rights and responsibilities
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Fundamental Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">6</p>
              <p className="text-xs text-muted-foreground">Main categories to explore</p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Fundamental Duties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">10</p>
              <p className="text-xs text-muted-foreground">Responsibilities as a citizen</p>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Civil Liberties</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Protected</p>
              <p className="text-xs text-muted-foreground">Learn how you're protected</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rights">Rights</TabsTrigger>
            <TabsTrigger value="duties">Duties</TabsTrigger>
            <TabsTrigger value="rti">RTI Guide</TabsTrigger>
            <TabsTrigger value="voting">Voting</TabsTrigger>
          </TabsList>

          {/* Rights Tab */}
          <TabsContent value="rights" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Fundamental Rights</h2>
              <p className="text-muted-foreground">
                These are the basic rights guaranteed to all citizens of India
              </p>
            </div>

            <div className="grid gap-6">
              {fundamentalRights.map((right) => (
                <Card key={right.id} className="border-border/50 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{right.icon}</div>
                      <div className="flex-1">
                        <Badge className="mb-2">{right.article}</Badge>
                        <CardTitle>{right.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{right.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Duties Tab */}
          <TabsContent value="duties" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Fundamental Duties</h2>
              <p className="text-muted-foreground">
                As a citizen, these are your responsibilities towards the nation
              </p>
            </div>

            <div className="grid gap-6">
              {fundamentalDuties.map((duty) => (
                <Card key={duty.id} className="border-secondary/20 bg-secondary/5 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{duty.icon}</div>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{duty.article}</Badge>
                        <CardTitle className="text-lg">{duty.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{duty.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* RTI Guide Tab */}
          <TabsContent value="rti" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Right to Information (RTI)</h2>
              <p className="text-muted-foreground">
                Learn how to exercise your right to seek information from government
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {rtiGuide.map((guide) => (
                <Card key={guide.id} className="border-primary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {guide.icon}
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{guide.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  File Your RTI Now
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to request information from a government department?
                </p>
                <Button className="gap-2">
                  Start RTI Application
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Voting Tab */}
          <TabsContent value="voting" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Voting Rights & Elections</h2>
              <p className="text-muted-foreground">
                Understand your voting rights and participate in democratic process
              </p>
            </div>

            <div className="grid gap-6">
              {votingGuide.map((guide) => (
                <Card key={guide.id} className="border-secondary/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Vote className="h-5 w-5 text-secondary" />
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {guide.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-accent/20 bg-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5" />
                  Voter Registration
                </CardTitle>
                <CardDescription>
                  Ensure you're registered to vote in your constituency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Check your voter status or register online
                  </p>
                  <Button variant="outline" className="gap-2">
                    Check Voter Status
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Resources Section */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Additional Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button variant="outline" className="justify-start h-auto py-3">
                <div>
                  <p className="font-semibold text-sm">Constitution Text</p>
                  <p className="text-xs text-muted-foreground">Read full document</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3">
                <div>
                  <p className="font-semibold text-sm">FAQ</p>
                  <p className="text-xs text-muted-foreground">Common questions</p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto py-3">
                <div>
                  <p className="font-semibold text-sm">Contact Support</p>
                  <p className="text-xs text-muted-foreground">Get help & guidance</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant */}
        <AIAssistant />
      </div>
    </div>
  );
};

export default CitizenMode;
