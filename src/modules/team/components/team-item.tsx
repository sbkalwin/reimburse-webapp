import { Flex, Text, Title } from '@mantine/core';
import { TeamModel } from 'api-hooks/team/model';
import ListItem from 'components/common/list-item/list-item';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';

export default function TeamItem(props: TeamModel) {
  const { prefetch, push } = useRouter();
  const route = `${NavigationRoutes.teams}/${props.id}`;

  const leader = props.Pegawai?.find((pegawai) => {
    return pegawai.nip === props.nipLeader;
  });

  const leaderComponent = leader && (
    <Text fz={11}>
      Leader: {leader.nip} - {leader.nama}
    </Text>
  );

  React.useEffect(() => {
    prefetch(route);
  }, [prefetch, route]);

  return (
    <ListItem onClick={() => push(route)}>
      <Flex direction="column">
        <Title order={6}>{props.nama}</Title>
        {leaderComponent}
        <Text fz={11}>{format(props.tanggalDibuat, 'dd MMM yyyy')}</Text>
      </Flex>
    </ListItem>
  );
}
