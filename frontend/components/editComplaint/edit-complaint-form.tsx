"use client";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import z from "zod";
import { complaintSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TitleInput from "../field/title-input";
import CategorySelect from "../field/category-select";
import DescriptionInput from "../field/description-input";
import { Card, CardContent } from "../ui/card";
import PhotoInput from "../field/photo-input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { apiBaseUrl } from "@/lib/api";
import { Complaint, ComplaintDetailResponse } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type EditComplaintFormProps = {
  initialData: Complaint;
};

const EditComplaintForm = ({ initialData }: EditComplaintFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof complaintSchema>>({
    resolver: zodResolver(complaintSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description,
      categoryId: initialData.categoryId,
      photo: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof complaintSchema>) => {
    console.log({ values });
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("categoryId", values.categoryId);
        if (values.photo) {
          formData.append("photo", values.photo);
        }
        const res = await fetch(`${apiBaseUrl}/complaints/update/${initialData.id}`, {
          method: "PUT",
          body: formData,
        });

        const data: ComplaintDetailResponse = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        form.reset();
        router.push("/");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    });
  };
  return (
    <Card className="max-w-xl w-full mt-8 mx-auto shadow-lg">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              <TitleInput form={form} name="title" disabled={isPending} />
              <CategorySelect form={form} name="categoryId" disabled={isPending} />
              <DescriptionInput form={form} name="description" disabled={isPending} />
              <PhotoInput form={form} name="photo" disabled={isPending} oldPreview={initialData.photoUrl} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" type="button" disabled={isPending} onClick={() => form.reset()} className="shadow cursor-pointer">
                Reset
              </Button>
              <Button type="submit" disabled={isPending} className="cursor-pointer bg-violet-500 hover:bg-violet-500/80">
                {isPending ? "Loading..." : "Update Keluhan"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditComplaintForm;
