import React from 'react';
import { List, Space } from 'antd';
import dayjs from 'dayjs';

import { useAppSelector } from '@hooks/reduxHook';
import { CommentListWrapper, CommentWrapper, CommentInfo, CommentBtn } from '@styles/postDetail/postComment';

const ReplyComment = ({ responseTo }: { responseTo: number }) => {
  const { replyComment } = useAppSelector(state => state.post);

  return (
    <>
      <CommentListWrapper
        itemLayout="horizontal"
        dataSource={replyComment}
        renderItem={(item: any) => (
          <List.Item>
            {responseTo === item.parent && (
              <CommentWrapper
                title={item.writer}
                description={
                  <CommentInfo>
                    <div>{item.content}</div>
                    <Space>
                      <div>{dayjs(item?.created_at).format('YYYY.MM.DD')}</div>
                      <div>답글쓰기</div>
                      <CommentBtn>수정</CommentBtn>
                      <CommentBtn>삭제</CommentBtn>
                    </Space>
                  </CommentInfo>
                }
              />
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default ReplyComment;
