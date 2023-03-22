import React from 'react';
import Head from 'next/head';

import AppLayout from '@components/AppLayout';
import PostingForm from '@components/PostingForm';
import { useAppSelector } from '@hooks/reduxHook';
import { PageWrapper } from '@styles/postList';

const Posting = () => {
  const { editPost } = useAppSelector(state => state.post);

  return (
    <>
      <Head>
        <title>Notice Board | Posting </title>
      </Head>

      <AppLayout>
        <PageWrapper>
          <div>
            <header>{editPost ? '게시글 수정' : '게시글 작성'}</header>
            <p>
              {editPost
                ? '수정한 게시글은 다시 되돌릴 수 없습니다.'
                : '입력한 비밀번호는 다시 확인할 수 없으니 잘 기억해주세요.'}
            </p>
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
