import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    price: string | null;
    order: number | null;
}

const ServicesTab = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState<Partial<Service>>({});
    const { toast } = useToast();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("services")
            .select("*")
            .order("order");

        if (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
            setServices(data || []);
        }
        setIsLoading(false);
    };

    const handleSubmit = async () => {
        try {
            if (editingService) {
                const { error } = await supabase
                    .from("services")
                    .update(formData)
                    .eq("id", editingService.id);
                if (error) throw error;
                toast({ title: "Service updated" });
            } else {
                const { error } = await supabase
                    .from("services")
                    .insert([formData as any]);
                if (error) throw error;
                toast({ title: "Service added" });
            }
            setIsDialogOpen(false);
            setEditingService(null);
            setFormData({});
            fetchServices();
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const { error } = await supabase.from("services").delete().eq("id", id);
        if (!error) {
            toast({ title: "Service deleted" });
            fetchServices();
        }
    };

    const openEdit = (service: Service) => {
        setEditingService(service);
        setFormData(service);
        setIsDialogOpen(true);
    };

    const openNew = () => {
        setEditingService(null);
        setFormData({ order: services.length + 1 });
        setIsDialogOpen(true);
    };

    if (isLoading) return <Loader2 className="animate-spin" />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Services</h2>
                <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" /> Add Service</Button>
            </div>

            <div className="bg-card rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Icon</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell>{service.order}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{service.title}</div>
                                    <div className="text-sm text-muted-foreground truncate max-w-xs">{service.description}</div>
                                </TableCell>
                                <TableCell>{service.price}</TableCell>
                                <TableCell>{service.icon}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(service)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
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
                        <DialogTitle>{editingService ? "Edit Service" : "Add Service"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Price</Label>
                                <Input value={formData.price || ""} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Icon Name</Label>
                                <Input value={formData.icon || ""} onChange={e => setFormData({ ...formData, icon: e.target.value })} placeholder="e.g. Activity" />
                            </div>
                            <div className="space-y-2">
                                <Label>Order</Label>
                                <Input type="number" value={formData.order || 0} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                            </div>
                        </div>
                        <Button onClick={handleSubmit} className="w-full">Save Service</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ServicesTab;
