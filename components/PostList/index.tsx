import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CommentOutlined } from '@ant-design/icons';
import Router from 'next/router';

import { Post, Comment } from '@typings/db';
import { useAppSelector } from '@hooks/reduxHook';
import { ListContentHeader, ListContentInfo } from '@styles/postList';

const PostList = () => {
  const { mainPosts } = useAppSelector(state => state.post);
  const [textSize, setTextSize] = useState(40);

  const columns: ColumnsType<Post> = [
    {
      title: <ListContentHeader>Name</ListContentHeader>,
      dataIndex: 'writer',
      align: 'center',
      render: (writer: string) => <ListContentInfo>{writer}</ListContentInfo>,
    },
    {
      title: <ListContentHeader>Content</ListContentHeader>,
      dataIndex: 'content',
      align: 'center',
      render: (content: string) => {
        if (content.length > textSize) return <ListContentInfo>{content.slice(0, textSize) + ' ...'}</ListContentInfo>;
        else return <ListContentInfo>{content}</ListContentInfo>;
      },
    },
    {
      title: <CommentOutlined />,
      dataIndex: 'comments',
      align: 'center',
      render: (comments: Comment[]) => <ListContentInfo>{comments.length}</ListContentInfo>,
    },
  ];

  const onRow = (record: Post) => {
    return {
      onClick: () => {
        Router.push(`/post/${record.id}`);
      },
    };
  };

  useEffect(() => {
    function onResize() {
      if (document.documentElement.clientWidth > 1024) setTextSize(40);
      else if (document.documentElement.clientWidth > 768) setTextSize(20);
      else setTextSize(10);
    }

    window.addEventListener('load', onResize);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('load', onResize);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={mainPosts}
        pagination={{ pageSize: 10 }}
        rowKey={record => record.id}
        onRow={onRow}
      />
    </>
  );
};

export default PostList;
