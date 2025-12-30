import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: string;
  order: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order");

      if (!error && data) {
        setServices(data);
      }
      setIsLoading(false);
    };

    fetchServices();
  }, []);

  const getIcon = (iconName: string) => {
    // @ts-ignore
    const Icon = LucideIcons[iconName] || LucideIcons.HelpCircle;
    return Icon;
  };

  // Default color logic since we don't store it yet, or random/cycle
  const colors = [
    "bg-primary/10 text-primary",
    "bg-accent/10 text-accent",
    "bg-highlight/20 text-yellow-700",
    "bg-primary/10 text-primary"
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything Your Business Needs to Grow Online
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple, affordable solutions that actually work for local businesses
          </p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = getIcon(service.icon);
              const colorClass = colors[index % colors.length];

              return (
                <div
                  key={service.id}
                  className="group bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border hover:shadow-card-hover transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {service.price && (
                    <div className="mb-6 font-semibold text-lg text-primary">
                      {service.price}
                    </div>
                  )}

                  <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:bg-transparent">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
