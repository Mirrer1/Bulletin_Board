import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CommentOutlined } from '@ant-design/icons';
import Router from 'next/router';

import { ListContentHeader, ListContentInfo } from '@styles/postList';

interface DataType {
  key: number;
  name: string;
  content: string;
  comment: number;
}

const PostList = () => {
  const [textSize, setTextSize] = useState(90);

  const columns: ColumnsType<DataType> = [
    {
      title: <ListContentHeader>Name</ListContentHeader>,
      dataIndex: 'name',
      align: 'center',
      render: (name: string) => <ListContentInfo>{name}</ListContentInfo>,
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
      dataIndex: 'comment',
      align: 'center',
      render: (comment: number) => <ListContentInfo>{comment}</ListContentInfo>,
    },
  ];

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      content: `London, Park Lane no. London, Park Lane no. London, Park Lane no. London, Park Lane no. ${i} London, Park Lane no. London, Park Lane no. London, Park Lane no. London, Park Lane no. ${i}London, Park Lane no. London, Park Lane no. London, Park Lane no. London, Park Lane no. ${i}London, Park Lane no. London, Park Lane no. London, Park Lane no. London, Park Lane no. ${i}London, Park Lane no. London, Park Lane no. London, Park Lane no. London, Park Lane no. ${i}`,
      comment: i,
    });
  }

  const onRow = (record: DataType) => {
    return {
      onClick: () => {
        Router.push(`/post/${record.key}`);
      },
    };
  };

  useEffect(() => {
    function onResize() {
      if (document.documentElement.clientWidth > 1024) setTextSize(90);
      else if (document.documentElement.clientWidth > 768) setTextSize(60);
      else setTextSize(40);
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
        dataSource={data}
        pagination={{ pageSize: 10 }}
        rowKey={record => record.key}
        onRow={onRow}
      />
    </>
  );
};

export default PostList;
