import { Button } from "@/components/ui/button";
import { Scale, ExternalLink, User, LogOut, LayoutDashboard, Settings, Globe } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/translations";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const isAuthPage = location.pathname === "/auth";
  const t = (key: string) => getTranslation(language, key, key);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="rounded-full bg-primary/10 p-2">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <span className="hidden font-semibold text-foreground sm:inline-block">
            {t("header.appName")}
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/articles"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("header.articles")}
          </Link>
          <Link
            to="/books"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("header.books")}
          </Link>
          <Link
            to="/videos"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Videos
          </Link>
          <a
            href="https://legislative.gov.in/constitution-of-india/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("header.officialConstitution")}
            <ExternalLink className="h-3 w-3" />
          </a>
        </nav>

        {/* Auth Buttons & Language Selector */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline uppercase text-xs font-semibold">
                  {language}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={language === "en" ? "bg-accent" : ""}
              >
                🇺🇸 English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("hi")}
                className={language === "hi" ? "bg-accent" : ""}
              >
                🇮🇳 हिंदी
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("te")}
                className={language === "te" ? "bg-accent" : ""}
              >
                🇮🇳 తెలుగు
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isAuthPage && !isAuthenticated && (
            <Link to="/auth">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">{t("header.signIn")}</span>
              </Button>
            </Link>
          )}
          
          {isAuthenticated && user && (
            <>
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("header.dashboard")}</span>
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-full hover:opacity-80 transition-opacity">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex flex-col gap-2 px-4 py-2">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground capitalize">Role: {user.role}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="gap-2 cursor-pointer"
                  >
                    <Settings className="h-4 w-4" />
                    {t("header.editProfile")}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("header.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
