import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Flex, SimpleGrid } from '@mantine/core';
import { ReimburseModel } from 'api-hooks/reimburse/model';
import { useRejectReimburse } from 'api-hooks/reimburse/mutation';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import Form from 'components/form';
import Input from 'components/input';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  ReimburseRejectFormSchema,
  ReimburseRejectFormType,
} from './reimburse-form-type';

export default function ReimburseRejectFormDialog(props: {
  onClose: () => void;
  reimburse: ReimburseModel;
}) {
  const defaultValues = React.useMemo<ReimburseRejectFormType>(() => {
    return {
      deskripsi_penolakan: '-',
      tanggal_penolakan: new Date(),
    };
  }, []);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(ReimburseRejectFormSchema()),
  });

  const { mutateAsync } = useRejectReimburse();

  const onSubmit = React.useCallback(
    async (values: ReimburseRejectFormType) => {
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
          name="tanggal_penolakan"
          label="Tanggal Penolakan"
          placeholder="Tanggal Penolakan"
          disabled
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
