import { Flex, Text } from '@mantine/core';
import { ReimburseTypeEnum } from 'api-hooks/reimburse/model';
import Input from 'components/input';
import ItinenarySelect from 'modules/select/itinenary-select';
import UserSelect from 'modules/select/user-select';
import { useFormContext, useWatch } from 'react-hook-form';

import { ReimburseFormType } from './reimburse-form-type';
import ReimburseStatusBadge from './reimburse-status-badge';

function SelectItinery() {
  const { control } = useFormContext<ReimburseFormType>();
  const type = useWatch({
    control,
    name: 'jenis',
  });
  switch (type) {
    case ReimburseTypeEnum.itinerary:
      return (
        <ItinenarySelect
          name="perjalanan_id"
          label="Perjalanan"
          placeholder="Masukkan Perjalanan"
        />
      );
    case ReimburseTypeEnum.stationery:
    default:
      return null;
  }
}

export default function ReimburseInformationForm() {
  const { getValues, setValue } = useFormContext<ReimburseFormType>();
  const data = getValues('data');

  return (
    <Flex gap={16} direction="column">
      {!!data && (
        <Flex direction="row" align="center" gap={6}>
          <Text fw={500} fz={14}>
            Status:
          </Text>
          <ReimburseStatusBadge status={data?.status} />
        </Flex>
      )}
      <UserSelect
        name="nip_pemohon"
        label="Pemohon"
        placeholder="Masukkan Pemohon"
        disabled
      />
      <Input
        type="text"
        name="deskripsi"
        label="Deskripsi"
        placeholder="Masukkan Deskripsi"
      />
      <Input
        type="select"
        name="jenis"
        label="Jenis Reimburse"
        placeholder="Masukkan Jenis Reimburse"
        data={[
          {
            value: ReimburseTypeEnum.itinerary,
            label: 'Perjalanan',
          },
          {
            value: ReimburseTypeEnum.stationery,
            label: 'ATK (Alat Tulis Kantor)',
          },
        ]}
        onAfterChange={() => {
          setValue('perjalanan_id', null);
        }}
        disabled={!!data}
      />
      <SelectItinery />
    </Flex>
  );
}
