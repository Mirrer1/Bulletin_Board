import React, { useCallback, useEffect, useState } from 'react';
import { Row } from 'antd';

import AppLayout from '@components/AppLayout';
import PostList from '@components/PostList';
import { loadPosts } from '@actions/post';
import { useAppDispatch } from '@hooks/reduxHook';
import { PostListWrapper, ListSelectCount } from '@styles/postList';

const Home = () => {
  const dispatch = useAppDispatch();
  const [postCount, setPostCount] = useState(10);

  const postCountOptions = [
    {
      value: 5,
      label: '5개씩 보기',
    },
    {
      value: 10,
      label: '10개씩 보기',
    },
    {
      value: 15,
      label: '15개씩 보기',
    },
    {
      value: 20,
      label: '20개씩 보기',
    },
  ];

  const onChangeCount = useCallback((value: any) => {
    setPostCount(value);
  }, []);

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  return (
    <>
      <AppLayout>
        <PostListWrapper>
          <div>
            <header>전체 게시글</header>
            <p>게시글을 클릭하면 자세한 내용을 확인할 수 있어요.</p>
          </div>

          <div>
            <Row justify="end">
              <ListSelectCount defaultValue={10} onChange={onChangeCount} options={postCountOptions} />
            </Row>
            <PostList postCount={postCount} />
          </div>
        </PostListWrapper>
      </AppLayout>
    </>
  );
};

export default Home;
