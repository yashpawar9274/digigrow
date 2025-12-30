import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Loader2, Star } from "lucide-react";

interface Testimonial {
    id: string;
    name: string;
    role: string | null;
    content: string;
    rating: number | null;
    phone?: string | null;
}

const TestimonialsTab = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState<Partial<Testimonial>>({});
    const { toast } = useToast();

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from("testimonials").select("*");
        if (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
            setTestimonials(data || []);
        }
        setIsLoading(false);
    };

    const handleSubmit = async () => {
        try {
            if (editingItem) {
                const { error } = await supabase.from("testimonials").update(formData).eq("id", editingItem.id);
                if (error) throw error;
                toast({ title: "Testimonial updated" });
            } else {
                const { error } = await supabase.from("testimonials").insert([formData as any]);
                if (error) throw error;
                toast({ title: "Testimonial added" });
            }
            setIsDialogOpen(false);
            setEditingItem(null);
            setFormData({});
            fetchTestimonials();
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const { error } = await supabase.from("testimonials").delete().eq("id", id);
        if (!error) {
            toast({ title: "Deleted" });
            fetchTestimonials();
        }
    };

    const openEdit = (item: Testimonial) => {
        setEditingItem(item);
        setFormData(item);
        setIsDialogOpen(true);
    };

    const openNew = () => {
        setEditingItem(null);
        setFormData({ rating: 5 });
        setIsDialogOpen(true);
    };

    if (isLoading) return <Loader2 className="animate-spin" />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Testimonials</h2>
                <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" /> Add Review</Button>
            </div>

            <div className="bg-card rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Review</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-sm text-muted-foreground">{item.role}</div>
                                </TableCell>
                                <TableCell className="max-w-md truncate">{item.content}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        {item.rating} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Review" : "Add Review"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Client Name</Label>
                                <Input value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Role / Business</Label>
                                <Input value={formData.role || ""} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Review Content</Label>
                            <Textarea value={formData.content || ""} onChange={e => setFormData({ ...formData, content: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Phone Number (Optional)</Label>
                                <Input
                                    type="tel"
                                    placeholder="+91-9876543210"
                                    value={formData.phone || ""}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Rating (1-5)</Label>
                                <Input type="number" min="1" max="5" value={formData.rating || 5} onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })} />
                            </div>
                        </div>
                        <Button onClick={handleSubmit} className="w-full">Save Review</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TestimonialsTab;
