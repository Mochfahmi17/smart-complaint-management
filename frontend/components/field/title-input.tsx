import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type TitleInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  disabled: boolean;
};

const TitleInput = <TFieldValues extends FieldValues>({ form, name, disabled }: TitleInputProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Judul keluhan</FormLabel>
          <FormControl>
            <Input disabled={disabled} placeholder="Contoh: Pipa bocor di kamar mandi unit A-205" {...field} className="dark:bg-darkBlue focus-visible:ring-2 focus-visible:ring-slate-700 dark:text-white dark:focus-visible:ring-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleInput;
