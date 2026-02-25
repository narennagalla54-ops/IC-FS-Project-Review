import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, X, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface UserAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserAssistant: React.FC<UserAssistantProps> = ({ open, onOpenChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      console.log("Support message:", { name, email, subject, message });
      
      toast({
        title: "Message Sent!",
        description: "Our team will get back to you shortly.",
      });

      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Help & Support
          </SheetTitle>
          <SheetDescription>
            Get in touch with our team for assistance
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-6">
          {/* Quick Help Options */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Common Issues</Label>
            <div className="space-y-2">
              {[
                "How to use the dashboard",
                "Understanding Learning Paths",
                "Providing Feedback",
                "Account Settings",
                "Technical Issues",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setSubject(item);
                    toast({
                      title: "Subject Selected",
                      description: `Subject set to: ${item}`,
                    });
                  }}
                  className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    {item}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What is this about?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Describe your issue or question in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                  className="min-h-[120px] resize-none"
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground">
                  {message.length}/1000 characters
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs font-semibold text-foreground">
              📧 Email: support@constitutionconnect.com
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Response time: Usually within 24 hours
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserAssistant;
