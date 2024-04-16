import { NotificationData, showNotification } from '@mantine/notifications';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import colors from 'common/styles/colors';

interface NotificationProps extends NotificationData {}

const notification = {
  info: (props: NotificationProps) => {
    return showNotification({
      ...props,
      c: 'blue',
      message: props.message,
    });
  },
  success: (props: NotificationProps) =>
    showNotification({
      ...props,
      c: colors.statusPositive1,
      icon: <CheckCircle size={50} color={colors.sentimentPositive} />,
      styles: {
        root: { backgroundColor: colors.statusPositive1 },
        description: { color: colors.sentimentPositive },
      },
      message: props.message,
    }),
  error: (props: NotificationProps) =>
    showNotification({
      ...props,
      c: colors.statusNegative1,
      icon: <XCircle size={50} color={colors.sentimentNegative} />,
      styles: {
        root: { backgroundColor: colors.statusNegative1 },
        description: { color: colors.sentimentNegative },
      },
      message: props.message,
    }),
};

export default notification;
