import { ActionIcon, Button, Card, SimpleGrid } from '@mantine/core';
import { Disc, Pencil, Plus, Trash, X } from '@phosphor-icons/react';
import AppLayout from 'components/common/app-layout/app-layout';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import { useFormState } from 'components/form';
import useAuth from 'hooks/use-auth';
import { useRouter } from 'next/router';
import { useFormContext } from 'react-hook-form';

interface FormLayoutProps {
  children: React.ReactNode;
  onDelete?: Function;
  isEditable?: boolean;
  rightIconProps?: React.ReactNode;
}

export function FormLayout({
  children,
  onDelete,
  isEditable = false,
}: FormLayoutProps) {
  const { disabled, setDisabled } = useFormState();
  const { reset, getValues } = useFormContext();
  const isEdit = !!getValues('data');
  const { isAdmin } = useAuth();

  const cancelButton = !disabled && isEdit && (
    <Button
      color="red"
      variant="outline"
      rightSection={<X size={16} />}
      onClick={() => {
        reset();
        setDisabled(true);
      }}
    >
      Batal
    </Button>
  );

  const submitButton = !disabled && (
    <Button rightSection={<Disc size={16} />} type="submit">
      Simpan
    </Button>
  );

  const editButton = isEdit && disabled && (
    <Button
      rightSection={<Pencil size={16} />}
      onClick={() => setDisabled(false)}
    >
      Edit
    </Button>
  );

  const deleteButton =
    !!disabled && !!onDelete
      ? ({
          onClick: onDelete,
          children: <Trash size={24} />,
          color: 'red',
          variant: 'subtle',
        } as React.ComponentProps<typeof ActionIcon<'button'>>)
      : undefined;

  const cols = [editButton, cancelButton, submitButton].filter(Boolean).length;

  const bottomContainer = (
    <Card withBorder>
      <SimpleGrid cols={cols} w="100%" maw={768} m="auto">
        {editButton}
        {cancelButton}
        {submitButton}
      </SimpleGrid>
    </Card>
  );

  const hasFooter = isEditable ? true : isAdmin;
  const h = hasFooter ? 'calc(100dvh - 55px - 85px)' : 'calc(100dvh - 55px)';

  return (
    <AppLayout
      back
      mainContainerProps={{
        h,
        padding: 16,
      }}
      rightIconProps={deleteButton}
      bottomContainer={hasFooter ? bottomContainer : undefined}
    >
      {children}
    </AppLayout>
  );
}

interface ListLayoutProps {
  children: React.ReactNode;
  createNavigation: NavigationRoutes;
}

export function ListLayout({ children, createNavigation }: ListLayoutProps) {
  const { push } = useRouter();
  const { isAdmin } = useAuth();

  return (
    <AppLayout
      back
      rightIconProps={
        isAdmin
          ? {
              onClick: () => push(createNavigation),
              children: <Plus size={24} />,
            }
          : undefined
      }
    >
      {children}
    </AppLayout>
  );
}
