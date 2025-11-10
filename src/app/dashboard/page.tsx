"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CauseTable } from "@/components/causes/CauseTable";
import { CauseForm } from "@/components/causes/CauseForm";

export default function CausesDashboard() {
  const [causes, setCauses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState<any | null>(null);

  const fetchCauses = async () => {
    setLoading(true);
    const res = await fetch("/api/causes");
    const data = await res.json();
    setCauses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCauses();
  }, []);

  const handleEdit = (cause: any) => {
    setSelectedCause(cause);
    setOpen(true);
  };

  const handleNew = () => {
    setSelectedCause(null);
    setOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Causes Management
        </h1>

        <Button onClick={handleNew}>
          <Plus className="w-4 h-4 mr-2" /> New Cause
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading causes...</p>
      ) : (
        <CauseTable
          causes={causes}
          onEdit={handleEdit}
          onDeleted={fetchCauses}
        />
      )}

      <CauseForm
        open={open}
        setOpen={setOpen}
        cause={selectedCause}
        onSaved={fetchCauses}
      />
    </div>
  );
}
