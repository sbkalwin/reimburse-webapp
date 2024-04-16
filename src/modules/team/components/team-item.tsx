import { Flex, Text, Title } from '@mantine/core';
import ListItem from 'components/common/list-item/list-item';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';

import { TeamModel } from './team-form-type';

export default function TeamItem(props: TeamModel) {
  const { prefetch, push } = useRouter();
  const route = `${NavigationRoutes.teams}/${props.id}`;

  React.useEffect(() => {
    prefetch(route);
  }, [prefetch, route]);

  return (
    <ListItem onClick={() => push(route)}>
      <Flex direction="column">
        <Title order={6}>{props.nama}</Title>
        <Text fz={11}>Leader: {props.nama_leader}</Text>
        <Text fz={11}>{format(props.tanggal_dibuat, 'dd MMM yyyy')}</Text>
      </Flex>
    </ListItem>
  );
}
