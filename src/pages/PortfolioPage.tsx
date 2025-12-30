import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const PortfolioPage = () => {
    return (
        <>
            <Helmet>
                <title>Our Work - DigiGrow</title>
                <meta name="description" content="See our portfolio of successful local business projects" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-20">
                    <Portfolio />
                </div>
                <Footer />
                <WhatsAppFloat />
            </div>
        </>
    );
};

export default PortfolioPage;
