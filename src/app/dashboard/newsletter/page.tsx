"use client";

import { useEffect, useState } from "react";
import { SubscriberTable } from "@/components/newsletter/SubscriberTable";

export default function NewsletterDashboard() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/newsletter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSubscribers(data);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Newsletter Management
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage your email subscriber list.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground animate-pulse">Loading subscribers...</p>
        </div>
      ) : (
        <SubscriberTable
          subscribers={subscribers}
          onDeleted={fetchSubscribers}
        />
      )}
    </div>
  );
}
