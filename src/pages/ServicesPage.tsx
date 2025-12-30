import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const ServicesPage = () => {
    return (
        <>
            <Helmet>
                <title>Our Services - DigiGrow</title>
                <meta name="description" content="Explore our digital marketing services for local businesses" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-20">
                    <Services />
                </div>
                <Footer />
                <WhatsAppFloat />
            </div>
        </>
    );
};

export default ServicesPage;
