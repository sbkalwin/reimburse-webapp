import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, SegmentedControl } from '@mantine/core';
import { AccountModel } from 'api-hooks/account/model';
import notification from 'common/helpers/notifications';
import Form from 'components/form';
import Input from 'components/input';
import AccountDetailList from 'modules/account-detail/list';
import { FormLayout } from 'modules/common/layout';
import React from 'react';
import { useForm } from 'react-hook-form';

import { AccountFormSchema, AccountFormType } from './account-form-type';

interface AccountFormProps {
  account?: AccountModel;
  onSubmit: (values: AccountFormType) => Promise<void>;
}

export default function AccountForm(props: AccountFormProps) {
  const [segment, setSegment] = React.useState('Informasi');
  const { account } = props;
  const defaultValues = React.useMemo<AccountFormType>(() => {
    return {
      deskripsi: account?.deskripsi ?? '',
      nama: account?.nama ?? '',
      data: account,
    };
  }, [account]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(AccountFormSchema()),
  });

  const onSubmit = React.useCallback(
    async (values: AccountFormType) => {
      try {
        await props.onSubmit(values);
      } catch (e) {
        console.error(e);
        notification.error({
          message: e.message,
        });
      }
    },
    [props],
  );

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={!props.account}
    >
      <FormLayout>
        {!!account && (
          <SegmentedControl
            w="100%"
            data={['Informasi', 'Riwayat']}
            onChange={setSegment}
          />
        )}
        {segment === 'Informasi' && (
          <Flex direction="column" gap={16}>
            <Input
              type="text"
              name="nama"
              label="Nama"
              placeholder="Masukkan Nama"
            />
            <Input
              type="text"
              name="deskripsi"
              label="Deskripsi"
              placeholder="Masukkan Deskripsi"
            />
          </Flex>
        )}
        {segment === 'Riwayat' && account && (
          <AccountDetailList account={account} />
        )}
      </FormLayout>
    </Form>
  );
}
