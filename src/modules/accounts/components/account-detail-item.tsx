import { Flex, Text, Title } from '@mantine/core';
import { formatDateTime, string2money } from 'common/helpers/string';
import ListItem from 'components/common/list-item/list-item';

import AccountDetailTypeBadge from './account-detail-type-badge';
import { AccountDetailModel } from './account-form-type';

interface AccountDetailItemProps {
  data: AccountDetailModel;
  onClick: () => void;
}

export default function AccountDetailItem(props: AccountDetailItemProps) {
  const { data, onClick } = props;
  return (
    <ListItem onClick={onClick}>
      <Flex direction="column" gap={4}>
        <Title order={6}>{data.id}</Title>
        <Text fz={11}>Rp {string2money(data.total)}</Text>
        <Text fz={11}>
          Tanggal dibuat: {formatDateTime(props.data.tanggal_dibuat)}
        </Text>
        <Text fz={11}>Jenis: {data.jenis}</Text>
        <AccountDetailTypeBadge jenis={data.jenis} />
      </Flex>
    </ListItem>
  );
}
