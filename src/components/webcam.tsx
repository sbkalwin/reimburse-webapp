import { ActionIcon, Image } from '@mantine/core';
import { Camera, CameraRotate, Check, X } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import React from 'react';
import RawWebcam from 'react-webcam';

const frontCamera = {
  facingMode: { exact: 'environment' },
};
const selfieCamera = {
  facingMode: 'user',
};

interface WebcamProps {
  onChange?: (value: string) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export default function Webcam(props: WebcamProps) {
  const { isOpen = true } = props;
  const [image, setImage] = React.useState<string | null | undefined>(
    undefined,
  );

  const webcamRef = React.useRef<RawWebcam>(null);
  const [isSelfie, setIsSelfie] = React.useState(false);
  const [videoConstraints, setVideoConstraints] =
    React.useState<MediaTrackConstraints>(frontCamera);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  const onSelfie = () => {
    setIsSelfie(true);
    setVideoConstraints(selfieCamera);
  };

  const onFront = () => {
    setIsSelfie(false);
    setVideoConstraints(frontCamera);
  };

  const onSubmit = (image: string) => () => {
    props.onChange?.(image);
    props.onClose?.();
  };

  React.useEffect(() => {
    isOpen && setImage(undefined);
  }, [isOpen]);

  const cameraActionIcons = (
    <>
      <ActionIcon size="xl" radius="50%" onClick={capture}>
        <Camera size={20} />
      </ActionIcon>
      <ActionIcon
        size="xl"
        radius="50%"
        onClick={isSelfie ? onFront : onSelfie}
        pos="absolute"
        right={16}
        bottom={16}
      >
        <CameraRotate size={20} />
      </ActionIcon>
    </>
  );

  const submitActionIcons = image && (
    <>
      <ActionIcon size="xl" radius="50%" onClick={onSubmit(image)}>
        <Check size={20} />
      </ActionIcon>
      <ActionIcon
        size="xl"
        radius="50%"
        onClick={() => {
          setImage(undefined);
        }}
        color="red"
      >
        <X size={20} />
      </ActionIcon>
    </>
  );

  const closeIcon = props.onClose && (
    <ActionIcon
      size="xl"
      radius="50%"
      onClick={props.onClose}
      pos="absolute"
      variant="light"
      left={16}
      top={16}
      color={colors.mainWhite}
      style={{
        zIndex: 10,
      }}
    >
      <X size={20} weight="bold" />
    </ActionIcon>
  );

  if (!isOpen) return null;

  return (
    <div
      style={{
        minWidth: '100dvw',
        minHeight: '100dvh',
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'white',
      }}
    >
      {closeIcon}
      {image ? (
        <Image
          src={image}
          width="100%"
          height="100%"
          fit="cover"
          pos="absolute"
          style={{
            objectPosition: 'center',
          }}
        />
      ) : (
        <RawWebcam
          screenshotFormat="image/png"
          ref={webcamRef}
          forceScreenshotSourceSize
          videoConstraints={videoConstraints}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: '50%',
            marginLeft: '-50%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      )}
      <div
        style={{
          position: 'fixed',
          zIndex: 1,
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          display: 'flex',
          justifyContent: 'center',
          gap: 64,
        }}
      >
        {submitActionIcons ?? cameraActionIcons}
      </div>
    </div>
  );
}
