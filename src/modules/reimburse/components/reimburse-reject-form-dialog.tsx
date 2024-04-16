import { Button, Flex, SimpleGrid } from '@mantine/core';
import Form from 'components/form';
import Input from 'components/input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  ReimburseRejectFormSchema,
  ReimburseRejectFormType,
} from './reimburse-form-type';

export default function ReimburseRejectFormDialog(props: {
  onClose: () => void;
}) {
  const defaultValues = React.useMemo<ReimburseRejectFormType>(() => {
    return {
      deskripsi_penolakan: '-',
      tanggal_penolakan: new Date(),
    };
  }, []);

  const resolver = useYupValidationResolver(ReimburseRejectFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(() => {
    props.onClose();
  }, [props]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Flex gap={16} direction="column">
        <Input
          type="date"
          name="tanggal_penolakan"
          label="Tanggal Penolakan"
          placeholder="Tanggal Penolakan"
        />
        <Input
          type="text"
          name="deskripsi_penolakan"
          label="Deskripsi Penolakan"
          placeholder="Masukkan Deskripsi Penolakan"
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
