import { Carousel, Embla } from '@mantine/carousel';
import { Box, Button, Flex, Space, Text } from '@mantine/core';
import NavigationRoutes from 'components/common/side-navigation/navigations';
import Link from 'next/link';
import React from 'react';

export type SlideType = {
  content: React.ReactNode;
};

export const IS_APP_FIRST_RUN = 'is_app_first_run';

export function getIsAppFirstRun() {
  if (typeof window === 'undefined') return;
  return (localStorage.getItem(IS_APP_FIRST_RUN) || 'false') as
    | 'true'
    | 'false';
}

export function setIsAppFirstRun(value: 'true' | 'false') {
  if (typeof window === 'undefined') return;
  localStorage.setItem(IS_APP_FIRST_RUN, value);
}

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [embla, setEmbla] = React.useState<Embla | null>(null);

  const slides: SlideType[] = [
    {
      content: (
        <Text ta="center">
          <Text span fw={600}>
            Welcome to our Reimburse-app!
          </Text>{' '}
          Cupidatat laboris laborum incididunt dolore incididunt amet duis
          exercitation sunt eiusmod cupidatat ullamco.
        </Text>
      ),
    },
    {
      content: (
        <Text ta="center">
          Cillum id magna nulla sit esse anim exercitation duis amet.
        </Text>
      ),
    },
    {
      content: (
        <Text ta="center">
          In est ullamco consectetur fugiat sunt ex adipisicing ullamco laboris
          aliquip.
        </Text>
      ),
    },
    {
      content: (
        <Text ta="center">
          Eu anim laborum minim reprehenderit sint minim voluptate dolore.
        </Text>
      ),
    },
  ];

  React.useEffect(() => {
    if (!embla) return;
    setIsAppFirstRun('true');
    const intervalId = setInterval(() => {
      embla.scrollNext();
    }, 4000);
    return () => clearInterval(intervalId as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [embla]);

  const isEnd = currentSlide === slides.length - 1;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 768,
        minHeight: '100dvh',
        margin: 'auto',
        position: 'relative',
      }}
    >
      <Carousel
        withIndicators
        withControls={false}
        getEmblaApi={setEmbla}
        m="auto"
        mah={600}
        px={16}
        onSlideChange={(index) => setCurrentSlide(index)}
      >
        {slides.map((slide, index) => {
          return (
            <Carousel.Slide key={index}>
              <Flex
                direction="column"
                justify="center"
                align="center"
                style={{
                  minHeight: '100dvh',
                }}
                mih="100dvh"
              >
                <Box bg="gray" w={120} h={120} />
                <Space h={38} />
                {slide.content}
              </Flex>
            </Carousel.Slide>
          );
        })}
      </Carousel>
      <Flex
        direction="row"
        justify="center"
        align="center"
        pos="absolute"
        bottom={16}
        left={0}
        right={0}
      >
        {isEnd ? (
          <Link href={NavigationRoutes.home}>
            <Button miw={108}>Start</Button>
          </Link>
        ) : (
          <>
            <Button
              style={{ alignSelf: 'center' }}
              onClick={() => {
                embla?.scrollNext();
              }}
              miw={108}
            >
              Next
            </Button>
            <Button
              pos="absolute"
              right={16}
              variant="transparent"
              onClick={() => {
                embla?.scrollTo(slides.length - 1);
              }}
            >
              Skip
            </Button>
          </>
        )}
      </Flex>
    </div>
  );
}
