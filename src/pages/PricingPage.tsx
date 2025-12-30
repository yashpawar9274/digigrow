import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const PricingPage = () => {
    return (
        <>
            <Helmet>
                <title>Pricing - DigiGrow</title>
                <meta name="description" content="Affordable digital marketing packages for local businesses" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-20">
                    <Pricing />
                </div>
                <Footer />
                <WhatsAppFloat />
            </div>
        </>
    );
};

export default PricingPage;
