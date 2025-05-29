import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { User2 } from "lucide-react";
import { TableInside } from "./tableInside";
import { Patient } from "@/types/Patient";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";

import { crud } from "@/app/api/apiService";
import { UserRoleCrud } from "@/types/UserRoleCrud";
import AddInfoDialog from "../cmd/addInfoDialog";
import { useUser } from "@/hooks/useUser";
import AddRehablitationDialog from "../cmd/addRehablitation";

type props = {
  index: any;
  item: Patient;
  showButtons?: boolean;
  load?: boolean;
};

export default function PatientsDoctor({
  item,
  index,
  showButtons,
  load,
}: props) {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [openAddInfo, setOopenAddInfo] = useState(false);
  const [openRehabi, setRehabiInfo] = useState(false);

  const { user } = useUser();

  const handleDeleteConfirmed = async () => {
    setLoading(true);
    try {
      const resourceName = UserRoleCrud[item.role];
      await crud.remove({ resource: resourceName, id: item.id });
      alert("Deleted successfully");
      // Refresh list or notify parent here as needed
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete. See console.");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      window.location.reload();
    }
  };

  return (
    <>
      {/* Main Patient Info Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            key={index}
            className="bg-card p-6 rounded-md shadow cursor-pointer text-foreground transition relative"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary flex-shrink-0 rounded-full border flex items-center justify-center">
                <User2 className="text-white" />
              </div>
              <h1>{item.fullName}</h1>

              <div className="ml-auto absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      aria-label="Actions"
                      className="p-2 rounded hover:bg-muted transition"
                      onClick={(e) => e.stopPropagation()} // prevent dialog open
                    >
                      <MoreVertical size={20} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" side="bottom">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setConfirmOpen(true);
                      }}
                      disabled={loading}
                    >
                      Delete
                    </DropdownMenuItem>
                    {showButtons ? (
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOopenAddInfo(true);
                        }}
                        disabled={loading}
                      >
                        Recovery
                      </DropdownMenuItem>
                    ) : null}

                    {showButtons ? (
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOopenAddInfo(true);
                        }}
                        disabled={loading}
                      >
                        Rehablitation
                      </DropdownMenuItem>
                    ) : null}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] bg-card">
          <DialogHeader>
            <DialogTitle>Patient</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-background rounded-full border flex items-center justify-center">
              <User2 />
            </div>
            <h1>{item.fullName}</h1>
          </div>

          <TableInside data={item} showButtons={showButtons} load={load} />
        </DialogContent>
      </Dialog>

      {/* Separate Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{item.fullName}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirmed}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {user && (
        <AddInfoDialog
          open={openRehabi}
          setOpen={setRehabiInfo}
          patientId={item.id}
          doctorId={user.id}
          onSubmit={async (data) => {
            try {
              const res = await crud.createByID({
                resource: "RecoveryLog",
                data: data,
                id: item.id,
              });
              console.log({ res });
            } catch (err) {
              console.log({ err });
            }
          }}
        />
      )}

      {user && (
        <AddRehablitationDialog
          open={openAddInfo}
          setOpen={setOopenAddInfo}
          patientId={item.id}
          doctorId={user.id}
          onSubmit={async (data) => {
            try {
              const res = await crud.createByID({
                resource: "Rehabilitation/plan",
                data: data,
                id: item.id,
              });
              console.log({ res });
            } catch (err) {
              console.log({ err });
            }
          }}
        />
      )}
    </>
  );
}
