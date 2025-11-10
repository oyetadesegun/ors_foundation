"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface ICause {
  _id?: string;
  title: string;
  description: string;
  image?: string;
  tag?: string;
  raise?: string;
  goal: string;
  createdAt: string;
}

export const CauseForm = ({
  open,
  setOpen,
  cause,
  onSaved,
}: {
  open: boolean;
  cause?: ICause | null;
  setOpen: (value: boolean) => void;
  onSaved: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");
  const [raise, setRaise] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cause) {
      setTitle(cause.title || "");
      setDescription(cause.description || "");
      setImage(cause.image || "");
      setTag(cause.tag || "");
      setGoal(cause.goal || "");
      setRaise(cause.raise || "");
    } else {
      setTitle("");
      setDescription("");
      setImage("");
    }
  }, [cause, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const method = cause ? "PUT" : "POST";
    const url = cause ? `/api/causes/${cause._id}` : "/api/causes";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, image, tag, raise, goal }),
    });

    setLoading(false);

    if (res.ok) {
      setOpen(false);
      onSaved();
      toast(cause ? "Cause updated" : "Cause created", {
        description: cause
          ? "The cause has been successfully updated."
          : "New cause has been added successfully.",
      });
    } else {
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cause ? "Edit Cause" : "Add New Cause"}</DialogTitle>
          <DialogDescription>
            {cause
              ? "Update the fields below to modify this cause."
              : "Fill in the details below to create a new cause."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              required
            />
          </div>

          <div>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              placeholder="Image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Input
              placeholder="Goal"
              value={goal}
              type="number"
              onChange={(e) => setGoal(e.target.value)}
              required
            />
            <Input
              placeholder="Raised (Optional)"
              value={raise}
              type="number"
              onChange={(e) => setRaise(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? "Saving..." : cause ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
