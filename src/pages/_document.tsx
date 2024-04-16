import { ColorSchemeScript } from '@mantine/core';
import resetStyle from 'common/constants/reset-style';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <title>Reimburse app</title>
      <Head>
        <meta charSet="utf-8" />
        <meta name="author" content="Alwin" />
        {/* KEYWORDS */}
        <meta name="title" content="The Next.js Progressive Web App Template" />
        <meta
          name="description"
          content="A Solid Foundation for Building Scalable and Efficient Progressive Web Application!"
        />
        <meta
          name="keywords"
          content="Next.js, pwa, React, HTML, CSS, JavaScript, TypeScript, cats, facts, breeds"
        />
        {/* THEMES */}
        <style>{resetStyle}</style>

        <ColorSchemeScript />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
