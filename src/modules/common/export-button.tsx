import { ActionIcon } from '@mantine/core';
import { MicrosoftExcelLogo } from '@phosphor-icons/react';
import useJsonToExcel from 'hooks/use-json-to-excel';

interface ExportButtonProps<T>
  extends React.ComponentProps<typeof ActionIcon<'button'>> {
  data: T[];
  filename: string;
}

export default function ExportButton<T>(props: ExportButtonProps<T>) {
  const { data, filename, ...rest } = props;
  const { onExport, isLoading } = useJsonToExcel({
    data,
    filename,
  });

  if (data.length === 0) return null;

  return (
    <ActionIcon
      loading={isLoading}
      pos="fixed"
      right={16}
      onClick={onExport}
      bottom={16}
      variant="outline"
      bg="white"
      size="lg"
      radius="50%"
      style={{
        zIndex: 20,
      }}
      {...rest}
    >
      <MicrosoftExcelLogo size={24} />
    </ActionIcon>
  );
}
