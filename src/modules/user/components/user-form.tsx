import { yupResolver } from '@hookform/resolvers/yup';
import { SegmentedControl } from '@mantine/core';
import { EmployeeRoleEnum, EmployeeStatusEnum } from 'api-hooks/auth/model';
import { EmployeeModel } from 'api-hooks/employee/model';
import notification from 'common/helpers/notifications';
import Form from 'components/form';
import { FormLayout } from 'modules/common/layout';
import ReimburseList from 'pages/reimburses';
import React from 'react';
import { useForm } from 'react-hook-form';

import { EmployeeFormSchema, EmployeeFormType } from './user-form-type';
import UserInformationForm from './user-information-form';

interface UserFormProps {
  user?: EmployeeModel;
  onSubmit: (values: EmployeeFormType) => Promise<void>;
}

export default function UserForm(props: UserFormProps) {
  const { user } = props;
  const [segment, setSegment] = React.useState('Informasi');
  const defaultValues = React.useMemo<EmployeeFormType>(() => {
    return {
      team_id: user?.team?.id ?? '',
      kata_sandi: '',
      nama: user?.nama ?? '',
      nip: user?.nip ?? '',
      nomor_rekening: user?.nomorRekening ?? '',
      peran: user?.peran ?? EmployeeRoleEnum.user,
      status: user?.status ?? EmployeeStatusEnum.active,
      data: user,
    };
  }, [user]);

  const isEdit = !!props.user;

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(EmployeeFormSchema()),
  });

  const onSubmit = React.useCallback(
    async (values: EmployeeFormType) => {
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
