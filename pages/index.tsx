import React, { useCallback, useEffect, useState } from 'react';
import { Row, Space } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import Router from 'next/router';

import AppLayout from '@components/AppLayout';
import PostList from '@components/PostList';
import { loadPosts } from '@actions/post';
import { useAppDispatch } from '@hooks/reduxHook';
import { PageWrapper, ListSelectCount } from '@styles/postList';
import { PostBtn } from '@styles/postDetail/post';

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

  const onChangeCount = useCallback(value => {
    setPostCount(value);
  }, []);

  const onClickPosting = useCallback(() => {
    Router.push('/posting');
  }, []);

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  return (
    <>
      <AppLayout>
        <PageWrapper>
          <div>
            <header>전체 게시글</header>
            <p>게시글을 클릭하면 자세한 내용을 확인할 수 있어요.</p>
          </div>

          <div>
            <Row justify="end">
              <Space style={{ marginBottom: '1em' }}>
                <PostBtn icon={<FormOutlined />} type="primary" onClick={onClickPosting} />
                <ListSelectCount defaultValue={10} onChange={onChangeCount} options={postCountOptions} />
              </Space>
            </Row>
            <PostList postCount={postCount} />
          </div>
        </PageWrapper>
      </AppLayout>
    </>
  );
};

export default Home;
