"use client";
import { apiBaseUrl } from "@/lib/api";
import { fetcher } from "@/lib/swr/fetcher";
import { ComplaintDetailResponse } from "@/types";
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import clsx from "clsx";
import { Button } from "../ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type DetailComplaintProps = {
  complaintId: string;
};

const DetailComplaint = ({ complaintId }: DetailComplaintProps) => {
  const { data } = useSWR<ComplaintDetailResponse>(`${apiBaseUrl}/complaints/${complaintId}`, fetcher);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (id?: string) => {
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
        router.push("/");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    });
  };
  const dataComplaint = data?.data;
  return (
    <section className="pt-24 pb-8">
      <div className="container mx-auto px-[3%]">
        <h1 className="text-2xl font-bold text-center">{dataComplaint?.title}</h1>

        <Card className="mt-8 max-w-xl w-full mx-auto">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2 text-xl">
                {dataComplaint?.title} -{" "}
                <Badge
                  className={clsx({
                    "bg-yellow-100 text-yellow-600": dataComplaint?.status === "PENDING",
                    "bg-blue-100 text-blue-600": dataComplaint?.status === "IN_PROGRESS",
                    "bg-green-100 text-green-600": dataComplaint?.status === "CLOSED",
                  })}
                >
                  {dataComplaint?.status}
                </Badge>
              </div>
              <p className="text-sm mt-2 text-slate-600 font-normal">Kategori: {dataComplaint?.category.name}</p>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">Deskripsi: </p>
            <p className="text-slate-600">{dataComplaint?.description}</p>

            <div className="mt-24 flex items-center justify-end gap-2">
              <Button size="sm" asChild className="cursor-pointer bg-blue-500 hover:bg-blue-500/80">
                <Link href={`/edit/${dataComplaint?.id}`}>Edit</Link>
              </Button>
              <Button size="sm" variant="destructive" disabled={isPending} onClick={() => handleDelete(dataComplaint?.id)} className="cursor-pointer">
                Hapus
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DetailComplaint;
