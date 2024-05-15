import { Box, Button, Card, Flex, Space, Title } from '@mantine/core';
import { SignIn } from '@phosphor-icons/react';
import { EmployeeModel } from 'api-hooks/auth/model';
import { useLogin } from 'api-hooks/auth/mutation';
import { plainToClass } from 'class-transformer';
import notification from 'common/helpers/notifications';
import { setToken } from 'common/helpers/token';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import Form from 'components/form';
import Input from 'components/input';
import useAuth from 'hooks/use-auth';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { verifyToken } from 'utils/server';

import { LoginFormSchema, LoginFormType } from './form-type';

export default function Login() {
  const { push } = useRouter();
  const { handleUser } = useAuth();
  const defaultValues = React.useMemo<LoginFormType>(() => {
    return {
      kata_sandi: 'superadmin',
      nip: 'superadmin',
    };
  }, []);

  const resolver = useYupValidationResolver(LoginFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const { mutateAsync } = useLogin();

  const onSubmit = React.useCallback(
    async (values: LoginFormType) => {
      try {
        const result = await mutateAsync(values);
        const token = result.data.token;
        const user = verifyToken(token);
        if (user) {
          handleUser(plainToClass(EmployeeModel, user));
        }
        setToken(token);
        push(NavigationRoutes.home);
      } catch (e) {
        console.error(e);
        notification.error({
          message: e.message,
        });
      }
    },
    [handleUser, mutateAsync, push],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Flex align="center" justify="center" miw="100vw" mih="100vh" p={16}>
        <Card withBorder shadow="xs" miw={320} maw={600} radius="md" w="100%">
          <Title order={6} mb={8} ta="center">
            Reimburse-app
          </Title>
          <Box bg="dark" m="auto" h={36} w={120} />
          <Space h={24} />
          <Input
            type="text"
            name="nip"
            label="NIP"
            placeholder="Masukkan NIP"
          />
          <Space h={16} />
          <Input
            type="password"
            name="kata_sandi"
            label="Kata Sandi"
            placeholder="Masukkan Kata Sandi"
          />
          <Space h={16} />
          <Button
            loading={methods.formState.isSubmitting}
            fullWidth
            type="submit"
            leftSection={<span />}
            rightSection={<SignIn size={16} />}
          >
            Login
          </Button>
        </Card>
      </Flex>
    </Form>
  );
}
