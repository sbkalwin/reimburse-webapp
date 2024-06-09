import { ComboboxItem } from '@mantine/core';
import { getAccountsInput, AccountLiteModel } from 'api-hooks/account/model';
import { useGetAccounts } from 'api-hooks/account/query';
import Input from 'components/input';
import { SelectFieldProps } from 'components/input/select-input-field';

export type AccountOption = ComboboxItem & {
  item: AccountLiteModel;
};

export interface AccountSelectProps
  extends Omit<SelectFieldProps, 'type' | 'data' | 'onAfterChange'> {
  filterQuery?: getAccountsInput;
  onAfterChange?: (value: string | null, option: AccountOption) => void;
}

export function accountTransformer(account: AccountLiteModel): AccountOption {
  return {
    item: account,
    value: account.id,
    label: [account.id, account.nama].join(' - '),
  };
}

export default function AccountSelect(props: AccountSelectProps) {
  const { filterQuery, onAfterChange, ...rest } = props;
  const queryGetAccounts = useGetAccounts({ params: filterQuery });
  const options = (queryGetAccounts.data?.data || []).map((account) => {
    return accountTransformer(account);
  });

  return (
    <Input
      {...rest}
      type="select"
      data={options}
      disabled={queryGetAccounts.isLoading || undefined}
      onAfterChange={onAfterChange as any}
    />
  );
}
