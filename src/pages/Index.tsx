import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>DigiGrow - Digital Agency in Boisar | Website, Google Reviews & Social Media</title>
        <meta
          name="description"
          content="Affordable digital marketing agency in Boisar, Palghar. We help local businesses with website development, Google reviews, Instagram reels & social media growth. Starting ₹2,999."
        />
        <meta
          name="keywords"
          content="digital agency in Boisar, website developer near me, google reviews service, social media marketing Palghar, affordable website design, local business marketing"
        />
        <meta property="og:title" content="DigiGrow - Helping Local Businesses Grow Online" />
        <meta
          property="og:description"
          content="Affordable websites, Google reviews & social media growth for small businesses in Boisar, Palghar & Maharashtra."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://digigrow.in" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "DigiGrow Digital Agency",
            "description": "Digital marketing agency helping local businesses grow online with affordable websites, Google reviews, and social media marketing.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Boisar",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            },
            "priceRange": "₹2,999 - ₹10,000",
            "telephone": "+91-9876543210",
            "openingHours": "Mo-Sa 09:00-18:00",
            "areaServed": ["Boisar", "Palghar", "Maharashtra"]
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <WhyChooseUs />
        <Services />
        <Testimonials />
        <Footer />
        <WhatsAppFloat />
      </main>
    </>
  );
};

export default Index;
