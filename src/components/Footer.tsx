import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

interface Link {
  id: string;
  label: string;
  url: string;
  type: string;
}

interface Service {
  title: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [services, setServices] = useState<string[]>([]);
  const [quickLinks, setQuickLinks] = useState<Link[]>([]);
  const [socialLinks, setSocialLinks] = useState<Link[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("919876543210");

  useEffect(() => {
    const fetchData = async () => {
      // Services
      const { data: servicesData } = await supabase
        .from("services")
        .select("title")
        .order("order")
        .limit(5);
      if (servicesData) setServices(servicesData.map(s => s.title));

      // Links
      const { data: linksData } = await supabase
        .from("links")
        .select("*")
        .order("order");
      if (linksData) {
        setQuickLinks(linksData.filter(l => l.type === 'nav'));
        setSocialLinks(linksData.filter(l => l.type === 'social'));
      }

      // Settings
      const { data: settingsData } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "contact_whatsapp")
        .single();
      if (settingsData) setWhatsappNumber(settingsData.value.replace('+', ''));
    };
    fetchData();
  }, []);

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="DigiGrow Logo" className="h-10 w-auto brightness-0 invert" />
            </div>
            <p className="text-background/70 text-sm mb-6">
              Helping local businesses grow their online presence with affordable, result-focused digital solutions.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-whatsapp text-accent-foreground px-4 py-2 rounded-lg font-medium text-sm hover:bg-whatsapp-hover transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              {services.length > 0 ? services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {service}
                  </a>
                </li>
              )) : (
                <li className="text-background/50 text-sm">Loading...</li>
              )}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    className="text-background/70 hover:text-background text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-background/70 mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">
                  Boisar, Palghar<br />Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-background/70 flex-shrink-0" />
                <a
                  href={`tel:+${whatsappNumber}`}
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  +{whatsappNumber.replace(/(\d{2})(\d{5})(\d{5})/, '$1 $2 $3')}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-background/70 flex-shrink-0" />
                <a
                  href="mailto:hello@digigrow.in"
                  className="text-background/70 hover:text-background text-sm transition-colors"
                >
                  hello@digigrow.in
                </a>
              </li>

              {/* Socials */}
              {socialLinks.length > 0 && (
                <li className="flex items-center gap-4 mt-4">
                  {socialLinks.map(link => {
                    const Icon = link.label === "Instagram" ? Instagram : link.label === "Facebook" ? Facebook : Twitter;
                    return (
                      <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="text-background/70 hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm text-center md:text-left">
            © {currentYear} DigiGrow. All rights reserved.
          </p>
          <p className="text-background/50 text-sm">
            Made with ❤️ for local businesses
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
