import { SegmentedControl } from '@mantine/core';
import Form from 'components/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { FormLayout } from 'modules/common/layout';
import ReimburseList from 'pages/reimburses';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  EmployeeFormSchema,
  EmployeeFormType,
  EmployeeModel,
  EmployeeRoleEnum,
  EmployeeStatusEnum,
} from './user-form-type';
import UserInformationForm from './user-information-form';

interface UserFormProps {
  user?: EmployeeModel;
}

export default function UserForm(props: UserFormProps) {
  const { user } = props;
  const [segment, setSegment] = React.useState('Informasi');
  const defaultValues = React.useMemo<EmployeeFormType>(() => {
    return {
      team_id: user?.team_id ?? '',
      kata_sandi: user?.kata_sandi ?? '',
      nama: user?.nama ?? '',
      nip: user?.nip ?? '',
      nomor_rekening: user?.nomor_rekening ?? '',
      peran: user?.peran ?? EmployeeRoleEnum.user,
      status: user?.status ?? EmployeeStatusEnum.active,
      data: user,
    };
  }, [user]);

  const resolver = useYupValidationResolver(EmployeeFormSchema());

  const isEdit = !!props.user;

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: EmployeeFormType) => {},
    [],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!props.user}>
      <FormLayout isEditable>
        {isEdit && (
          <SegmentedControl
            w="100%"
            mb={16}
            value={segment}
            onChange={setSegment}
            data={['Informasi', 'Riwayat Reimburse']}
          />
        )}
        {segment === 'Informasi' && <UserInformationForm />}
        {segment === 'Riwayat Reimburse' && <ReimburseList />}
      </FormLayout>
    </Form>
  );
}
