import React, { useEffect } from 'react';
import type { GetServerSideProps } from 'next';

import AppLayout from '@components/AppLayout';
import PostList from '@components/PostList';

import { PostListHeader } from '@styles/postList';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { loadPosts } from '@actions/post';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  return (
    <>
      <AppLayout>
        <PostListHeader>
          <div>
            <header>전체 게시글</header>
            <p>게시글을 클릭하면 자세한 내용을 확인할 수 있어요.</p>
          </div>

          <PostList />
        </PostListHeader>
      </AppLayout>
    </>
  );
};

export default Home;
