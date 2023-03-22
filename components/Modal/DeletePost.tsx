import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { removePost } from '@actions/post';
import { hideDeleteModal } from '@reducers/postSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { PasswordModalText } from '@styles/modal/checkPassword';

const DeletePost = () => {
  const dispatch = useAppDispatch();
  const { deleteModalVisible, deletePost, deletePostLoading } = useAppSelector(state => state.post);

  const onClickDelete = useCallback(() => {
    dispatch(removePost(deletePost));
  }, [deletePost]);

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
        confirmLoading={deletePostLoading}
      >
        <PasswordModalText>
          <DeleteOutlined />
          <h1>게시글을 정말 삭제하시겠습니까?</h1>
        </PasswordModalText>

        <p>삭제한 게시글은 복구할 수 없습니다.</p>
      </Modal>
    </>
  );
};

export default DeletePost;
