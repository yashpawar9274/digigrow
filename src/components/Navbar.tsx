import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageCircle } from "lucide-react";

interface NavLink {
  id: string;
  label: string;
  url: string;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNavData = async () => {
      // Fetch Nav Links
      const { data: linksData } = await supabase
        .from("links")
        .select("*")
        .eq("type", "nav")
        .order("order");

      if (linksData) {
        setNavLinks(linksData);
      }

      // Fetch WhatsApp Number
      const { data: settingsData } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "contact_whatsapp")
        .single();

      if (settingsData) {
        setWhatsappNumber(settingsData.value);
      }
    };
    fetchNavData();
  }, []);

  const handleNavigation = (url: string) => {
    if (url.startsWith("#")) {
      // Hash navigation for homepage sections
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(url);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (url.startsWith("/")) {
      // Route navigation
      navigate(url);
    } else {
      // External link
      window.location.href = url;
    }
    setIsOpen(false);
  };

  const handleWhatsApp = () => {
    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="DigiGrow Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link.url)}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button variant="whatsapp" size="default" className="gap-2" onClick={handleWhatsApp}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link.url)}
                className="block w-full text-left py-2 text-foreground font-medium"
              >
                {link.label}
              </button>
            ))}
            <Button variant="whatsapp" className="w-full gap-2 mt-4" onClick={handleWhatsApp}>
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
