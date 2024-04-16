import { Flex, Text, Title } from '@mantine/core';
import { formatDateTime } from 'common/helpers/string';
import ListItem from 'components/common/list-item/list-item';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useRouter } from 'next/router';
import React from 'react';

import { AccountModel } from './account-form-type';

export default function AccountItem(props: AccountModel) {
  const route = `${NavigationRoutes.accounts}/${props.id}`;
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
          <Text fz={11}>{formatDateTime(props.tanggal_diubah)}</Text>
        </Flex>
      </Flex>
    </ListItem>
  );
}
