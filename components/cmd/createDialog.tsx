"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { crud, LoadAllDoctorsCmd } from "@/app/api/apiService"; // Adjust path if needed
import { PatientsResponse } from "@/types/Patient";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  roleType: "patient" | "doctor";
};

export default function CreateDialog({ isOpen, onClose, roleType }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    doctorId: "",
  });

  const [doctors, setDoctors] = useState<PatientsResponse>();
  const isDoctor = roleType === "doctor";

  useEffect(() => {
    if (!isDoctor) {
      // Load doctors only if creating a patient (because patient needs to select doctor)
      LoadAllDoctorsCmd()
        .then((res) => {
          setDoctors(res);
        })
        .catch((err) => {
          console.error("Failed to load doctors:", err);
        });
    }
  }, [isDoctor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectDoctor = (value: string) => {
    setForm({ ...form, doctorId: value });
  };

  const handleSubmit = async () => {
    const payload = isDoctor
      ? {
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          role: 1, // Doctor role enum value
        }
      : {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          dateOfBirth: form.dateOfBirth,
          password: form.password,
          role: 0, // Patient role enum value
          doctorId: Number(form.doctorId),
        };

    console.log("Submitted payload:", payload);

    try {
      if (isDoctor) {
        const newDoctor = await crud.create({
          resource: "Doctor",
          data: payload,
        });
        console.log("Created doctor:", newDoctor);
      } else {
        const newPatient = await crud.create({
          resource: "Patient",
          data: payload,
        });
        console.log("Created patient:", newPatient);
      }
      onClose();
    } catch (error) {
      console.error("Failed to create:", error);
      // handle error (e.g., show notification)
    } finally {
      window.location.reload(); // Reload the page to reflect changes
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Create {isDoctor ? "Doctor" : "Patient"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-2">Full Name</Label>
            <Input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="mb-2">Email</Label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {!isDoctor && (
            <>
              <div>
                <Label className="mb-2">Phone</Label>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="mb-2">Date of Birth</Label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="mb-2">Assign Doctor</Label>
                <Select
                  onValueChange={handleSelectDoctor}
                  value={form.doctorId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors?.items.map((item, index) => (
                      <SelectItem key={index} value={item.id.toString()}>
                        {item.fullName} ({item.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div>
            <Label className="mb-2">Password</Label>
            <Input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
