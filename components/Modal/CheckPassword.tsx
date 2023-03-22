import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

import { hideCheckModal } from '@reducers/postSlice';
import { commentValidation, postValidation } from '@actions/post';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { PasswordModalText, PasswordModalInput } from '@styles/modal/checkPassword';

const CheckPassword = () => {
  const dispatch = useAppDispatch();
  const {
    checkModalVisible,
    editPost,
    deletePost,
    editComment,
    deleteComment,
    postValidationLoading,
    commentValidationLoading,
  } = useAppSelector(state => state.post);

  const onClickCancel = useCallback(() => {
    dispatch(hideCheckModal());
  }, []);

  const onSearch = useCallback(value => {
    if (editPost) dispatch(postValidation({ type: 'postEdit', id: editPost?.id, password: value }));
    else if (deletePost) dispatch(postValidation({ type: 'postDelete', id: deletePost?.id, password: value }));
    else if (editComment) dispatch(commentValidation({ type: 'commentEdit', id: editComment?.id, password: value }));
    else if (deleteComment)
      dispatch(commentValidation({ type: 'commentDelete', id: deleteComment?.id, password: value }));
  }, []);

  return (
    <>
      <Modal centered visible={checkModalVisible} onCancel={onClickCancel} footer={false}>
        <PasswordModalText>
          <KeyOutlined />
          <h1>비밀번호를 입력해주세요.</h1>
        </PasswordModalText>

        <PasswordModalInput
          type="password"
          placeholder="비밀번호 (16자 이하의 영문 + 숫자 + 특수기호)"
          onSearch={onSearch}
          enterButton="확인"
          minLength={1}
          maxLength={16}
          loading={postValidationLoading || commentValidationLoading}
        />
      </Modal>
    </>
  );
};

export default CheckPassword;
