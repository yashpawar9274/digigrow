import { MessageCircle, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { submitLead } from "@/lib/leads";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit to database
    const result = await submitLead({
      name: formData.name,
      phone: formData.phone,
      message: formData.message,
      source: 'contact_form',
    });

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon on WhatsApp.",
      });

      // Also open WhatsApp with the message
      const text = `Hi! I'm ${formData.name}. ${formData.message}. My phone: ${formData.phone}`;
      window.open(`https://wa.me/917276692134?text=${encodeURIComponent(text)}`, "_blank");

      // Reset form
      setFormData({ name: "", phone: "", message: "" });
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding bg-section-alt">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Let's Talk About Your Business
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Talk directly with us. No sales pressure. Just honest advice on how to grow your business online.
            </p>

            {/* Contact Options */}
            <div className="space-y-4">
              <a
                href="https://wa.me/917276692134"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">Quick reply, usually within minutes</div>
                </div>
              </a>

              <a
                href="tel:+917385066631"
                className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Phone Call</div>
                  <div className="text-sm text-muted-foreground">+91 73850 66631</div>
                </div>
              </a>

              <a
                href="mailto:yash.pawar@theemcoe.org"
                className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card border border-border hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">yash.pawar@theemcoe.org</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Enter your name"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="Enter your phone number"
                  required
                  minLength={10}
                  maxLength={15}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  rows={4}
                  placeholder="Tell us about your business and what you need..."
                  required
                  maxLength={1000}
                />
              </div>

              <Button
                type="submit"
                variant="whatsapp"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending..." : "Send via WhatsApp"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
