"use client";

import { useEffect, useState } from "react";
import { ContactTable } from "@/components/contact/ContactTable";

export default function ContactDashboard() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Contact Submissions
        </h1>
        <p className="text-sm text-muted-foreground">
          View and manage messages from the contact form.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground animate-pulse">Loading submissions...</p>
        </div>
      ) : (
        <ContactTable
          contacts={contacts}
          onDeleted={fetchContacts}
        />
      )}
    </div>
  );
}
