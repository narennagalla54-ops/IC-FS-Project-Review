import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Videos from "./pages/Videos";
import VideoDetail from "./pages/VideoDetail";
import ModeSelection from "./pages/ModeSelection";
import AdminDashboard from "./pages/AdminDashboard";
import StudentMode from "./pages/StudentMode";
import CitizenMode from "./pages/CitizenMode";
import StudentAssessmentReview from "./pages/StudentAssessmentReview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/mode-selection" element={<ModeSelection />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/student-mode" element={<StudentMode />} />
            <Route path="/citizen-mode" element={<CitizenMode />} />
            <Route path="/assessment-review" element={<StudentAssessmentReview />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
