import { GetServerSidePropsContext } from 'next';
import { getToken } from '@/api/auth';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-4">
      redirecting...
    </main>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req } = ctx;
  const { url } = req;
  const urlParams = new URLSearchParams(url);
  const code = urlParams.get('code') || '';
  const redirectUri = ctx.req.headers.referer || '/';

  if (!ctx.req.cookies.token) {
    const token = await getToken(code).then((res) => res.access_token);
    ctx.res.setHeader('Set-Cookie', `token=${token}`);
  }

  ctx.res.writeHead(302, {
    Location: redirectUri,
  });
  ctx.res.end();
}
