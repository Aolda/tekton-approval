export default function Page() {
  return (
    <main className="flex h-screen flex-col items-center justify-between lg:p-24 p-4">
      <h1 className={'text-2xl text-black'}>redirect..</h1>
    </main>
  );
}

export async function getServerSideProps(context: any) {
  const redirectUri = process.env.KEYCLOAK_URI;
  context.res.writeHead(302, {
    Location: redirectUri,
  });
  context.res.end();
  return { props: {} };
}
