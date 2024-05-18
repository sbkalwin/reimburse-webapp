import { Flex, SimpleGrid, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { ItinenaryLiteModel } from 'api-hooks/itinenary/model';
import { useGetItinenaries } from 'api-hooks/itinenary/query';
import colors from 'common/styles/colors';
import LoaderView from 'components/loader-view';
import React from 'react';

import ItinenaryItem from './components/itinenary-item';

export default function ItinenaryList() {
  const [search, setSearch] = React.useState('');
  const onSearch = React.useCallback(
    (itinenary: ItinenaryLiteModel) => {
      const label = itinenary.nama.toLowerCase();
      return label.includes(search.toLowerCase());
    },
    [search],
  );

  const [tanggalMulai, setTanggalMulai] = React.useState<Date | null>(null);

  const [tanggalSelesai, setTanggalSelesai] = React.useState<Date | null>(null);
  const queryGetItinenaries = useGetItinenaries({
    params: {
      tanggal_mulai: tanggalMulai || undefined,
      tanggal_selesai: tanggalSelesai || undefined,
    },
  });
  return (
    <Flex direction="column">
      <Flex
        direction="column"
        p={16}
        pos="sticky"
        top={0}
        style={{
          zIndex: 10,
        }}
        bg="white"
        gap={16}
      >
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama perjalanan"
          rightSection={<MagnifyingGlass size={16} />}
          w="100%"
        />
        <SimpleGrid cols={2}>
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
      </Flex>
      <LoaderView query={queryGetItinenaries}>
        {(data) => {
          const result = data.filter(onSearch);
          return (
            <>
              {result.length === 0 && (
                <Text mt={16} mx={16} fw={600} c={colors.foregroundTertiary}>
                  No Result Found
                </Text>
              )}
              {result.map((itinenary) => {
                return <ItinenaryItem key={itinenary.id} {...itinenary} />;
              })}
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
