import React from 'react';

import AppLayout from '@components/AppLayout';
import PostList from '@components/PostList';

const Home = () => {
  return (
    <>
      <AppLayout>
        <section>
          <header>전체 게시글</header>
          <p>게시글을 클릭하면 자세한 내용을 확인할 수 있어요.</p>

          <PostList />
        </section>
      </AppLayout>
    </>
  );
};

export default Home;
