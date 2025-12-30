import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/917276692134"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-accent text-accent-foreground px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group md:pr-6"
      aria-label="Chat on WhatsApp"
    >
      <div className="w-10 h-10 bg-accent-foreground/10 rounded-full flex items-center justify-center">
        <MessageCircle className="w-5 h-5" />
      </div>
      <span className="hidden md:block font-semibold text-sm">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppFloat;
