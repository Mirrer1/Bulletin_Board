import React, { useCallback, useState } from 'react';
import { Space } from 'antd';
import dayjs from 'dayjs';

import CommentForm from '@components/PostComment/CommentForm';
import { useAppSelector } from '@hooks/reduxHook';
import { CommentInfo, ReplyCommentWrapper } from '@styles/postDetail/postComment';

const ReplyComment = ({ responseTo }: { responseTo: number }) => {
  const { replyComment } = useAppSelector(state => state.post);
  const [openReply, setOpenReply] = useState(false);

  const onClickReplyOpen = useCallback(() => {
    setOpenReply(prev => !prev);
  }, []);

  return (
    <ReplyCommentWrapper>
      {replyComment.map(comment => (
        <>
          {responseTo === comment.parent && (
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
          )}
        </>
      ))}
    </ReplyCommentWrapper>
  );
};

export default ReplyComment;
