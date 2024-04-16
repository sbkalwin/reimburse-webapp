import { Flex, TextInput } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import React from 'react';

import {
  StationeryModel,
  stationeries,
} from './components/stationery-form-type';
import StationeryItem from './components/stationery-item';

export default function StationeryList() {
  const [search, setSearch] = React.useState('');
  const onSearch = React.useCallback(
    (stationery: StationeryModel) => {
      const label = stationery.nama.toLowerCase();
      return label.includes(search.toLowerCase());
    },
    [search],
  );
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
      {stationeries.filter(onSearch).map((stationery) => {
        return <StationeryItem key={stationery.id} {...stationery} />;
      })}
    </Flex>
  );
}
