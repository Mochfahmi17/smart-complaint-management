"use client";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRef, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { IoCloudUpload } from "react-icons/io5";

type PhotoInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  disabled: boolean;
  oldPreview?: string;
};

const PhotoInput = <TFieldValues extends FieldValues>({ form, name, oldPreview, disabled }: PhotoInputProps<TFieldValues>) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [deleteOldPreiew, setDeleteOldPreview] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const deleteImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }

    form.resetField(name);
    setDeleteOldPreview(true);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const displayPreview = preview || (!deleteOldPreiew && oldPreview);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="dark:text-white">
            Foto bukti masalah <span className="text-slate-500">(opsional)</span>
          </FormLabel>
          <div className="relative flex aspect-video h-60 w-full flex-col overflow-hidden rounded-lg">
            {displayPreview ? (
              <>
                <Image src={displayPreview} alt="Profile Preview" fill className="object-cover object-center" />
                <Button type="button" variant="destructive" onClick={deleteImage} className="relative w-fit cursor-pointer self-end">
                  Delete
                </Button>
              </>
            ) : (
              <FormLabel className="dark:bg-darkBlue relative flex aspect-video h-60 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-200 text-slate-600">
                <IoCloudUpload className="size-24 dark:text-white" />
                <h4 className="mb-2 text-2xl font-bold dark:text-white">Upload Foto</h4>
                <p className="text-xs font-normal dark:text-slate-300">JPG, JPEG, PNG, Webp (max: 5MB)</p>
              </FormLabel>
            )}
          </div>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              ref={inputRef}
              disabled={disabled}
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(file);

                if (file) {
                  if (preview) {
                    URL.revokeObjectURL(preview);
                  }

                  const imageURL = URL.createObjectURL(file);
                  setPreview(imageURL);
                }
              }}
              className="hidden focus-visible:ring-2 focus-visible:ring-slate-700"
            />
          </FormControl>
          <FormDescription className="text-xs">Foto yang jelas akan membantu petugas memahami masalah dengan baik.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhotoInput;
