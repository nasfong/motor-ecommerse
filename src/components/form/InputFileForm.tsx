import { forwardRef } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

export const InputFileForm = forwardRef<HTMLDivElement, any>(({ form, name, label, description, ...props }, ref) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...fieldProps}
              {...props}
              ref={ref}
              placeholder="Picture"
              type="file"
              accept="image/*, application/pdf"
              onChange={(event) =>{
                // console.log(event.target.files)
                onChange(event.target.files)
              }}
            />
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
