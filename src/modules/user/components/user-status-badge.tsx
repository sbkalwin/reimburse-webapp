import { Badge } from '@mantine/core';
import React from 'react';

import { EmployeeStatusEnum } from './user-form-type';

type BadgeProps = React.ComponentProps<typeof Badge<'div'>>;

interface UserStatusBadgeProps extends BadgeProps {
  status: EmployeeStatusEnum;
}

export default function UserStatusBadge(props: UserStatusBadgeProps) {
  const { status, ...rest } = props;
  const bonusProps = React.useMemo<BadgeProps>(() => {
    switch (status) {
      case EmployeeStatusEnum.active:
        return {
          children: 'Active',
          color: 'green',
        };
      case EmployeeStatusEnum.inactive:
        return {
          children: 'Inactive',
          color: 'red',
        };
      default:
        return {
          children: 'Invalid Status',
          color: 'gray',
        };
    }
  }, [status]);

  return <Badge {...rest} {...bonusProps} />;
}
