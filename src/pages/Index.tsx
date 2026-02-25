import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Scale, Users, Shield, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { getTranslation } from "@/lib/translations";
import redFortHero from "@/assets/red-fort-hero.jpg";
import Header from "@/components/Header";

const Index = () => {
  const { language } = useLanguage();
  const t = (key: string) => getTranslation(language, key, key);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Red Fort Background */}
        <div className="absolute inset-0">
          <img 
            src={redFortHero} 
            alt="Red Fort Delhi - Symbol of Indian Heritage" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        </div>
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-6 py-2">
              <Scale className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Indian Constitution Awareness Platform</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {t("home.welcome")}
            </h1>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              {t("home.description")}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth">
                <Button size="lg" className="group gap-2 shadow-lg transition-all hover:shadow-xl">
                  {t("auth.signUp")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/articles">
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  {t("home.exploreArticles")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{t("home.features")}</h2>
          <p className="text-lg text-muted-foreground">Comprehensive tools for constitutional education</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="group border-border/50 bg-gradient-to-br from-card to-card/50 transition-all hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4 transition-transform group-hover:scale-110">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">{t("home.feature1Title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("home.feature1Desc")}
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border/50 bg-gradient-to-br from-card to-card/50 transition-all hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-secondary/10 p-4 transition-transform group-hover:scale-110">
                <GraduationCap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">{t("home.feature2Title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("home.feature2Desc")}
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border/50 bg-gradient-to-br from-card to-card/50 transition-all hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-accent/10 p-4 transition-transform group-hover:scale-110">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">{t("home.feature3Title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("home.feature3Desc")}
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border/50 bg-gradient-to-br from-card to-card/50 transition-all hover:shadow-lg">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 rounded-full bg-gold/10 p-4 transition-transform group-hover:scale-110">
                <Shield className="h-8 w-8 text-gold" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-card-foreground">{t("home.feature4Title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("home.feature4Desc")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              {t("home.welcome")}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t("home.subtitle")}
            </p>
            <Link to="/auth">
              <Button size="lg" className="gap-2 shadow-lg">
                {t("auth.createAccount")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer Tribute */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="mb-6">
            <h3 className="mb-2 text-2xl font-bold text-foreground">In Tribute To</h3>
            <p className="text-xl font-semibold text-primary">Dr. B.R. Ambedkar</p>
            <p className="text-sm text-muted-foreground">Architect of the Indian Constitution</p>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Indian Constitution Awareness Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
