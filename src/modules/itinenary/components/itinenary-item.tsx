import { Flex, Text, Title } from '@mantine/core';
import { ItinenaryLiteModel } from 'api-hooks/itinenary/model';
import ListItem from 'components/common/list-item/list-item';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';

export default function ItinenaryItem(props: ItinenaryLiteModel) {
  const { prefetch, push } = useRouter();
  const route = `${NavigationRoutes.itineraries}/${props.id}`;
  const dateFormating = (date: Date) => format(date, 'dd MMM yyyy');
  const label = [
    dateFormating(props.tanggalMulai),
    dateFormating(props.tanggalSelesai),
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
