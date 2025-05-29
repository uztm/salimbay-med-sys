"use client";

import React, { useEffect, useState } from "react";
import { User2, Stethoscope, ClipboardList } from "lucide-react";
import PatientsDoctor from "@/components/demo/patientsDoctor";
import { isLoggedIn } from "@/hooks/auth.ts";
import { crud, LoadDoctorsPatientsByDoctorIdCmd } from "@/app/api/apiService";
import { useUser } from "@/hooks/useUser";
import { Patient, PatientsResponse } from "@/types/Patient";

export default function Page() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const { user, loading } = useUser();
  const [data, setData] = useState<Patient[]>();

  const getMyPatients = async () => {
    if (!user) return;
    try {
      const res = await LoadDoctorsPatientsByDoctorIdCmd(user.id);
      setData(res);
      console.log({ res });
      // You might want to save patients in state here to render
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    // Run on mount and whenever user changes
    setLoggedIn(isLoggedIn());

    if (user) {
      getMyPatients();
    }
  }, [user]);

  return (
    <div className="w-full min-h-[100vh] bg-background py-10">
      <div className="container mx-auto px-4">
        <h1 className=" mb-5 font-bold">
          Hello {loading ? "Loading..." : `${user?.fullName}`}
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {data &&
            data.map((item, index) => (
              <PatientsDoctor
                item={item}
                key={index}
                index={index}
                showButtons={true}
                load={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
