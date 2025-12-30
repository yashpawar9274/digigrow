import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Star, TrendingUp } from "lucide-react";

const Hero = () => {
  const [heroTitle, setHeroTitle] = useState("Helping Local Businesses Get More Calls, Customers & Trust Online");
  const [heroSubtitle, setHeroSubtitle] = useState("Affordable websites, Google reviews & social media growth for small businesses. Simple. Honest. Result-focused.");

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .in("key", ["hero_title", "hero_subtitle"]);

      if (data) {
        const title = data.find(s => s.key === "hero_title")?.value;
        const subtitle = data.find(s => s.key === "hero_subtitle")?.value;
        if (title) setHeroTitle(title);
        if (subtitle) setHeroSubtitle(subtitle);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 px-4 md:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.08)_0%,_transparent_50%)]" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <div className="flex -space-x-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background"
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by 50+ local businesses
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              {heroTitle}
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              {heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" className="group">
                <MessageCircle className="w-5 h-5" />
                Get Free Google Audit on WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="heroOutline">
                View Our Work
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Businesses Helped</div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-bold text-foreground">4.9</span>
                  <Star className="w-5 h-5 fill-highlight text-highlight" />
                </div>
                <div className="text-sm text-muted-foreground">Client Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">₹2,999</div>
                <div className="text-sm text-muted-foreground">Starting Price</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg ml-auto">
              {/* Main Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-card rounded-2xl shadow-card-hover p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Google Business</div>
                    <div className="text-sm text-muted-foreground">Profile Optimized</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Visibility</span>
                    <span className="text-sm font-semibold text-accent">+340%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-accent rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-8 right-8 bg-card rounded-xl shadow-card p-4 border border-border animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-whatsapp/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-whatsapp" />
                  </div>
                  <div className="text-sm font-medium">+23 Enquiries</div>
                </div>
              </div>

              <div className="absolute bottom-16 left-0 bg-card rounded-xl shadow-card p-4 border border-border animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-highlight text-highlight" />
                  <Star className="w-5 h-5 fill-highlight text-highlight" />
                  <Star className="w-5 h-5 fill-highlight text-highlight" />
                  <Star className="w-5 h-5 fill-highlight text-highlight" />
                  <Star className="w-5 h-5 fill-highlight text-highlight" />
                </div>
                <div className="text-sm text-muted-foreground mt-1">New Review!</div>
              </div>

              {/* Background Decorations */}
              <div className="absolute -z-10 inset-0 bg-primary/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
