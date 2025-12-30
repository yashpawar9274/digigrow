import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";

interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    description: string;
    results: string;
    link: string;
    icon: string;
    order: number | null;
}

const PortfolioTab = () => {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [formData, setFormData] = useState<Partial<PortfolioItem>>({});
    const { toast } = useToast();

    const fetchItems = async () => {
        const { data } = await supabase.from("portfolio").select("*").order("order");
        if (data) setItems(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSubmit = async () => {
        if (editingItem) {
            const { error } = await supabase.from("portfolio").update(formData).eq("id", editingItem.id);
            if (!error) toast({ title: "Portfolio item updated!" });
        } else {
            const { error } = await supabase.from("portfolio").insert([formData as any]);
            if (!error) toast({ title: "Portfolio item added!" });
        }
        setIsDialogOpen(false);
        setFormData({});
        setEditingItem(null);
        fetchItems();
    };

    const handleDelete = async (id: string) => {
        const { error } = await supabase.from("portfolio").delete().eq("id", id);
        if (!error) {
            toast({ title: "Portfolio item deleted!" });
            fetchItems();
        }
    };

    const openDialog = (item?: PortfolioItem) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({});
        }
        setIsDialogOpen(true);
    };

    if (isLoading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Portfolio Management</h2>
                <Button onClick={() => openDialog()}><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Results</TableHead>
                        <TableHead>Link</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.results}</TableCell>
                            <TableCell className="max-w-xs truncate">{item.link}</TableCell>
                            <TableCell>{item.icon}</TableCell>
                            <TableCell>{item.order}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => openDialog(item)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{editingItem ? "Edit Project" : "Add Project"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Project Title</Label>
                                <Input value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Input value={formData.category || ""} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Results</Label>
                                <Input placeholder="e.g., 3x visibility" value={formData.results || ""} onChange={e => setFormData({ ...formData, results: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Icon Name</Label>
                                <Input placeholder="e.g., Building2, Smartphone" value={formData.icon || ""} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Website Link</Label>
                                <Input type="url" placeholder="https://example.com" value={formData.link || ""} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Display Order</Label>
                                <Input type="number" value={formData.order || 0} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                            </div>
                        </div>
                        <Button onClick={handleSubmit} className="w-full">Save Project</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PortfolioTab;
