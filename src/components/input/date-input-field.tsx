import { DatePickerInput, DatePickerInputProps } from '@mantine/dates';
import { useFormState } from 'components/form';
import { useController } from 'react-hook-form';

export interface DateInputFieldProps
  extends Omit<DatePickerInputProps, 'type'> {
  type: 'date';
  name: string;
  onAfterChange?: (value: Date | null) => void;
}

export default function DateInputField(props: DateInputFieldProps) {
  const { type, name, disabled, readOnly, onAfterChange, ...rest } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });
  const _disabled = disabled || readOnly || formState.disabled;

  const error = fieldState.error?.message;

  return (
    <DatePickerInput
      {...rest}
      {...(field as any)}
      dropdownType="modal"
      modalProps={{
        centered: true,
      }}
      disabled={_disabled}
      value={field.value}
      onChange={(val) => {
        field.onChange(val);
        onAfterChange?.(val);
      }}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      error={error}
    />
  );
}
