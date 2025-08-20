import z from "zod";

export const complaintSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required.").max(500, "Description is too long. Please enter a value with less than 500 characters."),
  categoryId: z.string().min(1, "Category is required."),
  photo: z.file("Photo is required.").mime(["image/jpg", "image/jpeg", "image/png", "image/webp"]).max(5_000_000).optional(),
});
