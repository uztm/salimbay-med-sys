import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type MedicalFormProps = {
  open: boolean;
  setOpen: (val: boolean) => void;
  patientId: number;
  doctorId: any;
  onSubmit: (data: any) => void;
};

export default function AddRehablitationDialog({
  open,
  setOpen,
  patientId,
  doctorId,
  onSubmit,
}: MedicalFormProps) {
  const [form, setForm] = useState({
    doctorId,
    plan: "",
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle>Add Medical Info</DialogTitle>
          <DialogDescription>
            Fill out patient Rehabilitation.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1 mt-4">
          <Label htmlFor="plan">Plan</Label>
          <Textarea
            id="plan"
            placeholder="Plan"
            value={form.plan}
            onChange={(e) => handleChange("plan", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
