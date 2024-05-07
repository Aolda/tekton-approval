import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>[Aolda] Tekton Approval</title>
        <meta
          name="description"
          content="Tekton Approval in Aolda"
          key="desc"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
