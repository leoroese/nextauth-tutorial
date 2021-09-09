import React from 'react';
import { getSession } from 'next-auth/client';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';

interface IServerSideRenderedPageProps {
  session: Session | null;
}

const ServerSideRenderedPage = ({ session }: IServerSideRenderedPageProps) => {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.

  if (session) {
    return (
      <>
        <h1>Server Side Rendering</h1>
        <p>
          Using <strong>getSession()</strong> in <strong>getServerSideProps()</strong> is the recommended approach if
          you need to support Server Side Rendering with authentication.
        </p>
        <p>The advantage of Server Side Rendering is this page does not require client side JavaScript.</p>
        <p>The disadvantage of Server Side Rendering is that this page is slower to render.</p>
      </>
    );
  }
  return <h1>Naw the server said you are not logged in</h1>;
};
// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

export default ServerSideRenderedPage;
