import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  results: string;
  link: string;
  icon: string;
  order: number;
}

const Portfolio = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await supabase
        .from("portfolio")
        .select("*")
        .order("order");

      if (data) {
        setProjects(data);
      }
      setIsLoading(false);
    };
    fetchPortfolio();
  }, []);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent || Icons.Building2;
  };

  if (isLoading) {
    return (
      <section id="portfolio" className="section-padding">
        <div className="container-custom flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }
  return (
    <section id="portfolio" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Work for Real Local Businesses
          </h2>
          <p className="text-muted-foreground text-lg">
            See how we've helped businesses like yours grow their online presence
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:shadow-card-hover transition-all duration-300 block"
            >
              {/* Project Visual */}
              <div className="bg-primary/5 p-8 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {(() => {
                    const IconComponent = getIcon(project.icon);
                    return <IconComponent className="w-10 h-10 text-primary" />;
                  })()}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{project.category}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 text-accent font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {project.results}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* More Work CTA */}
        <div className="text-center mt-10">
          <Button variant="outline" className="gap-2">
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
