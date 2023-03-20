import React from 'react';
import Head from 'next/head';

import AppLayout from '@components/AppLayout';
import PostingForm from '@components/PostingForm';
import { PageWrapper } from '@styles/postList';

const Posting = () => {
  return (
    <>
      <Head>
        <title>Notice Board | Posting </title>
      </Head>

      <AppLayout>
        <PageWrapper>
          <div>
            <header>게시글 작성</header>
            <p>입력한 비밀번호는 다시 확인할 수 없으니 잘 기억해주세요.</p>
          </div>

          <div>
            <PostingForm />
          </div>
        </PageWrapper>
      </AppLayout>
    </>
  );
};

export default Posting;
