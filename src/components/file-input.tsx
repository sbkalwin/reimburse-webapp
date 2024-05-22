import { Button, FileButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Camera, Image } from '@phosphor-icons/react';
import { isWindowUndefined } from 'common/helpers/string';
import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

import Webcam from './webcam';

interface ImageInputProps {
  type: 'image';
  onChange?: (value: string | null) => void;
  disabled?: boolean;
}

export default function ImageInput(props: ImageInputProps) {
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
        props.onChange?.(result);
        return;
      }
      console.log(result);
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
    file && reader?.readAsDataURL(file);
    handleBottomSheet.close();
  };

  const onChangeWebcam = (file: string) => {};

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
                leftSection={<Image size={24} />}
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

  return (
    <>
      <Button onClick={handleBottomSheet.open}>Test</Button>
      {coreComponent}
    </>
  );
}
