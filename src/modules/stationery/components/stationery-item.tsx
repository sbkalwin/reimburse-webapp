import { Flex, Text, Title } from '@mantine/core';
import { formatDateTime, string2money } from 'common/helpers/string';
import ListItem from 'components/common/list-item/list-item';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';
import React from 'react';

import { StationeryModel } from './stationery-form-type';

export default function StationeryItem(props: StationeryModel) {
  const route = `${NavigationRoutes.stationaries}/${props.id}`;
  const { prefetch, push } = useRouter();

  React.useEffect(() => {
    prefetch(route);
  }, [prefetch, route]);

  return (
    <ListItem onClick={() => push(route)}>
      <Flex justify="space-between" w="100%">
        <Flex direction="column" gap={4}>
          <Title order={6}>{props.nama}</Title>
          <Text fz={12}>{props.deskripsi}</Text>
          <Text fz={11}>{formatDateTime(props.tanggal_diperbarui)}</Text>
        </Flex>
        <Text miw={120} ta="right" fz={11}>
          Rp {string2money(props.harga)}
        </Text>
      </Flex>
    </ListItem>
  );
}
