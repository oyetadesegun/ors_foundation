"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

export const CauseTable = ({
  causes,
  onDeleted,
  onEdit,
}: {
  causes: any[];
  onDeleted: () => void;
  onEdit: (cause: any) => void;
}) => {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this cause?")) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`/api/causes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      onDeleted();
    } else {
      alert("Failed to delete cause");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Causes</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Raised/Goal</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {causes.length > 0 ? (
              causes.map((cause) => (
                <TableRow key={cause._id}>
                  <TableCell className="font-medium">{cause.title}</TableCell>
                  <TableCell className="">
                    <div className="max-w-xs text-wrap">
                      {cause.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    {cause.image ? (
                      <img
                        src={cause.image}
                        alt={cause.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>{cause.tag}</TableCell>
                  <TableCell>
                    {cause.raise}/{cause.goal}
                  </TableCell>

                  <TableCell className="text-right flex items-center gap-2 justify-end">
                    <Button variant={"ghost"} onClick={() => onEdit(cause)}>
                      <Edit />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(cause._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground"
                >
                  No causes available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
