import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { removeComment, removePost } from '@actions/post';
import { hideDeleteModal } from '@reducers/postSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { PasswordModalText } from '@styles/modal/checkPassword';

const DeleteConfirm = () => {
  const dispatch = useAppDispatch();
  const { deleteModalVisible, deletePost, deletePostLoading, deleteComment, deleteCommentLoading } = useAppSelector(
    state => state.post,
  );

  const onClickDelete = useCallback(() => {
    if (deletePost) dispatch(removePost(deletePost));
    else if (deleteComment) dispatch(removeComment(deleteComment));
  }, [deletePost, deleteComment]);

  const onClickCancel = useCallback(() => {
    dispatch(hideDeleteModal());
  }, []);

  return (
    <>
      <Modal
        centered
        visible={deleteModalVisible}
        onOk={onClickDelete}
        onCancel={onClickCancel}
        confirmLoading={deletePostLoading || deleteCommentLoading}
      >
        <PasswordModalText>
          <DeleteOutlined />
          <h1>{deletePost ? '게시글' : '댓글'}을 정말 삭제하시겠습니까?</h1>
        </PasswordModalText>

        <p>삭제한 {deletePost ? '게시글' : '댓글'}은 복구할 수 없습니다.</p>
      </Modal>
    </>
  );
};

export default DeleteConfirm;
