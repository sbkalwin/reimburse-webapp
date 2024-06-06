import {
  Button,
  Flex,
  Modal,
  SimpleGrid,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { MagnifyingGlass, Plus } from '@phosphor-icons/react';
import { AccountDetailLiteModel, AccountModel } from 'api-hooks/account/model';
import {
  useCreateAccountDetail,
  useUpdateAccountDetail,
} from 'api-hooks/account/mutation';
import {
  useGetAccountDetail,
  useGetAccountDetails,
} from 'api-hooks/account/query';
import notification from 'common/helpers/notifications';
import { queryClient } from 'common/helpers/query-client';
import colors from 'common/styles/colors';
import LoaderView from 'components/loader-view';
import AccountDetailForm from 'modules/accounts/components/account-detail-form';
import AccountDetailItem from 'modules/accounts/components/account-detail-item';
import ExportButton from 'modules/common/export-button';
import React from 'react';

export default function AccountDetailList(props: { account: AccountModel }) {
  const [accountDetail, setAccountDetail] = React.useState<
    AccountDetailLiteModel | undefined
  >(undefined);
  const [search, setSearch] = React.useState('');
  const [tanggalMulai, setTanggalMulai] = React.useState<Date | null>(null);
  const [tanggalSelesai, setTanggalSelesai] = React.useState<Date | null>(null);
  const [isOpenForm, { close, open }] = useDisclosure(false);
  const queryGetAccountDetails = useGetAccountDetails({
    params: {
      kas_id: props.account.id,
      tanggal_mulai: tanggalMulai || undefined,
      tanggal_selesai: tanggalSelesai || undefined,
    },
  });

  const queryGetAccountDetail = useGetAccountDetail({
    input: {
      id: accountDetail?.id,
    },
  });

  const { mutateAsync: createDetailMutate } = useCreateAccountDetail();
  const { mutateAsync: updateDetailMutate } = useUpdateAccountDetail();
  const onSearch = (accountDetail: AccountDetailLiteModel) => {
    const label = [accountDetail.id].filter(Boolean).join('').toLowerCase();

    return label.includes(search.toLowerCase());
  };

  return (
    <>
      <Flex direction="column">
        <Flex direction="column">
          <Flex align="center" justify="space-between" my={16}>
            <Title order={5}>Daftar Transaksi</Title>
            <Button
              variant="outline"
              onClick={() => {
                setAccountDetail(undefined);
                open();
              }}
              rightSection={<Plus size={16} />}
            >
              Tambah Transaksi
            </Button>
          </Flex>
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari ID Transaksi"
            rightSection={<MagnifyingGlass size={16} />}
          />
          <SimpleGrid cols={2} my={16}>
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

        <LoaderView isCompact query={queryGetAccountDetails}>
          {(data) => {
            const accountDetails = data.filter(onSearch);
            return (
              <>
                {accountDetails.length === 0 && (
                  <Text mt={16} mx={16} fw={600} c={colors.foregroundTertiary}>
                    No Result Found
                  </Text>
                )}
                {accountDetails.map((accountDetail) => {
                  return (
                    <AccountDetailItem
                      key={accountDetail.id}
                      data={accountDetail}
                      onClick={() => {
                        setAccountDetail(accountDetail);
                        open();
                      }}
                    />
                  );
                })}
                <Space h={60} />

                <ExportButton
                  data={accountDetails}
                  filename={[
                    'Laporan Kas',
                    props.account.id,
                    props.account.nama,
                    search,
                    tanggalMulai?.toISOString()?.substring(0, 10),
                    tanggalSelesai?.toISOString()?.substring(0, 10),
                  ]
                    .filter(Boolean)
                    .join(' - ')}
                />
              </>
            );
          }}
        </LoaderView>
      </Flex>
      <Modal
        onClose={close}
        title={
          <Title order={6}>
            {accountDetail ? 'Edit Transaksi' : 'Tambah Transaksi'}
          </Title>
        }
        centered
        opened={isOpenForm}
        withinPortal
      >
        {accountDetail ? (
          <LoaderView query={queryGetAccountDetail} isCompact>
            {(data) => {
              return (
                <AccountDetailForm
                  account={props.account}
                  onClose={close}
                  accountDetail={data}
                  onSubmit={async (values) => {
                    const result = await updateDetailMutate({
                      id: data.id,
                      data: values,
                    });
                    queryClient.refetchQueries();
                    notification.success({ message: result.message });
                  }}
                />
              );
            }}
          </LoaderView>
        ) : (
          <AccountDetailForm
            account={props.account}
            onClose={close}
            onSubmit={async (values) => {
              const result = await createDetailMutate(values);
              queryClient.refetchQueries();
              notification.success({ message: result.message });
            }}
          />
        )}
      </Modal>
    </>
  );
}
