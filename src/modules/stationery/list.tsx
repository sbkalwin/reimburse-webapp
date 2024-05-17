import { Flex, TextInput } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { StationeryLiteModel } from 'api-hooks/stationery/model';
import { useGetStationeries } from 'api-hooks/stationery/query';
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
          return (
            <>
              {data.filter(onSearch).map((stationery) => {
                return <StationeryItem key={stationery.id} {...stationery} />;
              })}
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
