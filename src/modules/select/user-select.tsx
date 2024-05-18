import { ComboboxItem } from '@mantine/core';
import { EmployeeLiteModel, getEmployeesInput } from 'api-hooks/employee/model';
import { useGetEmployees } from 'api-hooks/employee/query';
import Input from 'components/input';
import { SelectFieldProps } from 'components/input/select-input-field';

export type UserOption = ComboboxItem & {
  item: EmployeeLiteModel;
};

export interface UserSelectProps
  extends Omit<SelectFieldProps, 'type' | 'data' | 'onAfterChange'> {
  filterQuery?: getEmployeesInput;
  onAfterChange?: (value: string | null, option: UserOption) => void;
}

export function userTransformer(employee: EmployeeLiteModel): UserOption {
  return {
    item: employee,
    value: employee.nip,
    label: [employee.nip, employee.nama].join(' - '),
  };
}

export default function UserSelect(props: UserSelectProps) {
  const { filterQuery, onAfterChange, ...rest } = props;
  const queryGetUsers = useGetEmployees({ params: filterQuery });
  const options = (queryGetUsers.data?.data || []).map((employee) => {
    return userTransformer(employee);
  });

  return (
    <Input
      {...rest}
      type="select"
      data={options}
      disabled={queryGetUsers.isLoading || rest.disabled}
      onAfterChange={onAfterChange as any}
    />
  );
}
