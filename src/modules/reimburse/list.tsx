import { Flex, SegmentedControl, Text, TextInput } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import useAuth from 'hooks/use-auth';
import { useRouter } from 'next/router';
import React from 'react';

import { reimburses } from './components/reimburse-form-type';
import ReimburseItem from './components/reimburse-item';

export default function ReimburseList() {
  const [segment, setSegment] = React.useState('all');
  const { isAdmin, user } = useAuth();
  const { query } = useRouter();
  const userId = query.id;
  const nip = user?.nip;

  const data = reimburses
    .filter((reimburse) => {
      if (userId) {
        return reimburse.nip_pemohon === userId;
      }
      return isAdmin || reimburse.nip_pemohon === nip;
    })
    .filter((reimburse) => segment === 'all' || reimburse.status === segment);

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
      {data.length === 0 && (
        <Text mt={16} mx={16} fw={600} c={colors.foregroundTertiary}>
          No Result Found
        </Text>
      )}
      {data.map((reimburse) => {
        return <ReimburseItem key={reimburse.id} {...reimburse} />;
      })}
    </Flex>
  );
}
