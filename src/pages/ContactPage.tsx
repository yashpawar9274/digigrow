import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const ContactPage = () => {
    return (
        <>
            <Helmet>
                <title>Contact Us - DigiGrow</title>
                <meta name="description" content="Get in touch with us for digital marketing services" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-20">
                    <Contact />
                </div>
                <Footer />
                <WhatsAppFloat />
            </div>
        </>
    );
};

export default ContactPage;
