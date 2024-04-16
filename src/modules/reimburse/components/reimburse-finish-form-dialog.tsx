import { Button, Flex, SimpleGrid } from '@mantine/core';
import Form from 'components/form';
import Input from 'components/input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { accounts } from 'modules/accounts/components/account-form-type';
import React from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import {
  ReimburseFinishFormSchema,
  ReimburseFinishFormType,
  ReimburseFormType,
} from './reimburse-form-type';

export default function ReimburseFinishFormDialog(props: {
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

  const resolver = useYupValidationResolver(ReimburseFinishFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: ReimburseFinishFormType) => {
      props.onClose();
    },
    [props],
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
        <Input
          type="select"
          name="kas_id"
          label="Kas"
          placeholder="Pilih Kas"
          data={accounts.map((account) => {
            return {
              label: account.nama,
              value: account.id,
            };
          })}
        />
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
          <Button type="submit">Simpan</Button>
        </SimpleGrid>
      </Flex>
    </Form>
  );
}
