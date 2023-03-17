import React from 'react';
import Head from 'next/head';

import AppLayout from '@components/AppLayout';

const login = () => {
  return (
    <>
      <Head>
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
