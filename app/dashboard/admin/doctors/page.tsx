"use client";

import React, { useEffect, useState } from "react";

import { DataTableDemo } from "@/components/demo/dataTable";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { crud } from "@/app/api/apiService";
import { Patient, PatientsResponse } from "@/types/Patient";
import CreateDialog from "@/components/cmd/createDialog";

export default function Page() {
  const [data, setData] = useState<PatientsResponse>();
  const getDcoctors = async () => {
    try {
      const res = await crud.loadAll("Doctor");
      setData(res);
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    getDcoctors();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const [createRole, setCreateRole] = useState<"patient" | "doctor">("patient");

  return (
    <div className="w-full min-h-[100vh] bg-background py-10">
      <div className="container mx-auto px-4">
        <div
          className="w-full h-[120px] rounded-md mb-5 flex items-center px-12 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://avatars.mds.yandex.net/i?id=15d8c8e8531a916cc89ba7429b065889_l-4936065-images-thumbs&n=13')",
          }}
        >
          <div className="flex items-center gap-4 justify-between w-full">
            <Link href={"/dashboard/admin"}>
              <Button
                className=" cursor-pointer"
                variant={"outline"}
                size={"icon"}
              >
                <Home />
              </Button>
            </Link>
            <h1 className="font-bold text-2xl text-white drop-shadow">
              Doctors
            </h1>

            <Button
              className="ml-auto"
              onClick={() => {
                setCreateRole("doctor");
                setOpenDialog(true);
              }}
            >
              Create Doctor
            </Button>
          </div>
        </div>
        {data && <DataTableDemo data={data?.items} />}

        <CreateDialog
          isOpen={openDialog}
          onClose={() => setOpenDialog(false)}
          roleType={createRole}
        />
      </div>
    </div>
  );
}
