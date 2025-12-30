import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Loader2 } from "lucide-react";

interface SiteSetting {
    key: string;
    value: string;
    description: string | null;
}

const ContentTab = () => {
    const [settings, setSettings] = useState<SiteSetting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingSetting, setEditingSetting] = useState<SiteSetting | null>(null);
    const [editValue, setEditValue] = useState("");
    const { toast } = useToast();

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("site_settings")
            .select("*")
            .order("key");

        if (error) {
            toast({
                title: "Error fetching settings",
                description: error.message,
                variant: "destructive",
            });
        } else {
            setSettings(data || []);
        }
        setIsLoading(false);
    };

    const handleEdit = (setting: SiteSetting) => {
        setEditingSetting(setting);
        setEditValue(setting.value);
    };

    const handleSave = async () => {
        if (!editingSetting) return;

        const { error } = await supabase
            .from("site_settings")
            .update({ value: editValue })
            .eq("key", editingSetting.key);

        if (error) {
            toast({
                title: "Error updating setting",
                description: error.message,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Setting updated",
                description: `${editingSetting.key} has been updated.`,
            });
            setSettings(settings.map(s => s.key === editingSetting.key ? { ...s, value: editValue } : s));
            setEditingSetting(null);
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Site Content & Settings</h2>
            </div>

            <div className="bg-card rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Setting</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {settings.map((setting) => (
                            <TableRow key={setting.key}>
                                <TableCell>
                                    <div className="font-medium">{setting.key}</div>
                                    <div className="text-sm text-muted-foreground">{setting.description}</div>
                                </TableCell>
                                <TableCell className="max-w-md truncate" title={setting.value}>
                                    {setting.value}
                                </TableCell>
                                <TableCell>
                                    <Dialog open={!!editingSetting && editingSetting.key === setting.key} onOpenChange={(open) => !open && setEditingSetting(null)}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(setting)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit {setting.key}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label>Value</Label>
                                                    <Input
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                    />
                                                </div>
                                                <Button onClick={handleSave} className="w-full">Save Changes</Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ContentTab;
