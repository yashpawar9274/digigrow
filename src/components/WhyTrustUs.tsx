import { MapPin, Wallet, Target, Shield, GraduationCap } from "lucide-react";

const trustPoints = [
  {
    icon: MapPin,
    title: "Local Support",
    description: "We understand local business challenges. Based in Maharashtra, we're always reachable.",
  },
  {
    icon: Wallet,
    title: "Honest Pricing",
    description: "No hidden fees. What we quote is what you pay. Simple and transparent.",
  },
  {
    icon: Target,
    title: "Result-Focused",
    description: "We focus on results that matter — more calls, more customers, more trust.",
  },
  {
    icon: Shield,
    title: "No Fake Promises",
    description: "We don't promise overnight success. We deliver real, sustainable growth.",
  },
];

const WhyTrustUs = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Why Trust Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your Local Business Partner, Not Just Another Agency
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We're not a big corporate agency. We're a small team that genuinely cares about helping local businesses succeed online.
            </p>

            {/* Founder Note */}
            <div className="bg-secondary/50 rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Built by Professionals</div>
                  <div className="text-sm text-muted-foreground">Computer Science graduates with real project experience</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                We combine technical expertise with understanding of local business needs to deliver solutions that actually work.
              </p>
            </div>
          </div>

          {/* Right Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {trustPoints.map((point, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTrustUs;
