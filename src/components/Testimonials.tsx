import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Star, Loader2, Phone } from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    phone?: string;
}

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            const { data } = await supabase.from("testimonials").select("*");
            if (data) {
                setTestimonials(data);
            }
            setIsLoading(false);
        };
        fetchTestimonials();
    }, []);

    if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" /></div>;

    return (
        <section className="section-padding bg-section">
            <div className="container-custom">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Real feedback from local businesses we've helped grow.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((item) => (
                        <div key={item.id} className="bg-card p-6 rounded-2xl shadow-card border border-border hover:shadow-card-hover transition-all duration-300">
                            <div className="flex gap-1 mb-4">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-highlight text-highlight" />
                                ))}
                            </div>
                            <p className="text-muted-foreground mb-6">"{item.content}"</p>
                            <div className="border-t border-border pt-4">
                                <div className="font-semibold text-foreground">{item.name}</div>
                                <div className="text-sm text-primary mb-2">{item.role}</div>
                                {item.phone && (
                                    <a
                                        href={`tel:${item.phone}`}
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                                    >
                                        <Phone className="w-4 h-4" />
                                        {item.phone}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
