import { yupResolver } from '@hookform/resolvers/yup';
import { Flex } from '@mantine/core';
import { TeamModel } from 'api-hooks/team/model';
import notification from 'common/helpers/notifications';
import Form from 'components/form';
import Input from 'components/input';
import { FormLayout } from 'modules/common/layout';
import React from 'react';
import { useForm } from 'react-hook-form';

import { TeamFormType, TeamSchema } from './team-form-type';

interface TeamFormProps {
  team?: TeamModel;
  onSubmit: (values: TeamFormType) => Promise<void>;
}

export default function TeamForm(props: TeamFormProps) {
  const defaultValues = React.useMemo<TeamFormType>(() => {
    return {
      nama: props.team?.nama ?? '',
      nip_leader: props?.team?.nipLeader ?? null,
      data: props.team,
    };
  }, [props.team]);

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(TeamSchema()),
  });

  const onSubmit = React.useCallback(
    async (values: TeamFormType) => {
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
            data={[]}
          />
        </Flex>
      </FormLayout>
    </Form>
  );
}
