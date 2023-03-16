import React from 'react';
import Head from 'next/head';

import AppLayout from '@components/AppLayout';

const Home = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Notice Board | Home</title>
      </Head>

      <AppLayout>
        <div>This is</div>
        <div>Home page</div>
      </AppLayout>
    </>
  );
};

export default Home;
