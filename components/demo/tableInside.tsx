"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { Patient, RecoveryPlan, VitalSign } from "@/types/Patient";
import { UserRole } from "@/types/UserRole";
import { Button } from "../ui/button";
import { crud } from "@/app/api/apiService";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Separator } from "@radix-ui/react-select";

type Props = {
  data: Patient;
  showButtons?: boolean;
  load?: boolean;
};
export function TableInside({ data, showButtons, load }: Props) {
  const [response, setResponse] = useState<VitalSign[]>([]);
  const [rehabi, setRehabi] = useState<RecoveryPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const getRecoveryLog = async () => {
    if (data.id) {
      setLoading(true);
      try {
        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const res = await crud.loadAllById({
          resource: "RecoveryLog/patient",
          id: data.id,
        });

        const rehabiRes = await crud.loadAllById({
          resource: "Rehabilitation/progress",
          id: data.id,
        });
        setRehabi(rehabiRes);
        console.log({ rehabiRes });

        setResponse(res);
      } catch (error) {
        console.error("Error fetching recovery log:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (load) {
      getRecoveryLog();
    }
  }, [data]);

  return (
    <div className="max-h-96 overflow-y-auto">
      <Table>
        <TableCaption>User Information </TableCaption>
        <TableBody>
          {data.id && (
            <TableRow>
              <TableCell className="font-medium">ID</TableCell>
              <TableCell>{data.id}</TableCell>
            </TableRow>
          )}
          {data.fullName && (
            <TableRow>
              <TableCell className="font-medium">Full Name</TableCell>
              <TableCell>{data.fullName}</TableCell>
            </TableRow>
          )}
          {data.email && (
            <TableRow>
              <TableCell className="font-medium">Email</TableCell>
              <TableCell>{data.email}</TableCell>
            </TableRow>
          )}
          {data.phone && (
            <TableRow>
              <TableCell className="font-medium">Phone</TableCell>
              <TableCell>{data.phone}</TableCell>
            </TableRow>
          )}
          {data.dateOfBirth && (
            <TableRow>
              <TableCell className="font-medium">Date of Birth</TableCell>
              <TableCell>
                {new Date(data.dateOfBirth).toLocaleDateString()}
              </TableCell>
            </TableRow>
          )}
          {data.role !== undefined && (
            <TableRow>
              <TableCell className="font-medium">Role</TableCell>
              <TableCell>{UserRole[data.role]}</TableCell>
            </TableRow>
          )}
          {data.doctorId && (
            <TableRow>
              <TableCell className="font-medium">Doctor ID</TableCell>
              <TableCell>{data.doctorId}</TableCell>
            </TableRow>
          )}

          {load ? (
            <>
              {loading && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" />
                      Loading recovery log...
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!loading && rehabi.length > 0 && (
                <>
                  {rehabi.map((plan, idx) => (
                    <React.Fragment key={`rehab-${idx}`}>
                      <TableRow>
                        <TableCell colSpan={2} className="font-bold">
                          Recovery Plan {idx + 1}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Plan</TableCell>
                        <TableCell>{plan.plan}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Progress Note
                        </TableCell>
                        <TableCell>{plan.progressNote ?? "N/A"}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Date Assigned
                        </TableCell>
                        <TableCell>
                          {new Date(plan.dateAssigned).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Date Updated
                        </TableCell>
                        <TableCell>
                          {plan.dateUpdated
                            ? new Date(plan.dateUpdated).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                      {idx < rehabi.length - 1 && (
                        <TableRow>
                          <TableCell colSpan={2}>
                            <hr />
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}

              {/* VitalSigns Display */}
              {!loading &&
                response.length > 0 &&
                response.map((entry, idx) => (
                  <React.Fragment key={idx}>
                    <TableRow>
                      <TableCell colSpan={2} className="font-bold">
                        Vital Signs Entry {idx + 1}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Temperature</TableCell>
                      <TableCell>{entry.temperature} °C</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Heart Rate</TableCell>
                      <TableCell>{entry.heartRate} bpm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Systolic</TableCell>
                      <TableCell>{entry.systolic} mmHg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Diastolic</TableCell>
                      <TableCell>{entry.diastolic} mmHg</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pain Level</TableCell>
                      <TableCell>{entry.painLevel}/10</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Description</TableCell>
                      <TableCell>{entry.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        Is Emergency
                      </TableCell>
                      <TableCell>{entry.isEmergency ? "Yes" : "No"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Timestamp</TableCell>
                      <TableCell>
                        {new Date(entry.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                    {/* Optional separator */}
                    {idx < response.length - 1 && (
                      <TableRow>
                        <TableCell colSpan={2}>
                          <hr />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
            </>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}
