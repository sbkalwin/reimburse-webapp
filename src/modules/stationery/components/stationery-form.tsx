import { Box, Flex, Text } from '@mantine/core';
import { StationeryModel } from 'api-hooks/stationery/model';
import notification from 'common/helpers/notifications';
import Form from 'components/form';
import Input from 'components/input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { FormLayout } from 'modules/common/layout';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  StationeryFormSchema,
  StationeryFormType,
} from './stationery-form-type';

interface StationeryFormProps {
  stationery?: StationeryModel;
  onSubmit: (values: StationeryFormType) => Promise<void>;
}

export default function StationeryForm(props: StationeryFormProps) {
  const { stationery } = props;
  const defaultValues = React.useMemo<StationeryFormType>(() => {
    return {
      deskripsi: stationery?.deskripsi ?? '',
      nama: stationery?.nama ?? '',
      file_url: stationery?.fileUrl ?? '',
      harga: (stationery?.harga ?? undefined) as any,
      data: stationery,
    };
  }, [stationery]);

  const resolver = useYupValidationResolver(StationeryFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: StationeryFormType) => {
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
      defaultEditable={!props.stationery}
    >
      <FormLayout isEditable>
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
          <Input type="number" name="harga" label="Harga" placeholder="Harga" />
        </Flex>
        <Text mt={16}>File</Text>
        <Box w={64} h={64} bg="gray" />
      </FormLayout>
    </Form>
  );
}
