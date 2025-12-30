import { Search, FileText, Wrench, Headphones } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Free Google Audit",
    description: "We analyze your current online presence and identify improvement areas",
  },
  {
    icon: FileText,
    number: "02",
    title: "Clear Plan & Pricing",
    description: "You get a simple plan with transparent pricing — no hidden costs",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Work Execution",
    description: "We implement the plan efficiently while keeping you updated",
  },
  {
    icon: Headphones,
    number: "04",
    title: "Result & Support",
    description: "Track your growth with our ongoing support and monthly reports",
  },
];

const HowWeWork = () => {
  return (
    <section className="section-padding bg-section-alt">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How We Work Together
          </h2>
          <p className="text-muted-foreground text-lg">
            A simple, transparent process that gets you results
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover transition-all duration-300 text-center"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-border z-10" />
              )}

              {/* Step Number */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mt-2">
                <step.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
