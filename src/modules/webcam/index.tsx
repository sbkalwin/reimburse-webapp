import { Button, Image } from '@mantine/core';
import { Camera, CameraRotate } from '@phosphor-icons/react';
import useWindowDimensions from 'hooks/use-window-dimensions';
import React from 'react';
import Webcam from 'react-webcam';

const frontCamera = {
  facingMode: { exact: 'environment' },
};
const selfieCamera = {
  facingMode: 'user',
};

export default function WebcamTest() {
  const { width, height } = useWindowDimensions();

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
  return (
    <div
      style={{
        minWidth: '100dvw',
        minHeight: '100dvh',
      }}
    >
      {image && <Image src={image} />}
      <Webcam
        height={height || 0}
        screenshotFormat="image/jpeg"
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          backgroundColor: 'black',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      />
      <Button onClick={capture}>
        <Camera />
      </Button>
      <Button onClick={isSelfie ? onFront : onSelfie}>
        <CameraRotate />
      </Button>
    </div>
  );
}
