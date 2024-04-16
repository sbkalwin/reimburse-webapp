import { Button, Flex, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from '@phosphor-icons/react';
import AccountDetailForm from 'modules/accounts/components/account-detail-form';
import AccountDetailItem from 'modules/accounts/components/account-detail-item';
import {
  AccountDetailModel,
  AccountModel,
  accountDetails,
} from 'modules/accounts/components/account-form-type';
import React from 'react';

export default function AccountDetailList(props: { account: AccountModel }) {
  const [accountDetail, setAccountDetail] = React.useState<
    AccountDetailModel | undefined
  >(undefined);
  const [isOpenForm, { close, open }] = useDisclosure(false);

  return (
    <>
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
      >
        <AccountDetailForm
          account={props.account}
          onClose={close}
          accountDetail={accountDetail}
        />
      </Modal>
    </>
  );
}
