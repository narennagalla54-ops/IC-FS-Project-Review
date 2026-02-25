import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale, ArrowLeft, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import AIAssistant from "@/components/AIAssistant";

const Auth = () => {
  // Sign Up States
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  // Login States
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    phone: "",
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Sign Up Handler
  const handleSignUp = async () => {
    if (signUpData.phone.length === 10 && signUpData.name && signUpData.email && signUpData.role) {
      setSignUpLoading(true);
      try {
        // Save user to context
        login({
          name: signUpData.name,
          email: signUpData.email,
          phone: signUpData.phone,
          role: signUpData.role as "student" | "citizen" | "admin",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${signUpData.name}`,
        });
        
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        setTimeout(() => {
          navigate("/mode-selection");
        }, 1500);
      } catch (error) {
        console.error("Error during sign up:", error);
        toast({
          title: "Error",
          description: "Failed to create account.",
          variant: "destructive",
        });
      } finally {
        setSignUpLoading(false);
      }
    } else {
      toast({
        title: "Invalid Input",
        description: "Please fill all fields with valid information.",
        variant: "destructive",
      });
    }
  };

  // Login Handler
  const handleLogin = async () => {
    if (loginData.phone.length === 10) {
      setLoginLoading(true);
      try {
        // Create a basic user object for login
        login({
          name: "User",
          email: "user@example.com",
          phone: loginData.phone,
          role: "citizen" as "student" | "citizen" | "admin",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${loginData.phone}`,
        });
        
        toast({
          title: "Success",
          description: "Welcome back!",
        });
        setTimeout(() => {
          navigate("/mode-selection");
        }, 1500);
      } catch (error) {
        console.error("Error during login:", error);
        toast({
          title: "Error",
          description: "Failed to login.",
          variant: "destructive",
        });
      } finally {
        setLoginLoading(false);
      }
    } else {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* AI Assistant Box at Top */}
        <div className="w-full max-w-md mb-8">
          <AIAssistant />
        </div>

        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome</h1>
            <p className="text-muted-foreground">Join the Constitutional Awareness Platform</p>
          </div>

          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Enter your details to get started</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={signUpData.phone}
                      onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                      maxLength={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Select Role</Label>
                    <Select value={signUpData.role} onValueChange={(value) => setSignUpData({ ...signUpData, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="citizen">Citizen</SelectItem>
                        <SelectItem value="educator">Educator</SelectItem>
                        <SelectItem value="legal-expert">Legal Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    onClick={handleSignUp} 
                    className="w-full gap-2"
                    disabled={signUpLoading}
                  >
                    {signUpLoading ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="login">
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Login to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-phone">Phone Number</Label>
                    <Input
                      id="login-phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={loginData.phone}
                      onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                      maxLength={10}
                    />
                  </div>

                  <Button 
                    onClick={handleLogin} 
                    className="w-full gap-2"
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
