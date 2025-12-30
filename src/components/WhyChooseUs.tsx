import { XCircle, CheckCircle, ArrowRight, Search, Star, Globe, Smartphone } from "lucide-react";

const problems = [
  {
    icon: Search,
    problem: "Business not visible on Google",
    solution: "Get found when customers search for your service",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Star,
    problem: "Low reviews = low trust",
    solution: "Build genuine reviews that bring new customers",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Globe,
    problem: "No professional website",
    solution: "Simple, fast website that converts visitors to calls",
    color: "bg-highlight/20 text-yellow-700",
  },
  {
    icon: Smartphone,
    problem: "No social media presence",
    solution: "Instagram reels that reach local audience",
    color: "bg-primary/10 text-primary",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Your Problems, Our Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Is Your Business Facing These Issues?
          </h2>
          <p className="text-muted-foreground text-lg">
            Most local businesses struggle with online visibility. We fix this in simple, affordable steps.
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((item, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-3">
                  {/* Problem */}
                  <div className="flex items-center gap-2 text-destructive/80">
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium line-through decoration-destructive/50">
                      {item.problem}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-4 h-4 text-muted-foreground mx-auto md:mx-0" />

                  {/* Solution */}
                  <div className="flex items-center gap-2 text-accent">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.solution}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-foreground font-medium">
            We fix this in{" "}
            <span className="text-primary font-bold">simple, affordable steps</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
