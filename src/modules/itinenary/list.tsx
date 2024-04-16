import { Flex, SimpleGrid, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { MagnifyingGlass } from '@phosphor-icons/react';
import React from 'react';

import { ItinenaryModel, itinenaries } from './components/itinenary-form-type';
import ItinenaryItem from './components/itinenary-item';

export default function ItinenaryList() {
  const [search, setSearch] = React.useState('');
  const onSearch = React.useCallback(
    (itinenary: ItinenaryModel) => {
      const label = itinenary.nama.toLowerCase();
      return label.includes(search.toLowerCase());
    },
    [search],
  );
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
          />
          <DatePickerInput
            label="Tanggal Selesai"
            placeholder="Cari Tanggal Selesai"
            dropdownType="modal"
            modalProps={{
              centered: true,
            }}
          />
        </SimpleGrid>
      </Flex>
      {itinenaries.filter(onSearch).map((itinenary) => {
        return <ItinenaryItem key={itinenary.id} {...itinenary} />;
      })}
    </Flex>
  );
}
