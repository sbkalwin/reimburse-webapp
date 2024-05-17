import { Button, Center, Flex, Loader, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from '@phosphor-icons/react';
import { AccountDetailLiteModel, AccountModel } from 'api-hooks/account/model';
import {
  useGetAccountDetail,
  useGetAccountDetails,
} from 'api-hooks/account/query';
import LoaderView from 'components/loader-view';
import AccountDetailForm from 'modules/accounts/components/account-detail-form';
import AccountDetailItem from 'modules/accounts/components/account-detail-item';
import React from 'react';

export default function AccountDetailList(props: { account: AccountModel }) {
  const [accountDetail, setAccountDetail] = React.useState<
    AccountDetailLiteModel | undefined
  >(undefined);
  const [isOpenForm, { close, open }] = useDisclosure(false);
  const queryGetAccountDetails = useGetAccountDetails({
    params: { kas_id: props.account.id },
  });

  const queryGetAccountDetail = useGetAccountDetail({
    input: { id: accountDetail?.id },
  });

  const loadingComponent = (
    <Center>
      <Loader size={24} />
    </Center>
  );
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
        <LoaderView
          loadingComponent={loadingComponent}
          query={queryGetAccountDetails}
        >
          {(data) => {
            return (
              <>
                {data.map((accountDetail) => {
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
          <LoaderView
            query={queryGetAccountDetail}
            loadingComponent={loadingComponent}
          >
            {(data) => {
              return (
                <AccountDetailForm
                  account={props.account}
                  onClose={close}
                  accountDetail={data}
                />
              );
            }}
          </LoaderView>
        ) : (
          <AccountDetailForm account={props.account} onClose={close} />
        )}
      </Modal>
    </>
  );
}
