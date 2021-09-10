import React from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from '@src/lib/next-auth-react-query';
// using client side session retrieval
const Home = () => {
  const [session, loading] = useSession({
    required: true,
    redirectTo: 'http://localhost:3000',
    queryConfig: {
      staleTime: 60 * 1000 * 60 * 3, // 3 hours
      refetchInterval: 60 * 1000 * 5, // 5 minutes
    },
  });

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
      Not signed in <br />
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
};

export default Home;
