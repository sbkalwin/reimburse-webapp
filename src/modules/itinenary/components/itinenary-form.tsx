import { Flex } from '@mantine/core';
import Form from 'components/form';
import Input from 'components/input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { FormLayout } from 'modules/common/layout';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  ItinenaryFormSchema,
  ItinenaryFormType,
  ItinenaryModel,
} from './itinenary-form-type';

interface ItinenaryFormProps {
  itinenary?: ItinenaryModel;
}

export default function ItinenaryForm(props: ItinenaryFormProps) {
  const { itinenary } = props;
  const defaultValues = React.useMemo<ItinenaryFormType>(() => {
    return {
      deskripsi: itinenary?.deskripsi ?? '',
      nama: itinenary?.nama ?? '',
      tanggal_mulai: itinenary?.tanggal_mulai ?? new Date(),
      tanggal_selesai: itinenary?.tanggal_selesai ?? new Date(),
      data: itinenary,
    };
  }, [itinenary]);

  const resolver = useYupValidationResolver(ItinenaryFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: ItinenaryFormType) => {},
    [],
  );

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={!props.itinenary}
    >
      <FormLayout>
        <Flex direction="column" gap={16}>
          <Input
            type="text"
            name="nama"
            label="Nama Perjalanan"
            placeholder="Masukkan Nama Perjalanan"
          />
          <Input
            type="text"
            name="deskripsi"
            label="Deskripsi"
            placeholder="Deskripsi"
          />
          <Input
            type="date"
            name="tanggal_mulai"
            label="Tanggal Mulai"
            placeholder="Masukkan Tanggal Mulai"
          />
          <Input
            type="date"
            name="tanggal_selesai"
            label="Tanggal Selesai"
            placeholder="Masukkan Tanggal Selesai"
          />
        </Flex>
      </FormLayout>
    </Form>
  );
}
