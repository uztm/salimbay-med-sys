"use client";

import { isLoggedIn } from "@/hooks/auth.ts";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function page() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/auth/login";
    } else {
      if (!loading && user) {
        switch (user.role) {
          case "AdminDoctor":
            router.push("/dashboard/admin");
            break;
          case "Doctor":
            router.push("/dashboard/doctor");
            break;
          case "Moderator":
            router.push("/dashboard/nurse");
            break;
          case "Patient":
            router.push("/dashboard/patient");
            break;
          default:
            router.push("/");
        }
      }
    }
  }, [isLoggedIn, user, loading, router]);
  return <div>page</div>;
}
