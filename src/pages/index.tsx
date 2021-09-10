import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

// using client side session retrieval
const Home = () => {
  const { data: session, status } = useSession();

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
      Not signed in <br />
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  );
};

export default Home;
