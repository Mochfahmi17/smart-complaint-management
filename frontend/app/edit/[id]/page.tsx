import EditComplaint from "@/components/editComplaint/edit-complaint";
import { notFound } from "next/navigation";
import { use } from "react";

type EditComplaintPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditComplaintPage({ params }: EditComplaintPageProps) {
  const id = use(params).id;

  if (!id) return notFound();

  return <EditComplaint complaintId={id} />;
}
