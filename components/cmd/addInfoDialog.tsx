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

export default function AddInfoDialog({
  open,
  setOpen,
  patientId,
  doctorId,
  onSubmit,
}: MedicalFormProps) {
  const [form, setForm] = useState({
    temperature: 0,
    heartRate: 0,
    systolic: 0,
    diastolic: 0,
    painLevel: 0,
    timestamp: new Date().toISOString(),
    description: "",
    isEmergency: false,
    patientId,
    doctorId,
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
            Fill out patient vitals and condition.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="temperature">Temperature (°C)</Label>
            <Input
              id="temperature"
              type="number"
              value={form.temperature}
              onChange={(e) => handleChange("temperature", +e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="heartRate">Heart Rate (BPM)</Label>
            <Input
              id="heartRate"
              type="number"
              value={form.heartRate}
              onChange={(e) => handleChange("heartRate", +e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="systolic">Systolic Pressure</Label>
            <Input
              id="systolic"
              type="number"
              value={form.systolic}
              onChange={(e) => handleChange("systolic", +e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="diastolic">Diastolic Pressure</Label>
            <Input
              id="diastolic"
              type="number"
              value={form.diastolic}
              onChange={(e) => handleChange("diastolic", +e.target.value)}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            <Label htmlFor="painLevel">Pain Level (0–10)</Label>
            <Input
              id="painLevel"
              type="number"
              value={form.painLevel}
              onChange={(e) => handleChange("painLevel", +e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 mt-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Checkbox
            id="emergency"
            checked={form.isEmergency}
            onCheckedChange={(val) => handleChange("isEmergency", val)}
          />
          <Label htmlFor="emergency">Is Emergency?</Label>
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
