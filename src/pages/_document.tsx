import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>[Aolda] Tekton Approval</title>
        <meta
          name="description"
          content="Tekton Approval in Aolda"
          key="desc"
        />
      </Head>
      <meta property="og:title" content={'[Aolda] Tekton Approval'} />
      <meta property="og:description" content={'Tekton Approval in Aolda'} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={'public/og_image.png'} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
