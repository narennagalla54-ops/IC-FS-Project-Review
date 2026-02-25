import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Brain, ExternalLink } from "lucide-react";

const AIAssistant = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const aiOptions = [
    {
      id: 1,
      name: "ChatGPT",
      description: "OpenAI's advanced AI assistant for detailed explanations",
      url: "https://chatgpt.com/",
      icon: "🤖",
      color: "from-green-500 to-green-600",
    },
    {
      id: 2,
      name: "Gemini",
      description: "Google's powerful AI for quick answers and insights",
      url: "https://gemini.google.com/app?hl=eng",
      icon: "✨",
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <>
      <Card className="bg-gradient-to-br from-primary/5 via-background to-background border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
            onClick={() => setDialogOpen(true)}>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>
                Get help from AI for your constitutional law queries
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Choose an AI assistant to help you understand complex constitutional concepts
          </p>
          <Button className="w-full gap-2" onClick={() => setDialogOpen(true)}>
            <Brain className="h-4 w-4" />
            Open AI Assistant
          </Button>
        </CardContent>
      </Card>

      {/* AI Options Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Choose Your AI Assistant
            </DialogTitle>
            <DialogDescription>
              Select an AI assistant to help you with constitutional law questions and explanations
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2 py-6">
            {aiOptions.map((option) => (
              <a
                key={option.id}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setDialogOpen(false)}
                className="group"
              >
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all transform hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`text-5xl ${option.color.includes('green') ? 'text-green-600' : 'text-blue-600'}`}>
                        {option.icon}
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <CardTitle className="text-lg">{option.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full gap-2 group-hover:bg-primary/90"
                      variant="default"
                    >
                      Open {option.name}
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              <strong>💡 Tip:</strong> Use these AI assistants to:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Ask questions about constitutional concepts</li>
                <li>Get explanations for complex articles</li>
                <li>Prepare for exams with detailed answers</li>
                <li>Explore case studies and interpretations</li>
              </ul>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistant;
