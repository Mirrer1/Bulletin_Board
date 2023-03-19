import React from 'react';
import { List, Space } from 'antd';
import dayjs from 'dayjs';

import { useAppSelector } from '@hooks/reduxHook';
import { CommentListWrapper, CommentWrapper, CommentInfo, CommentBtn } from '@styles/postDetail/postComment';

const CommentList = () => {
  const { singlePost, firstComment, replyComment } = useAppSelector(state => state.post);

  return (
    <>
      <CommentListWrapper
        header={`총 ${singlePost?.comments.length}개의 댓글`}
        itemLayout="horizontal"
        dataSource={firstComment}
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
                  <Space>
                    <div>{dayjs(item?.created_at).format('YYYY.MM.DD')}</div>
                    <div>답글쓰기</div>
                  </Space>
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
