import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, SimpleGrid } from '@mantine/core';
import { ReimburseModel } from 'api-hooks/reimburse/model';
import { useFinishReimburse } from 'api-hooks/reimburse/mutation';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import Form from 'components/form';
import Input from 'components/input';
import AccountSelect from 'modules/select/account-select';
import React from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import {
  ReimburseFinishFormSchema,
  ReimburseFinishFormType,
  ReimburseFormType,
} from './reimburse-form-type';

export default function ReimburseFinishFormDialog(props: {
  reimburse: ReimburseModel;
  onClose: () => void;
}) {
  const { getValues } = useFormContext<ReimburseFormType>();
  const total = getValues('details').reduce(
    (prev, detail) => prev + detail.subtotal,
    0,
  );

  const pengembalian_id = getValues('data.id');

  const defaultValues = React.useMemo<ReimburseFinishFormType>(() => {
    return {
      tanggal_pelunasan: new Date(),
      deskripsi: '-',
      kas_id: '',
      total,
      pengembalian_id,
    };
  }, [pengembalian_id, total]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ReimburseFinishFormSchema()),
  });

  const { mutateAsync } = useFinishReimburse();

  const onSubmit = React.useCallback(
    async (values: ReimburseFinishFormType) => {
      try {
        const result = await mutateAsync({
          id: props.reimburse.id,
          data: { ...values, name: `Reimburse no: ${props.reimburse.id}` },
        });
        notification.success({
          message: result.message,
        });
        queryClient.refetchQueries();

        props.onClose();
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [mutateAsync, props],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Flex gap={16} direction="column">
        <Input
          type="date"
          name="tanggal_pelunasan"
          label="Tanggal Pelunasan"
          placeholder="Tanggal Pelunasan"
        />
        <AccountSelect name="kas_id" label="Kas" placeholder="Pilih Kas" />
        <Input
          type="text"
          name="deskripsi"
          label="Deskripsi"
          placeholder="Masukkan Deskripsi"
        />
        <Input
          type="number"
          name="total"
          label="Total Pelunasan"
          placeholder="Total Pelunasan"
        />
        <SimpleGrid cols={2}>
          <Button onClick={props.onClose} type="button" color="red">
            Batal
          </Button>
          <Button
            type="button"
            loading={methods.formState.isSubmitting}
            onClick={() => {
              methods.handleSubmit(onSubmit)();
            }}
          >
            Simpan
          </Button>
        </SimpleGrid>
      </Flex>
    </Form>
  );
}
