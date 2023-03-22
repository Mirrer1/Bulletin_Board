import React, { useCallback, useState } from 'react';
import { Space } from 'antd';
import dayjs from 'dayjs';

import CommentForm from '@components/PostComment/CommentForm';
import EditCommentForm from '@components/PostComment/EditCommentForm';
import { Comment } from '@typings/db';
import { showCheckModal } from '@reducers/postSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { CommentInfo, ReplyCommentWrapper } from '@styles/postDetail/postComment';

const ReplyComment = ({ responseTo, secondComments }: { responseTo: number; secondComments: Comment[] }) => {
  const dispatch = useAppDispatch();
  const { editCommentFormVisible, editComment, commentValidationDone } = useAppSelector(state => state.post);
  const [openReply, setOpenReply] = useState(false);

  const onClickReplyOpen = useCallback(() => {
    setOpenReply(prev => !prev);
  }, []);

  const onClickEditComment = useCallback(
    comment => () => {
      dispatch(showCheckModal({ type: 'commentEdit', id: comment.id }));
    },
    [],
  );

  return (
    <ReplyCommentWrapper>
      {secondComments.map(comment => (
        <div key={comment.id}>
          {responseTo === comment.parent && (
            <>
              {commentValidationDone && editCommentFormVisible && comment.id === editComment?.id ? (
                <EditCommentForm />
              ) : (
                <CommentInfo
                  actions={[
                    <Space size="middle">
                      <Space size="small">
                        <div>{dayjs(comment.created_at).format('YYYY.MM.DD')}</div>
                        <button type="button" onClick={onClickReplyOpen} key="comment-basic-reply-to">
                          답글쓰기
                        </button>
                      </Space>

                      <Space size="small">
                        <a key="comment-edit" onClick={onClickEditComment(comment)}>
                          수정
                        </a>
                        <a key="comment-delete">삭제</a>
                      </Space>
                    </Space>,
                  ]}
                  author={comment.writer}
                  content={<p>{comment.content}</p>}
                />
              )}

              {openReply && <CommentForm setOpenReply={setOpenReply} />}
            </>
          )}
        </div>
      ))}
    </ReplyCommentWrapper>
  );
};

export default ReplyComment;
