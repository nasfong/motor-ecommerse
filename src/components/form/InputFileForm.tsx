import { forwardRef } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

export const InputFileForm = forwardRef<HTMLDivElement, any>(({ form, name, label, description, onChanges, ...props }, ref) => {
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
              onChange={onChanges ? onChanges : (event) => {
                const files = Array.from(event.target.files || []);
                const preData = Array.isArray(value) ? value : [];
                onChange([...preData, ...files]);
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
