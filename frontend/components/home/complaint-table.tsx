"use client";
import { Complaint } from "@/types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import clsx from "clsx";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { apiBaseUrl } from "@/lib/api";

type ComplaintTableProps = {
  complaints: Complaint[];
  isLoading: boolean;
  mutate: () => void;
};

const ComplaintTable = ({ complaints, isLoading, mutate }: ComplaintTableProps) => {
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/complaints/delete/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        mutate();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    });
  };
  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Daftar Keluhan</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-96">Judul</TableHead>
                <TableHead className="w-48">Kategori</TableHead>
                <TableHead className="w-48">Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-600">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.title}</TableCell>
                    <TableCell>{complaint.category.name}</TableCell>
                    <TableCell>
                      <Badge
                        className={clsx({ "bg-yellow-100 text-yellow-600": complaint.status === "PENDING", "bg-blue-100 text-blue-600": complaint.status === "IN_PROGRESS", "bg-green-100 text-green-600": complaint.status === "CLOSED" })}
                      >
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="secondary" asChild className="cursor-pointer">
                          <Link href={`complaint/${complaint.id}`}>Lihat</Link>
                        </Button>
                        <Button size="sm" asChild className="cursor-pointer bg-blue-500 hover:bg-blue-500/80">
                          <Link href={`edit/${complaint.id}`}>Edit</Link>
                        </Button>
                        <Button size="sm" variant="destructive" disabled={isPending} onClick={() => handleDelete(complaint.id)} className="cursor-pointer">
                          Hapus
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-slate-600">
                    Tidak ada data komplain
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplaintTable;
