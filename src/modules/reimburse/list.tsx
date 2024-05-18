import {
  Flex,
  SegmentedControl,
  SimpleGrid,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { ReimburseLiteModel } from 'api-hooks/reimburse/model';
import { useGetReimburses } from 'api-hooks/reimburse/query';
import colors from 'common/styles/colors';
import LoaderView from 'components/loader-view';
import useAuth from 'hooks/use-auth';
import { useRouter } from 'next/router';
import React from 'react';

import ReimburseItem from './components/reimburse-item';

export default function ReimburseList() {
  const [segment, setSegment] = React.useState('all');
  const { isAdmin, user } = useAuth();
  const { query } = useRouter();
  const userId = query.id;
  const nip = user?.nip;
  const [tanggalMulai, setTanggalMulai] = React.useState<Date | null>(null);
  const [tanggalSelesai, setTanggalSelesai] = React.useState<Date | null>(null);

  const onSearchUser = (reimburse: ReimburseLiteModel) => {
    if (userId) {
      return reimburse.nipPemohon === userId;
    }
    return isAdmin || reimburse.nipPemohon === nip;
  };

  const onSearchStatus = (reimburse: ReimburseLiteModel) => {
    return segment === 'all' || reimburse.status === segment;
  };

  const queryGetReimburses = useGetReimburses({
    params: {
      tanggal_mulai: tanggalMulai || undefined,
      tanggal_selesai: tanggalSelesai || undefined,
    },
  });

  return (
    <Flex direction="column">
      <Flex
        direction="column"
        p={userId ? undefined : 16}
        bg={colors.mainWhite}
        style={{ zIndex: 10 }}
        {...(userId
          ? {}
          : {
              pos: 'sticky',
              top: 0,
            })}
      >
        {!userId && (
          <TextInput
            placeholder="Cari Karyawan"
            my={16}
            rightSection={<MagnifyingGlass size={16} />}
          />
        )}
        <SimpleGrid cols={2} mb={16}>
          <DatePickerInput
            label="Tanggal Dimulai"
            placeholder="Cari Tanggal Dimulai"
            dropdownType="modal"
            modalProps={{
              centered: true,
            }}
            onChange={setTanggalMulai}
          />
          <DatePickerInput
            label="Tanggal Selesai"
            placeholder="Cari Tanggal Selesai"
            dropdownType="modal"
            modalProps={{
              centered: true,
            }}
            onChange={setTanggalSelesai}
          />
        </SimpleGrid>
        <SegmentedControl
          value={segment}
          onChange={setSegment}
          data={[
            {
              value: 'all',
              label: 'Semua',
            },
            {
              value: 'pending',
              label: 'Pending',
            },
            {
              value: 'rejected',
              label: 'Ditolak',
            },
            {
              value: 'finished',
              label: 'Diterima',
            },
          ]}
        />
      </Flex>
      <LoaderView query={queryGetReimburses} isCompact>
        {(data) => {
          const reimburse = data.filter(onSearchUser).filter(onSearchStatus);
          return (
            <>
              {reimburse.length === 0 && (
                <Text mt={16} mx={16} fw={600} c={colors.foregroundTertiary}>
                  No Result Found
                </Text>
              )}
              {reimburse.map((reimburse) => {
                return <ReimburseItem key={reimburse.id} {...reimburse} />;
              })}
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
