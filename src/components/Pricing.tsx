import { Check, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingPlans = [
  {
    name: "Starter Pack",
    price: "₹2,999",
    period: "one-time",
    description: "Perfect for new & small shops just starting online",
    features: [
      "Google Business Profile setup/optimisation",
      "Review growth strategy",
      "WhatsApp enquiry button",
      "Basic SEO setup",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Growth Pack",
    price: "₹5,999",
    period: "one-time",
    description: "Best value for businesses ready to grow",
    features: [
      "1-page professional website",
      "Google reviews improvement",
      "3 Instagram reels",
      "1 month support",
      "WhatsApp integration",
      "Mobile responsive design",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Monthly Support",
    price: "₹2,000",
    period: "/month",
    description: "Ongoing support to keep your business growing",
    features: [
      "Review monitoring",
      "Profile updates",
      "2 reels per month",
      "Monthly report",
      "Priority support",
    ],
    cta: "Subscribe",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-section-alt">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent, Affordable Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            No hidden fees. No surprises. Choose what works for your budget.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-6 md:p-8 border transition-all duration-300 hover:shadow-card-hover ${
                plan.popular
                  ? "border-primary shadow-card-hover scale-[1.02]"
                  : "border-border shadow-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "whatsapp" : "outline"}
                className="w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Custom Pricing Note */}
        <div className="text-center mt-10">
          <p className="text-muted-foreground mb-4">
            Need something custom? We'll create a plan based on your business needs.
          </p>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="w-4 h-4" />
            Discuss on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
