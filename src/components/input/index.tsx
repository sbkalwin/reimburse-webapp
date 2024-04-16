import DateInputField, { DateInputFieldProps } from './date-input-field';
import NumberInputField, { NumberInputFieldProps } from './number-input-field';
import PasswordInputField, {
  PasswordInputFieldProps,
} from './password-input-field';
import SelectField, { SelectFieldProps } from './select-input-field';
import TextInputField, { TextInputFieldProps } from './text-input-field';

export type InputProps =
  | TextInputFieldProps
  | PasswordInputFieldProps
  | DateInputFieldProps
  | NumberInputFieldProps
  | SelectFieldProps;

export default function Input(props: InputProps) {
  switch (props.type) {
    case 'date':
      return <DateInputField {...props} />;
    case 'select':
      return <SelectField {...props} />;
    case 'password':
      return <PasswordInputField {...props} />;
    case 'number':
      return <NumberInputField {...props} />;
    case 'text':
    case 'email':
    case 'tel':
    default:
      return <TextInputField {...props} />;
  }
}
