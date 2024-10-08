import { forwardRef } from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useFormContext } from 'react-hook-form';

export const SelectForm = forwardRef<HTMLDivElement, any>(({ form, name, label, description, options = [], loading = false, addMoreComponent, ...props }, ref) => {
  const { formState: { errors } } = useFormContext()
  const hasError = !!errors[name]
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel className='w-full'>
            {label}
            <span className='float-end'>
              {addMoreComponent}
            </span>
          </FormLabel>
          <Select onValueChange={(value) => isNaN(Number(value)) ? onChange(value) : onChange(Number(value))} defaultValue={value} value={value}  {...fieldProps} {...props} ref={ref}>
            <FormControl>
              <SelectTrigger loading={loading} name={name} error={hasError}>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((item: any, index: any) => (
                <SelectItem
                  key={index}
                  value={item._id}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
