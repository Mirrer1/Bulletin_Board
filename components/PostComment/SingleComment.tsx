import React, { useCallback, useState } from 'react';
import { Space } from 'antd';
import dayjs from 'dayjs';

import CommentForm from '@components/PostComment/CommentForm';
import { CommentInfo } from '@styles/postDetail/postComment';

const SingleComment = ({ comment }: any) => {
  const [openReply, setOpenReply] = useState(false);

  const onClickReplyOpen = useCallback(() => {
    setOpenReply(prev => !prev);
  }, []);

  return (
    <>
      <CommentInfo
        actions={[
          <Space>
            <div>{dayjs(comment.created_at).format('YYYY.MM.DD')}</div>
            <button type="button" onClick={onClickReplyOpen} key="comment-basic-reply-to">
              답글쓰기
            </button>
          </Space>,
        ]}
        author={comment.writer}
        content={<p>{comment.content}</p>}
      />

      {openReply && <CommentForm setOpenReply={setOpenReply} />}
    </>
  );
};

export default SingleComment;
