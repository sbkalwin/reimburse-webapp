import { Flex } from '@mantine/core';
import Form from 'components/form';
import Input from 'components/input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import { FormLayout } from 'modules/common/layout';
import { employees } from 'modules/user/components/user-form-type';
import React from 'react';
import { useForm } from 'react-hook-form';

import { TeamFormType, TeamModel, TeamSchema } from './team-form-type';

interface TeamFormProps {
  team?: TeamModel;
}

export default function TeamForm(props: TeamFormProps) {
  const defaultValues = React.useMemo<TeamFormType>(() => {
    return {
      nama: props.team?.nama ?? '',
      nip_leader: props?.team?.nip_leader ?? null,
      data: props.team,
    };
  }, [props.team]);

  const resolver = useYupValidationResolver(TeamSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(async (values: TeamFormType) => {}, []);

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!props.team}>
      <FormLayout>
        <Flex direction="column" gap={16}>
          <Input
            type="text"
            placeholder="Masukkan Nama Tim"
            name="nama"
            label="Nama Tim"
          />
          <Input
            searchable
            type="select"
            placeholder="Masukkan Leader Tim"
            name="nip_leader"
            label="Leader Tim"
            clearable
            data={employees.map((employee) => {
              return {
                value: employee.nip,
                label: [employee.nip, employee.nama].join(' - '),
              };
            })}
          />
        </Flex>
      </FormLayout>
    </Form>
  );
}
