import { TextInput, TextInputProps } from '@mantine/core';
import { useFormState } from 'components/form';
import React from 'react';
import { useController } from 'react-hook-form';

export interface TextInputFieldProps extends TextInputProps {
  type: 'text' | 'email' | 'tel';
  name: string;
  onAfterChange?: (value: string) => void;
}

export default function TextInputField(props: TextInputFieldProps) {
  const {
    name,
    type,
    disabled,
    readOnly,
    rightSection,
    onAfterChange,
    ...rest
  } = props;
  const formState = useFormState();
  const { field, fieldState } = useController({
    name,
  });

  const _disabled = disabled || readOnly || formState.disabled;
  const error = fieldState.error?.message;

  return (
    <TextInput
      {...field}
      {...rest}
      disabled={_disabled}
      error={error}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      onChange={(e) => {
        field.onChange(e.target.value);
        onAfterChange?.(e.target.value);
      }}
    />
  );
}
