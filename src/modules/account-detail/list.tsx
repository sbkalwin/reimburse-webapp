import { Button, Flex, Modal, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from '@phosphor-icons/react';
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

  const { mutateAsync: createDetailMutate } = useCreateAccountDetail();
  const { mutateAsync: updateDetailMutate } = useUpdateAccountDetail();

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
        <LoaderView isCompact query={queryGetAccountDetails}>
          {(data) => {
            return (
              <>
                {data.length === 0 && (
                  <Text mt={16} mx={16} fw={600} c={colors.foregroundTertiary}>
                    No Result Found
                  </Text>
                )}
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
