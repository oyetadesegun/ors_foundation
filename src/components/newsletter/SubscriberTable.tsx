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
import { Trash2 } from "lucide-react";
import moment from "moment";

export const SubscriberTable = ({
  subscribers,
  onDeleted,
}: {
  subscribers: any[];
  onDeleted: () => void;
}) => {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`/api/newsletter/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      onDeleted();
    } else {
      alert("Failed to remove subscriber");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Subscribers</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date joined</TableHead>
              <TableHead>Email Address</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {subscribers.length > 0 ? (
              subscribers.map((sub) => (
                <TableRow key={sub._id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {moment(sub.createdAt).format("MMM DD, YYYY HH:mm")}
                  </TableCell>
                  <TableCell className="font-medium">{sub.email}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(sub._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground py-8"
                >
                  No subscribers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
