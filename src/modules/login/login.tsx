import { Box, Button, Card, Flex, Space, Title } from '@mantine/core';
import { SignIn } from '@phosphor-icons/react';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import Form from 'components/form';
import Input from 'components/input';
import useAuth from 'hooks/use-auth';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { employees } from 'modules/user/components/user-form-type';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { LoginFormSchema, LoginFormType } from './form-type';

export default function Login() {
  const { push } = useRouter();
  const { handleUser } = useAuth();
  const defaultValues = React.useMemo<LoginFormType>(() => {
    return {
      kata_sandi: '',
      nip: '',
    };
  }, []);

  const resolver = useYupValidationResolver(LoginFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
    mode: 'onChange',
  });

  const onSubmit = React.useCallback(
    async (values) => {
      handleUser(employees[1]);
      push(NavigationRoutes.home);
    },
    [handleUser, push],
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
