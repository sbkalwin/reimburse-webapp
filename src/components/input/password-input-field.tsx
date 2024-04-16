import { PasswordInput, PasswordInputProps } from '@mantine/core';
import { useFormState } from 'components/form';
import React from 'react';
import { useController } from 'react-hook-form';

export interface PasswordInputFieldProps extends PasswordInputProps {
  type: 'password';
  name: string;
  onAfterChange?: (value: string) => void;
}

export default function PasswordInputField(props: PasswordInputFieldProps) {
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
    <PasswordInput
      {...rest}
      {...field}
      disabled={_disabled}
      error={error}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      onChange={(e) => {
        field.onChange(e.currentTarget.value);
        onAfterChange?.(e.currentTarget.value);
      }}
    />
  );
}
