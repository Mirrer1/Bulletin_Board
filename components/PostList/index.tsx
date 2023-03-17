import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CommentOutlined } from '@ant-design/icons';

interface DataType {
  key: number;
  name: string;
  content: string;
  comment: number;
}

const PostList = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
      align: 'center',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      render: (content: string) => {
        if (content.length > 10) return <div>{content.slice(0, 10) + ' ...'}</div>;
        else return <div>{content}</div>;
      },
    },
    {
      title: <CommentOutlined />,
      dataIndex: 'comment',
      width: '10%',
      align: 'center',
    },
  ];

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      content: `London, Park Lane no. London, Park Lane no. London, Park Lane no. London, Park Lane no. ${i}`,
      comment: i,
    });
  }

  const onRow = (record: DataType) => {
    return {
      onClick: () => {
        console.log(record);
      },
    };
  };

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
