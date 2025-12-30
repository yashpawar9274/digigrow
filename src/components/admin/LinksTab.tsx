import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";

interface Link {
    id: string;
    label: string;
    url: string;
    type: string | null;
    order: number | null;
}

const LinksTab = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingLink, setEditingLink] = useState<Link | null>(null);
    const [formData, setFormData] = useState<Partial<Link>>({});
    const { toast } = useToast();

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from("links").select("*").order("order");
        if (error) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        } else {
            setLinks(data || []);
        }
        setIsLoading(false);
    };

    const handleSubmit = async () => {
        try {
            if (editingLink) {
                const { error } = await supabase.from("links").update(formData).eq("id", editingLink.id);
                if (error) throw error;
                toast({ title: "Link updated" });
            } else {
                const { error } = await supabase.from("links").insert([formData as any]);
                if (error) throw error;
                toast({ title: "Link added" });
            }
            setIsDialogOpen(false);
            setEditingLink(null);
            setFormData({});
            fetchLinks();
        } catch (error: any) {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        const { error } = await supabase.from("links").delete().eq("id", id);
        if (!error) {
            toast({ title: "Link deleted" });
            fetchLinks();
        }
    };

    const openEdit = (link: Link) => {
        setEditingLink(link);
        setFormData(link);
        setIsDialogOpen(true);
    };

    const openNew = () => {
        setEditingLink(null);
        setFormData({ order: links.length + 1, type: "nav" });
        setIsDialogOpen(true);
    };

    if (isLoading) return <Loader2 className="animate-spin" />;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Navigation & Links</h2>
                <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" /> Add Link</Button>
            </div>

            <div className="bg-card rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Label</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links.map((link) => (
                            <TableRow key={link.id}>
                                <TableCell>{link.order}</TableCell>
                                <TableCell className="font-medium">{link.label}</TableCell>
                                <TableCell>{link.url}</TableCell>
                                <TableCell className="capitalize">{link.type}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(link)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(link.id)}>
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
                        <DialogTitle>{editingLink ? "Edit Link" : "Add Link"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Label</Label>
                                <Input value={formData.label || ""} onChange={e => setFormData({ ...formData, label: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={val => setFormData({ ...formData, type: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="nav">Navigation</SelectItem>
                                        <SelectItem value="social">Social</SelectItem>
                                        <SelectItem value="footer">Footer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>URL</Label>
                            <Input value={formData.url || ""} onChange={e => setFormData({ ...formData, url: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <Label>Order</Label>
                            <Input type="number" value={formData.order || 0} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                        </div>
                        <Button onClick={handleSubmit} className="w-full">Save Link</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LinksTab;
