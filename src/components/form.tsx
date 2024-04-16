import React from 'react';
import {
  FormProvider,
  FormProviderProps,
  SubmitHandler,
} from 'react-hook-form';

export interface FormProps extends React.ComponentProps<'form'> {
  methods: Omit<FormProviderProps<any>, 'children'>;
  onSubmit: SubmitHandler<any>;
  defaultEditable?: boolean;
}

export interface FormStateContextProps {
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
export const FormStateContext = React.createContext<FormStateContextProps>({
  disabled: false,
  setDisabled: () => {},
});

export default function Form(props: FormProps) {
  const { methods, onSubmit, defaultEditable = true, ...rest } = props;
  const [disabled, setDisabled] = React.useState(!defaultEditable);
  return (
    <FormStateContext.Provider
      value={{
        disabled,
        setDisabled,
      }}
    >
      <FormProvider {...methods}>
        <form
          {...rest}
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            methods.handleSubmit(onSubmit)();
          }}
        />
      </FormProvider>
    </FormStateContext.Provider>
  );
}

export function useFormState() {
  const context = React.useContext(FormStateContext);

  return context;
}

export function FormState({
  children,
}: {
  children: (context: FormStateContextProps) => React.ReactElement;
}) {
  const context = useFormState();

  return children(context);
}
