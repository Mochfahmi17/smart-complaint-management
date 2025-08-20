import { apiBaseUrl } from "@/lib/api";
import EditComplaintForm from "./edit-complaint-form";
import { ComplaintDetailResponse } from "@/types";
import { use } from "react";

type EditComplaintProps = {
  complaintId: string;
};

const fetchingGetDetailComplaint = async (complaintId: string) => {
  const res = await fetch(`${apiBaseUrl}/complaints/${complaintId}`, {
    method: "GET",
  });

  const data: ComplaintDetailResponse = await res.json();

  const complaint = data.data;

  return complaint;
};

const EditComplaint = ({ complaintId }: EditComplaintProps) => {
  const dataComplaint = use(fetchingGetDetailComplaint(complaintId));
  return (
    <section className="pt-24 pb-8">
      <div className="container mx-auto px-[3%]">
        <h1 className="text-2xl font-bold text-center">Edit Keluhan</h1>
        <p className="text-slate-600 text-center">Laporkan masalah yang anda alami dengan lengkap dan jelas</p>

        {/* form */}
        <EditComplaintForm initialData={dataComplaint} />
      </div>
    </section>
  );
};

export default EditComplaint;
