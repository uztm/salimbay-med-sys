"use client";

import { isLoggedIn } from "@/hooks/auth.ts";
import { useEffect } from "react";

export default function page() {
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/auth/login";
    }
  }, []);
  return <div>page</div>;
}
