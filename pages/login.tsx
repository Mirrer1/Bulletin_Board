import React from 'react';
import Head from 'next/head';

import AppLayout from '@components/AppLayout';

const login = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Notice Board | Post Name</title>
      </Head>

      <AppLayout>
        <div>login</div>
        <div>page</div>
      </AppLayout>
    </>
  );
};

export default login;
