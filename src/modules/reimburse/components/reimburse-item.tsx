import { Flex, Text, Title } from '@mantine/core';
import { string2money } from 'common/helpers/string';
import ListItem from 'components/common/list-item/list-item';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { format } from 'date-fns';
import { employees } from 'modules/user/components/user-form-type';
import { useRouter } from 'next/router';
import React from 'react';

import { ReimburseModel, ReimburseStatusEnum } from './reimburse-form-type';
import ReimburseStatusBadge from './reimburse-status-badge';

export default function ReimburseItem(props: ReimburseModel) {
  const { prefetch, push } = useRouter();
  const route = `${NavigationRoutes.reimburses}/${props.id}`;
  React.useEffect(() => {
    prefetch(route);
  }, [prefetch, route]);

  const requester = employees.find(
    (employee) => employee.nip === props.nip_pemohon,
  );

  const responden = employees.find(
    (employee) => employee.nip === props.nip_pic,
  );

  const respondenLabel = [responden?.nip, responden?.nama]
    .filter(Boolean)
    .join(' - ');

  const requesterLabel = [requester?.nip, requester?.nama]
    .filter(Boolean)
    .join(' - ');

  const total = props.details.reduce(
    (prev, detail) => prev + detail.subtotal,
    0,
  );

  const rejectedComponent = props.deskripsi_penolakan && (
    <Text fz={11}>Alasan Ditolak: {props.deskripsi_penolakan}</Text>
  );

  const timeComponent = React.useMemo(() => {
    if (props.tanggal_penolakan) {
      return (
        <Text fz={11}>
          Tanggal Penolakan:{' '}
          {format(props.tanggal_penolakan, 'dd MMM yyy, HH:mm')}
        </Text>
      );
    }
    if (props.tanggal_pelunasan) {
      return (
        <Text fz={11}>
          Tanggal Diterima:{' '}
          {format(props.tanggal_pelunasan, 'dd MMM yyy, HH:mm')}
        </Text>
      );
    }
  }, [props.tanggal_pelunasan, props.tanggal_penolakan]);

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

  const finishedAmountComponent = props.total_pelunasan && (
    <Text fz={11}>
      Total Pelunasan: Rp. {string2money(props.total_pelunasan)}
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
          {format(props.tanggal_dibuat, 'dd MMM yyy, HH:mm')}
        </Text>
        {rejectedComponent}
        {respondenComponent}
        {finishedAmountComponent}
        {timeComponent}
      </Flex>
    </ListItem>
  );
}
