import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

import { postValidation } from '@actions/post';
import { hideCheckModal } from '@reducers/postSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { PasswordModalText, PasswordModalInput } from '@styles/modal/checkPassword';

const CheckPassword = () => {
  const dispatch = useAppDispatch();
  const { checkModalVisible, editPost, deletePost, postValidationLoading } = useAppSelector(state => state.post);

  const onClickCancel = useCallback(() => {
    dispatch(hideCheckModal());
  }, []);

  const onSearch = useCallback(value => {
    if (editPost) dispatch(postValidation({ type: 'edit', id: editPost?.id, password: value }));
    else if (deletePost) dispatch(postValidation({ type: 'delete', id: deletePost?.id, password: value }));
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
          loading={postValidationLoading}
        />
      </Modal>
    </>
  );
};

export default CheckPassword;
