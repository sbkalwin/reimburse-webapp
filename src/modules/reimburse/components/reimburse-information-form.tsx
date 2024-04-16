import { Flex, Text } from '@mantine/core';
import Input from 'components/input';
import { format } from 'date-fns';
import { itinenaries } from 'modules/itinenary/components/itinenary-form-type';
import { employees } from 'modules/user/components/user-form-type';
import { useFormContext, useWatch } from 'react-hook-form';

import { ReimburseFormType, ReimburseTypeEnum } from './reimburse-form-type';
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
        <Input
          type="select"
          name="perjalanan_id"
          label="Perjalanan"
          placeholder="Masukkan Perjalanan"
          data={itinenaries.map((item) => {
            return {
              label: [
                item.nama,
                format(item.tanggal_mulai, 'dd MMM yyyy'),
                format(item.tanggal_selesai, 'dd MMM yyyy'),
              ].join(' - '),
              value: item.id,
            };
          })}
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
      <Input
        type="select"
        name="nip_pemohon"
        data={employees.map((employee) => {
          return {
            value: employee.nip,
            label: [employee.nip, employee.nama].join(' - '),
          };
        })}
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
