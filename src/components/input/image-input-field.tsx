import { useFormState } from 'components/form';
import ImageInput, { ImageInputProps } from 'components/image-input';
import { useController } from 'react-hook-form';

export interface ImageInputFieldProps extends ImageInputProps {
  name: string;
}

export default function ImageInputField(props: ImageInputFieldProps) {
  const { name, disabled, onChange, ...rest } = props;
  const formState = useFormState();
  const { field } = useController({
    name,
  });
  const _disabled = formState.disabled || disabled;
  return (
    <ImageInput
      disabled={_disabled}
      onChange={(file) => {
        onChange?.(file);
        field.onChange(file);
      }}
      {...rest}
    />
  );
}
