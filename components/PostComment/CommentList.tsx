import React from 'react';
import { List } from 'antd';

import { CommentListWrapper, CommentWrapper, CommentInfo, CommentBtn } from '@styles/postDetail/postComment';

interface DataType {
  writer: string;
  content: string;
  created_at: string;
}

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
      <CommentListWrapper
        header="총 4개의 댓글"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <CommentBtn key="comment-edit">수정</CommentBtn>,
              <CommentBtn key="comment-delete">삭제</CommentBtn>,
            ]}
          >
            <CommentWrapper
              title={item.writer}
              description={
                <CommentInfo>
                  <div>{item.content}</div>
                  <div>{item.created_at}</div>
                </CommentInfo>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default CommentList;
