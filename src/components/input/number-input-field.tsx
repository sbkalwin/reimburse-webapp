import { NumberInput, NumberInputProps } from '@mantine/core';
import { useFormState } from 'components/form';
import React from 'react';
import { useController } from 'react-hook-form';

export interface NumberInputFieldProps extends Omit<NumberInputProps, 'type'> {
  type: 'number';
  name: string;
  onAfterChange?: (value: string | number) => void;
}

export default function NumberInputField(props: NumberInputFieldProps) {
  const {
    type,
    name,
    onAfterChange,
    disabled,
    readOnly,
    thousandSeparator = true,
    ...rest
  } = props;
  const formState = useFormState();

  const { field, fieldState } = useController({
    name,
  });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <NumberInput
      {...rest}
      {...field}
      thousandSeparator={thousandSeparator}
      hideControls
      disabled={_disabled}
      error={error}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      onChange={(val) => {
        field.onChange(val);
      }}
    />
  );
}
