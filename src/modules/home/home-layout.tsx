import { Box, Card, Flex, Title } from '@mantine/core';

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout(props: HomeLayoutProps) {
  return (
    <>
      <Card shadow="sm" withBorder>
        <Flex
          direction="row"
          w="100%"
          maw={768}
          m="auto"
          justify="space-between"
          align="center"
        >
          <Flex direction="row" gap={16} align="center">
            <Box bg="dark" h={36} w={120} />
            <Title order={6}>Reimburse App</Title>
          </Flex>
        </Flex>
      </Card>
      <Card
        h="calc(100dvh - 55px)"
        m="auto"
        style={{
          overflow: 'auto',
        }}
      >
        <div
          style={{
            margin: '0px auto',
            width: '100%',
            maxWidth: 768,
          }}
        >
          {props.children}
        </div>
      </Card>
    </>
  );
}
