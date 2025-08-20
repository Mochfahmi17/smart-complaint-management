import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type DescriptionInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  disabled: boolean;
};

const DescriptionInput = <TFieldValues extends FieldValues>({ form, name, disabled }: DescriptionInputProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Deskripsi detail masalah</FormLabel>
          <FormControl>
            <Textarea disabled={disabled} placeholder="Jelaskan masalah secara detail" {...field} className="dark:bg-darkBlue h-28 focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white"></Textarea>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionInput;
