"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = (redirect = false) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (redirect) router.push("/login");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        localStorage.removeItem("token");
        if (redirect) router.push("/login");
      }
      setLoading(false);
    };

    fetchUser();
  }, [redirect, router]);

  return { user, loading };
};
