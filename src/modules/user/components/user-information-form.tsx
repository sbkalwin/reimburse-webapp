import { Flex } from '@mantine/core';
import { EmployeeRoleEnum, EmployeeStatusEnum } from 'api-hooks/auth/model';
import Input from 'components/input';
import TeamSelect from 'modules/select/team-select';
import { useFormContext } from 'react-hook-form';

import { EmployeeFormType } from './user-form-type';

export default function UserInformationForm() {
  const { getValues } = useFormContext<EmployeeFormType>();
  const isEdit = !!getValues('data');

  return (
    <Flex direction="column" gap={16}>
      {isEdit && (
        <Input
          type="text"
          name="nip"
          disabled={isEdit}
          label="Nomor Induk Pegawai"
        />
      )}
      <Input type="text" name="nama" label="Nama" placeholder="Masukkan Nama" />
      <Input
        type="select"
        name="peran"
        label="Peran"
        placeholder="Masukkan Peran"
        data={[EmployeeRoleEnum.admin, EmployeeRoleEnum.user]}
      />
      <TeamSelect name="team_id" label="Team" placeholder="Masukkan Team" />
      <Input
        type="select"
        name="status"
        label="Status Karyawan"
        placeholder="Masukkan Status Karyawan"
        data={[EmployeeStatusEnum.active, EmployeeStatusEnum.inactive]}
      />
      <Input
        type="text"
        name="nomor_rekening"
        label="Nomor Rekening"
        placeholder="Masukkan Nomor Rekening"
      />
      <Input
        type="password"
        name="kata_sandi"
        label="Kata Sandi"
        placeholder="Masukkan Kata Sandi"
      />
    </Flex>
  );
}
