import React from 'react';
import { List } from 'antd';

const CommentList = () => {
  const data = [
    {
      writer: 'writer 1',
      content: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      created_at: '2023. 1. 1',
    },
    {
      writer: 'writer 2',
      content: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      created_at: '2023. 1. 2',
    },
    {
      writer: 'writer 3',
      content: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      created_at: '2023. 1. 3',
    },
    {
      writer: 'writer 4',
      content: 'Ant Design, a design language for background applications, is refined by Ant UED Team',
      created_at: '2023. 1. 4',
    },
  ];

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item actions={[<a key="comment-edit">수정</a>, <a key="comment-delete">삭제</a>]}>
            <List.Item.Meta
              title={item.writer}
              description={
                <>
                  <div>{item.content}</div>
                  <div>{item.created_at}</div>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default CommentList;
