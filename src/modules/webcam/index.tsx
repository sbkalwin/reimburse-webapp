import { ActionIcon, Image } from '@mantine/core';
import { Camera, CameraRotate, Check, X } from '@phosphor-icons/react';
import React from 'react';
import Webcam from 'react-webcam';

const frontCamera = {
  facingMode: { exact: 'environment' },
};
const selfieCamera = {
  facingMode: 'user',
};

export default function WebcamTest() {
  const [image, setImage] = React.useState<string | null | undefined>(
    undefined,
  );

  const webcamRef = React.useRef<Webcam>(null);
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

  const submitActionIcons = (
    <>
      <ActionIcon size="xl" radius="50%">
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

  return (
    <div
      style={{
        minWidth: '100dvw',
        minHeight: '100dvh',
      }}
    >
      {image ? (
        <Image
          src={image}
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
      ) : (
        <Webcam
          screenshotFormat="image/jpeg"
          ref={webcamRef}
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
        {image ? submitActionIcons : cameraActionIcons}
      </div>
    </div>
  );
}
