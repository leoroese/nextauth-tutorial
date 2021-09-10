import React, { FC, useState, useEffect } from 'react';
import { getProviders, signOut, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { useSession } from '@src/lib/next-auth-react-query';

const SignIn: FC = () => {
  const [providers, setproviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const [session, loading] = useSession({
    required: true,
    redirectTo: 'http://localhost:3000',
    queryConfig: {
      staleTime: 60 * 1000 * 60 * 3, // 3 hours
      refetchInterval: 60 * 1000 * 5, // 5 minutes
    },
  });

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in but in the custom page!
      <br />
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
      {providers?.email && (
        <>
          <br />
          <br />
          <button type="button" onClick={() => signIn(providers.email.id)}>
            Email Login Bro
          </button>
        </>
      )}
      {providers?.github && (
        <>
          <br />
          <br />
          <button type="button" onClick={() => signIn(providers.github.id)}>
            Github Login Sis
          </button>
        </>
      )}
    </>
  );
};

export default SignIn;
