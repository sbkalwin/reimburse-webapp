import { Flex, Text, Title } from '@mantine/core';
import ListItem from 'components/common/list-item/list-item';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';

import { ItinenaryModel } from './itinenary-form-type';

export default function ItinenaryItem(props: ItinenaryModel) {
  const { prefetch, push } = useRouter();
  const route = `${NavigationRoutes.itineraries}/${props.id}`;
  const dateFormating = (date: Date) => format(date, 'dd MMM yyyy');
  const label = [
    dateFormating(props.tanggal_mulai),
    dateFormating(props.tanggal_selesai),
  ].join(' - ');

  React.useEffect(() => {
    prefetch(route);
  }, [prefetch, route]);

  return (
    <ListItem onClick={() => push(route)}>
      <Flex direction="column">
        <Title order={6}>{props.nama}</Title>
        <Text fz={11}>{label}</Text>
      </Flex>
    </ListItem>
  );
}
