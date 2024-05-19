import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, SimpleGrid, Title } from '@mantine/core';
import {
  AccountDetailModel,
  AccountDetailTypeEnum,
  AccountModel,
} from 'api-hooks/account/model';
import notification from 'common/helpers/notifications';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import Form, { FormState } from 'components/form';
import Input from 'components/input';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  AccountDetailFormSchema,
  AccountDetailFormType,
} from './account-form-type';

interface AccountDetailFormProps {
  accountDetail?: AccountDetailModel;
  account: AccountModel;
  onClose: () => void;
  onSubmit: (values: AccountDetailFormType) => Promise<void>;
}

export default function AccountDetailForm(props: AccountDetailFormProps) {
  const { accountDetail, account } = props;
  const defaultValues = React.useMemo<AccountDetailFormType>(() => {
    return {
      data: accountDetail,
      deskripsi: accountDetail?.deskripsi ?? '-',
      jenis: accountDetail?.jenis ?? AccountDetailTypeEnum.income,
      kas_id: account.id,
      pengembalian_id: accountDetail?.pengembalian?.id ?? '',
      total: 0,
    };
  }, [account.id, accountDetail]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(AccountDetailFormSchema()),
  });

  const onSubmit = React.useCallback(
    async (values: AccountDetailFormType) => {
      try {
        await props.onSubmit(values);
        props.onClose();
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [props],
  );

  const reimburse = accountDetail?.pengembalian;
  const reimburseRoute = `${NavigationRoutes.reimburses}/${reimburse?.id}`;
  const reimburseLabel = [reimburse?.id];

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={!accountDetail}
    >
      <Flex direction="column" gap={16}>
        {reimburse && (
          <Link href={reimburseRoute}>
            <Title c="blue" order={6}>
              Detail Reimburse: {reimburseLabel}
            </Title>
          </Link>
        )}
        <Input
          type="text"
          name="deskripsi"
          label="Deskripsi"
          placeholder="Masukkan Deskripsi"
        />
        <Input
          type="select"
          name="jenis"
          data={[AccountDetailTypeEnum.income, AccountDetailTypeEnum.outcome]}
          label="Jenis"
          placeholder="Masukkan Jenis"
        />
        <Input
          type="number"
          name="total"
          label="Total"
          placeholder="Masukkan Total"
        />
        {!reimburse && (
          <SimpleGrid cols={2}>
            <FormState>
              {({ disabled, setDisabled }) => {
                const isEdit = !!props.accountDetail;
                return (
                  <>
                    <Button
                      color="red"
                      variant="subtle"
                      onClick={() => {
                        methods.reset();
                        props.onClose();
                      }}
                    >
                      Batal
                    </Button>
                    {!disabled && (
                      <Button
                        type="button"
                        onClick={() => {
                          methods.handleSubmit(onSubmit)();
                        }}
                        loading={methods.formState.isSubmitting}
                      >
                        Simpan
                      </Button>
                    )}
                    {isEdit && disabled && (
                      <Button
                        onClick={() => {
                          setDisabled(false);
                        }}
                      >
                        Edit
                      </Button>
                    )}
                  </>
                );
              }}
            </FormState>
          </SimpleGrid>
        )}
      </Flex>
    </Form>
  );
}
