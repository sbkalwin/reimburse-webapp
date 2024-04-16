import { Badge } from '@mantine/core';
import React from 'react';

import { EmployeeRoleEnum } from './user-form-type';

type BadgeProps = React.ComponentProps<typeof Badge<'div'>>;

interface UserRoleBadgeProps extends BadgeProps {
  role: EmployeeRoleEnum;
}

export default function UserRoleBadge(props: UserRoleBadgeProps) {
  const { role, ...rest } = props;
  const bonusProps = React.useMemo<BadgeProps>(() => {
    switch (role) {
      case EmployeeRoleEnum.admin:
        return {
          children: 'Admin',
          color: 'blue',
        };
      case EmployeeRoleEnum.user:
        return {
          children: 'User',
          color: 'cyan',
        };
      default:
        return {
          children: 'Invalid Status',
          color: 'gray',
        };
    }
  }, [role]);

  return <Badge {...rest} {...bonusProps} />;
}
