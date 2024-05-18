import { Flex, Text, TextInput } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { StationeryLiteModel } from 'api-hooks/stationery/model';
import { useGetStationeries } from 'api-hooks/stationery/query';
import colors from 'common/styles/colors';
import LoaderView from 'components/loader-view';
import React from 'react';

import StationeryItem from './components/stationery-item';

export default function StationeryList() {
  const [search, setSearch] = React.useState('');
  const onSearch = React.useCallback(
    (stationery: StationeryLiteModel) => {
      const label = stationery.nama.toLowerCase();
      return label.includes(search.toLowerCase());
    },
    [search],
  );

  const queryGetStationeries = useGetStationeries();
  return (
    <Flex direction="column" w="100%">
      <Flex pos="sticky" bg="white" top={0} p={16} style={{ zIndex: 10 }}>
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari Nama Alat Tulis Kantor"
          rightSection={<MagnifyingGlass size={16} />}
          w="100%"
        />
      </Flex>
      <LoaderView query={queryGetStationeries}>
        {(data) => {
          const result = data.filter(onSearch);
          return (
            <>
              {result.length === 0 && (
                <Text mt={16} mx={16} fw={600} c={colors.foregroundTertiary}>
                  No Result Found
                </Text>
              )}
              {result.map((stationery) => {
                return <StationeryItem key={stationery.id} {...stationery} />;
              })}
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
