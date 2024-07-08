import { ActionIcon, Button, FileButton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Camera, FileImage } from '@phosphor-icons/react';
import { dataURLtoBlob, isWindowUndefined } from 'common/helpers/string';
import Image from 'next/image';
import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import Webcam from './webcam';

export interface ImageInputProps {
  defaultSrc?: string;
  type: 'image';
  onChange?: (value: File | null) => void;
  disabled?: boolean;
  label?: string;
}

export default function ImageInput(props: ImageInputProps) {
  const [src, setSrc] = React.useState(props.defaultSrc || undefined);
  const [isOpenBottomSheet, handleBottomSheet] = useDisclosure();
  const [isCameraDrawer, handleCameraDrawer] = useDisclosure();

  const reader = React.useMemo(() => {
    if (isWindowUndefined) return;
    return new FileReader();
  }, []);

  const onChangeFileReader = React.useCallback(
    (event: ProgressEvent<FileReader>) => {
      const result = event.target?.result;
      if (typeof result === 'string' || result === null) {
        const convert = result
          ? new File([result], `${Date.now()}.png`, {
              type: 'image/png',
              lastModified: new Date().getTime(),
            })
          : null;
        props.onChange?.(convert);
        setSrc(result || undefined);
      }
    },
    [props],
  );

  React.useEffect(() => {
    if (isWindowUndefined) return;
    reader?.addEventListener('load', onChangeFileReader);
    return () => {
      reader?.removeEventListener('load', onChangeFileReader);
    };
  }, [onChangeFileReader, reader]);

  const onChangeFileButton = (file: File | null) => {
    props.onChange?.(file);
    setSrc(file ? URL.createObjectURL(file) : undefined);
    handleBottomSheet.close();
  };

  const onChangeWebcam = (file: string) => {
    const blob = dataURLtoBlob(file);
    const result = new File([blob], `${Date.now()}.png`, {
      type: 'image/png',
    });
    setSrc(URL.createObjectURL(result));
    props.onChange?.(result);
  };

  const coreComponent = !props.disabled && (
    <>
      <BottomSheet
        open={isOpenBottomSheet}
        defaultSnap={({ maxHeight }) => maxHeight / 2}
        snapPoints={() => [150]}
        onDismiss={handleBottomSheet.close}
      >
        <FileButton
          onChange={onChangeFileButton}
          accept="image/png,image/jpeg,image/svg+xml,image/webp,image/heic"
        >
          {(props) => {
            return (
              <Button
                {...props}
                size="lg"
                variant="subtle"
                fullWidth
                leftSection={<FileImage size={24} />}
              >
                Photos
              </Button>
            );
          }}
        </FileButton>

        <Button
          onClick={() => {
            handleCameraDrawer.open();
            handleBottomSheet.close();
          }}
          size="lg"
          variant="subtle"
          fullWidth
          leftSection={<Camera size={24} />}
        >
          Camera
        </Button>
      </BottomSheet>
      <Webcam
        isOpen={isCameraDrawer}
        onClose={handleCameraDrawer.close}
        onChange={onChangeWebcam}
      />
    </>
  );

  const labelComponent = props.label && <Text>{props.label}</Text>;

  React.useEffect(() => {
    if (props.disabled) {
      setSrc(props.defaultSrc);
    }
  }, [props.defaultSrc, props.disabled]);

  return (
    <>
      {labelComponent}
      <ActionIcon
        onClick={() => {
          if (props.disabled) {
          } else {
            handleBottomSheet.open();
          }
        }}
        variant="outline"
        size={64}
        color="gray"
      >
        {src ? (
          <Image
            alt="result"
            width={64}
            height={64}
            src={src}
            objectFit="cover"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/icon512_maskable.png';
            }}
          />
        ) : (
          <FileImage size={64} />
        )}
      </ActionIcon>
      {coreComponent}
    </>
  );
}
