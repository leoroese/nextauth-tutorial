import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

// Use the <Provider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
const App = ({ Component, pageProps }: AppProps) => (
  <SessionProvider session={pageProps.session}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </SessionProvider>
);

export default App;
