import {
  Flex,
  SegmentedControl,
  SimpleGrid,
  Space,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { MagnifyingGlass } from '@phosphor-icons/react';
import {
  ReimburseLiteModel,
  ReimburseTypeEnum,
} from 'api-hooks/reimburse/model';
import { useGetReimburses } from 'api-hooks/reimburse/query';
import colors from 'common/styles/colors';
import LoaderView from 'components/loader-view';
import useAuth from 'hooks/use-auth';
import ExportButton from 'modules/common/export-button';
import { useRouter } from 'next/router';
import React from 'react';

import ReimburseItem from './components/reimburse-item';

export default function ReimburseList() {
  const [segment, setSegment] = React.useState('all');
  const { isAdmin, user } = useAuth();
  const { query } = useRouter();
  const userId = query.id as string | undefined;
  const nip = user?.nip;
  const [tanggalMulai, setTanggalMulai] = React.useState<Date | null>(null);
  const [tanggalSelesai, setTanggalSelesai] = React.useState<Date | null>(null);

  const [search, setSearch] = React.useState('');

  const onSearch = (reimburse: ReimburseLiteModel) => {
    const label = [reimburse.id, reimburse.pemohon.nip, reimburse.pemohon.nama]
      .join('')
      .toLowerCase();

    return label.includes(search.toLowerCase());
  };

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
      nip_pemohon: userId,
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
            value={search}
            placeholder="Cari Karyawan"
            my={16}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
            }}
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
            clearable
          />
          <DatePickerInput
            label="Tanggal Selesai"
            placeholder="Cari Tanggal Selesai"
            dropdownType="modal"
            modalProps={{
              centered: true,
            }}
            onChange={setTanggalSelesai}
            clearable
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
          const reimburse = data
            .filter(onSearchUser)
            .filter(onSearchStatus)
            .filter(onSearch);
          const dataExport = reimburse.map((item) => {
            const pemohon = item.pemohon;
            const pic = item.pic;
            const perjalanan = item.perjalanan;
            return {
              'Tanggal Dibuat': item.tanggalDibuat,
              'Tanggal Diubah': item.tanggalDiubah,
              'ID Reimburse': item.id,
              Status: item.status,
              'Jenis Reimburse':
                item.jenis === ReimburseTypeEnum.itinerary
                  ? 'Perjalanan'
                  : 'Peralatan Kantor',
              'ID Perjalanan': perjalanan?.id,
              Deskripsi: item.deskripsi,
              Pemohon: [pemohon.nip, pemohon.nama].join(' - '),
              'Total Pengajuan': item.detailPengembalian.reduce(
                (prev, item) => {
                  return prev + item.subtotal;
                },
                0,
              ),
              PIC: [pic?.nip, pic?.nama].join(' - '),
              'Tanggal Penolakan': item.tanggalPenolakan,
              'Deskripsi Penolakan': item.deskripsiPenolakan,
              'Tanggal Pelunasan': item.tanggalPelunasan,
              'Total Pelunasan': item.totalPelunasan,
              'ID Kas': item.KasDetail?.kasId,
              'ID Kas Detail': item.KasDetail?.id,
            };
          });
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
              <Space h={60} />
              <ExportButton
                data={dataExport}
                filename={[
                  'reimburse',
                  userId,
                  tanggalMulai?.toISOString().substring(0, 10),
                  tanggalSelesai?.toISOString().substring(0, 10),
                ]
                  .filter(Boolean)
                  .join('-')}
              />
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
