import { ActionIcon, Box, Button, Card, Flex, Text } from '@mantine/core';
import { Plus, Trash } from '@phosphor-icons/react';
import { ReimburseTypeEnum } from 'api-hooks/reimburse/model';
import { useFormState } from 'components/form';
import Input from 'components/input';
import StationerySelect from 'modules/select/stationery-select';
import React from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import { ReimburseFormType } from './reimburse-form-type';
export default function ReimburseDetailForm() {
  const { control, setValue } = useFormContext<ReimburseFormType>();
  const jenis = useWatch({
    control,
    name: 'jenis',
  });

  const { disabled } = useFormState();

  const isStationery = jenis === ReimburseTypeEnum.stationery;

  const name = 'details' as const;

  const { fields, append, remove } = useFieldArray({
    control,
    name,
    keyName: 'customId',
  });

  const onAdd = React.useCallback(() => {
    append({
      deskripsi: '',
      file_url: '',
      nama: '',
      peralatan_kantor_id: null,
      subtotal: 0,

      id: undefined,
    });
  }, [append]);

  const onRemove = React.useCallback(
    (index: number) => () => {
      remove(index);
    },
    [remove],
  );

  const stationerySelectComponent = (index: number) => {
    const parentName = `${name}.${index}` as const;
    return isStationery ? (
      <StationerySelect
        name={`${parentName}.peralatan_kantor_id`}
        label="Alat Kantor"
        placeholder="Masukkan Alat Kantor"
        onAfterChange={(_, option) => {
          setValue(`${parentName}.nama`, option.label);
          setValue(`${parentName}.subtotal`, option.item.harga);
        }}
      />
    ) : (
      <Input
        type="text"
        name={`${parentName}.nama`}
        label="Nama"
        placeholder="Masukkan Nama"
      />
    );
  };

  return (
    <Flex direction="column" gap={16}>
      {fields.map((field, index) => {
        const parentName = `${name}.${index}` as const;
        return (
          <Card key={field.customId} withBorder pos="relative">
            {!disabled && (
              <ActionIcon
                variant="subtle"
                color="red"
                pos="absolute"
                top={8}
                right={8}
                onClick={onRemove(index)}
              >
                <Trash size={20} />
              </ActionIcon>
            )}
            <Flex direction="column" mt={8} gap={8} w="100%">
              {stationerySelectComponent(index)}
              <Input
                type="text"
                name={`${parentName}.deskripsi`}
                placeholder="Masukkan Deskripsi"
                label="Deskripsi"
              />
              <Input
                thousandSeparator
                type="number"
                name={`${parentName}.subtotal`}
                placeholder="Masukkan Total"
                label="Total"
              />
              <Text>File:</Text>
              <Box w={64} h={64} bg="gray" />
            </Flex>
          </Card>
        );
      })}
      {!disabled && (
        <Button
          fullWidth
          onClick={onAdd}
          variant="outline"
          rightSection={<Plus size={16} />}
        >
          Tambah Item
        </Button>
      )}
    </Flex>
  );
}
