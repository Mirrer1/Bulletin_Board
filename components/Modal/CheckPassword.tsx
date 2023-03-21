import React, { useCallback } from 'react';
import Router from 'next/router';
import { Modal, message } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { hideCheckModal } from '@reducers/postSlice';
import { PasswordModalText, PasswordModalInput } from '@styles/modal/checkPassword';

const CheckPassword = () => {
  const dispatch = useAppDispatch();
  const { checkModalVisible, editPost } = useAppSelector(state => state.post);

  const onClickCancel = useCallback(() => {
    dispatch(hideCheckModal());
  }, []);

  const onSearch = useCallback((value: string) => {
    if (value === editPost?.password) Router.push('/posting');
    else message.warning('비밀번호가 일치하지 않습니다.');
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
        />
      </Modal>
    </>
  );
};

export default CheckPassword;
