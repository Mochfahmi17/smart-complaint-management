import DetailComplaint from "@/components/detailComplaint/detail-complaint";
import { notFound } from "next/navigation";
import { use } from "react";

type DetailComplimentProps = {
  params: Promise<{ id: string }>;
};

export default function DetailCompliment({ params }: DetailComplimentProps) {
  const id = use(params).id;

  if (!id) return notFound();

  return <DetailComplaint complaintId={id} />;
}
