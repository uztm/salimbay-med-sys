"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { LoginCmd } from "@/app/api/apiService";
import { isLoggedIn, setToken } from "@/hooks/auth.ts";

export default function page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    try {
      const res = await LoginCmd(email, password);
      setToken(res.token);
      console.log(res);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      if (isLoggedIn()) {
        window.location.href = "/dashboard/";
      } else {
        console.error("Login failed: Invalid credentials");
      }
    }
  };

  return (
    <div className="w-full h-[100vh] bg-background">
      <div className="container mx-auto px-4 flex items-center justify-center h-full">
        <div className="min-w-sm bg-card shadow borderr rounded-xl p-5 flex flex-col gap-4">
          <h1 className="font-bold">Auth</h1>

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type={"email"}
          />
          <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={"password"}
          />
          <Button className="w-full" onClick={handleLogin}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
