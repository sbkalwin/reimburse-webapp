import { ActionIcon } from '@mantine/core';
import { IconProps, X } from '@phosphor-icons/react';

export interface ClearButtonProps
  extends React.ComponentProps<typeof ActionIcon<'button'>> {
  iconProps?: IconProps;
}

export default function ClearButton(props: ClearButtonProps) {
  const { iconProps } = props;
  return (
    <ActionIcon component="button" variant="transparent">
      <X size={16} {...iconProps} />
    </ActionIcon>
  );
}
