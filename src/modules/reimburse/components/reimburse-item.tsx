import { Flex, Text, Title } from '@mantine/core';
import {
  ReimburseLiteModel,
  ReimburseStatusEnum,
} from 'api-hooks/reimburse/model';
import { string2money } from 'common/helpers/string';
import ListItem from 'components/common/list-item/list-item';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';

import ReimburseStatusBadge from './reimburse-status-badge';

export default function ReimburseItem(props: ReimburseLiteModel) {
  const { prefetch, push } = useRouter();
  const route = `${NavigationRoutes.reimburses}/${props.id}`;
  React.useEffect(() => {
    prefetch(route);
  }, [prefetch, route]);

  const requester = props.pemohon;

  const responden = props.pic;

  const respondenLabel = [responden?.nip, responden?.nama]
    .filter(Boolean)
    .join(' - ');

  const requesterLabel = [requester?.nip, requester?.nama]
    .filter(Boolean)
    .join(' - ');

  const total = 0;

  const rejectedComponent = props.deskripsiPenolakan && (
    <Text fz={11}>Alasan Ditolak: {props.deskripsiPenolakan}</Text>
  );

  const timeComponent = React.useMemo(() => {
    if (props.tanggalPenolakan) {
      return (
        <Text fz={11}>
          Tanggal Penolakan:{' '}
          {format(props.tanggalPenolakan, 'dd MMM yyy, HH:mm')}
        </Text>
      );
    }
    if (props.tanggalPelunasan) {
      return (
        <Text fz={11}>
          Tanggal Diterima:{' '}
          {format(props.tanggalPelunasan, 'dd MMM yyy, HH:mm')}
        </Text>
      );
    }
  }, [props.tanggalPelunasan, props.tanggalPenolakan]);

  const respondenComponent = React.useMemo(() => {
    if (!respondenLabel) return null;
    switch (props.status) {
      case ReimburseStatusEnum.finished:
        return <Text fz={11}>Diterima oleh: {respondenLabel}</Text>;
      case ReimburseStatusEnum.rejected:
        return <Text fz={11}>Ditolak oleh: {respondenLabel}</Text>;
      case ReimburseStatusEnum.pending:
      default:
        return null;
    }
  }, [props.status, respondenLabel]);

  const finishedAmountComponent = props.totalPelunasan && (
    <Text fz={11}>
      Total Pelunasan: Rp. {string2money(props.totalPelunasan)}
    </Text>
  );
  return (
    <ListItem
      onClick={() => push(route)}
      style={{
        position: 'relative',
      }}
    >
      <Flex direction="column" gap={16} w="100%">
        <Flex direction="column" align="end" pos="absolute" top={16} right={16}>
          <ReimburseStatusBadge status={props.status} />
          <Text fz={11}>Total: {string2money(total)}</Text>
        </Flex>
        <Title order={6}>{requesterLabel}</Title>
        <Text fz={11}>Jenis Reimburse: {props.jenis}</Text>
        <Text fz={11} pos="absolute" right={16} bottom={16}>
          {format(props.tanggalDibuat, 'dd MMM yyy, HH:mm')}
        </Text>
        {rejectedComponent}
        {respondenComponent}
        {finishedAmountComponent}
        {timeComponent}
      </Flex>
    </ListItem>
  );
}
