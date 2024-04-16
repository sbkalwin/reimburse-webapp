import {
  Button,
  Flex,
  Modal,
  SegmentedControl,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Check, X } from '@phosphor-icons/react';
import { formatDateTime } from 'common/helpers/string';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import Form from 'components/form';
import useAuth from 'hooks/use-auth';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { FormLayout } from 'modules/common/layout';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import ReimburseDetailForm from './reimburse-detail-form';
import ReimburseFinishFormDialog from './reimburse-finish-form-dialog';
import {
  ReimburseFormSchema,
  ReimburseFormType,
  ReimburseModel,
  ReimburseStatusEnum,
  ReimburseTypeEnum,
} from './reimburse-form-type';
import ReimburseInformationForm from './reimburse-information-form';
import ReimburseRejectFormDialog from './reimburse-reject-form-dialog';

interface ReimburseFormProps {
  reimburse?: ReimburseModel;
}

export default function ReimburseForm(props: ReimburseFormProps) {
  const { reimburse } = props;
  const { user, isAdmin } = useAuth();

  const [segment, setSegment] = React.useState<string>('Informasi');
  const [isOpenFinished, handleFinished] = useDisclosure(false);
  const [isOpenReject, handleReject] = useDisclosure(false);
  const { replace, query } = useRouter();

  const data = query.data
    ? (JSON.parse(query.data as any) as ReimburseFormType)
    : undefined;

  const defaultValues = React.useMemo<ReimburseFormType>(() => {
    if (data) {
      return {
        ...data,
        data: undefined,
      };
    }
    return {
      deskripsi: reimburse?.deskripsi ?? '',
      jenis: reimburse?.jenis ?? ReimburseTypeEnum.itinerary,
      nip_pemohon: reimburse?.nip_pemohon ?? user?.nip ?? '',
      nip_pic: reimburse?.nip_pemohon ?? null,
      status: reimburse?.status ?? ReimburseStatusEnum.pending,
      perjalanan_id: reimburse?.perjalanan_id ?? null,
      details: reimburse?.details?.map((detail) => {
        return {
          peralatan_kantor_id: detail.peralatan_kantor_id,
          deskripsi: detail.deskripsi,
          file_url: detail.file_url,
          nama: detail.nama,
          subtotal: detail.subtotal,
          id: detail.id,
        };
      }) ?? [
        {
          deskripsi: '',
          file_url: '',
          nama: '',
          pengembalian_id: '',
          subtotal: 0,
          peralatan_kantor_id: null,
        },
      ],
      data: reimburse,
    };
  }, [data, reimburse, user?.nip]);

  const resolver = useYupValidationResolver(ReimburseFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: ReimburseFormType) => {},
    [],
  );

  const isContribute = user?.nip === defaultValues.nip_pemohon;

  const isEditable = React.useMemo(() => {
    switch (defaultValues.status) {
      case ReimburseStatusEnum.finished:
      case ReimburseStatusEnum.rejected:
        return false;
      case ReimburseStatusEnum.pending:
      default:
        return true;
    }
  }, [defaultValues.status]);

  const onCopy = React.useCallback(() => {
    replace(
      {
        pathname: NavigationRoutes.createReimburse,
        query: {
          data: JSON.stringify(defaultValues),
        },
      },
      NavigationRoutes.createReimburse,
      {
        shallow: true,
      },
    );
  }, [defaultValues, replace]);

  const copyButton = React.useMemo(() => {
    return (
      isContribute && (
        <Button size="xs" onClick={onCopy} variant="outline">
          Buat Ulang Reimburse
        </Button>
      )
    );
  }, [isContribute, onCopy]);

  const dateComponent = React.useMemo(() => {
    if (reimburse?.tanggal_pelunasan) {
      return (
        <Text fz={11} my={16}>
          Diterima: {formatDateTime(reimburse.tanggal_pelunasan)}
        </Text>
      );
    }
    if (reimburse?.tanggal_penolakan) {
      return (
        <Flex direction="column" gap={16} my={16}>
          <Text fz={11}>
            Ditolak: {formatDateTime(reimburse.tanggal_penolakan)}
          </Text>
          <Text fz={11}>Alasan Ditolak: {reimburse.deskripsi_penolakan}</Text>
          {copyButton}
        </Flex>
      );
    }

    return null;
  }, [copyButton, reimburse]);

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={!props.reimburse}
    >
      <FormLayout isEditable={isEditable ? isContribute : false}>
        <SegmentedControl
          value={segment}
          onChange={setSegment}
          fullWidth
          data={['Informasi', 'Detail']}
          mb={16}
        />
        {segment === 'Informasi' && <ReimburseInformationForm />}
        {segment === 'Detail' && <ReimburseDetailForm />}
        {dateComponent}
        {reimburse && isAdmin && isEditable && (
          <SimpleGrid cols={2} mt={16}>
            <Button
              onClick={handleReject.open}
              rightSection={<X size={16} />}
              variant="outline"
              color="red"
            >
              Tolak Reimburse
            </Button>
            <Button
              onClick={handleFinished.open}
              rightSection={<Check size={16} />}
              variant="outline"
            >
              Terima Reimburse
            </Button>
            <Modal
              title={<Text fw={600}>Terima Reimburse</Text>}
              centered
              opened={isOpenFinished}
              onClose={handleFinished.close}
              withCloseButton={false}
              closeOnClickOutside={false}
            >
              <ReimburseFinishFormDialog onClose={handleFinished.close} />
            </Modal>
            <Modal
              title={<Text fw={600}>Tolak Reimburse</Text>}
              centered
              opened={isOpenReject}
              onClose={handleReject.close}
              withCloseButton={false}
              closeOnClickOutside={false}
            >
              <ReimburseRejectFormDialog onClose={handleReject.close} />
            </Modal>
          </SimpleGrid>
        )}
      </FormLayout>
    </Form>
  );
}
