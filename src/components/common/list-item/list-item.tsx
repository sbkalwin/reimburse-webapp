import { Flex, FlexProps } from '@mantine/core';

import classes from './ListItem.module.css';
interface ListItemProps extends FlexProps {}

export default function ListItem(props: ListItemProps) {
  return <Flex p={16} className={classes.container} {...props} />;
}
