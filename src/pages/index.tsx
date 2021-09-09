import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/client';

// using client side session retrieval
const Home = () => {
  const [session, loading] = useSession();

  console.log('session', session)

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
