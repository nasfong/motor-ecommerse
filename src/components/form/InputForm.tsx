import { forwardRef } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
// import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

// type FormInputProps<T extends FieldValues> = {
//   form: UseFormReturn<T, any, undefined>
//   name: Path<T>
// }

// export const FormInput = forwardRef<HTMLDivElement, FormInputProps<FieldValues>>(({ form, name, ...props }, ref) => {
export const InputForm = forwardRef<HTMLDivElement, any>(({ form, name, label, description, ...props }, ref) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} ref={ref} onChange={event => field.onChange(props.type === 'number' ? parseFloat(event.target.value) : event.target.value)} />
          </FormControl>
          {!!description && (
            <FormDescription>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
});
