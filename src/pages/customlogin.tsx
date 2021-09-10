import React, { FC, useState, useEffect } from 'react';
import { useSession, getProviders, signOut, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

const SignIn: FC = () => {
  const [providers, setproviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  const { data: session, status } = useSession();

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);

  if (status === 'loading') {
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
          <button type="button">
            <a href={providers?.email.signinUrl ?? 'http://localhost:3000'}>Email Login Bro</a>
          </button>
        </>
      )}
      {providers?.github && (
        <>
          <br />
          <br />
          <button type="button">
            <a href={providers?.github.signinUrl ?? 'http://localhost:3000'}>Github Login Sister</a>
          </button>
        </>
      )}
    </>
  );
};

export default SignIn;
