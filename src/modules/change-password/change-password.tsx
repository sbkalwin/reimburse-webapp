import { Space } from '@mantine/core';
import Form from 'components/form';
import Input from 'components/input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { FormLayout } from 'modules/common/layout';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  ChangePasswordFormSchema,
  ChangePasswordFormType,
} from './change-password-form-type';

export default function ChangePassword() {
  const defaultValues = React.useMemo<ChangePasswordFormType>(() => {
    return {
      password_lama: '',
      password_baru: '',
      konfirmasi_password_baru: '',
    };
  }, []);

  const resolver = useYupValidationResolver(ChangePasswordFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values) => {}, []);
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <FormLayout>
        <>
          <Input
            type="password"
            name="password_lama"
            label="Password Lama"
            placeholder="Masukkan Password Lama"
            required
          />
          <Space h={16} />
          <Input
            type="password"
            name="password_baru"
            label="Password Baru"
            placeholder="Masukkan Password Baru"
            required
          />
          <Space h={16} />
          <Input
            type="password"
            name="konfirmasi_password_baru"
            label="Konfirmasi Password Baru"
            placeholder="Masukkan Konfirmasi Password Baru"
            required
          />
        </>
      </FormLayout>
    </Form>
  );
}
