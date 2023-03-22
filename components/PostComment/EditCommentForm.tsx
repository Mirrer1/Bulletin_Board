import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Row, Col, Space } from 'antd';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHook';
import { hideEditCommentForm } from '@reducers/postSlice';
import { PostBtn } from '@styles/postDetail/post';
import { CommentFormWrapper } from '@styles/postingForm';
import { modifyComment } from '@actions/post';

const EditCommentForm = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const { editComment, editCommentLoading } = useAppSelector(state => state.post);
  const [inputSize, setInputSize] = useState<'middle' | 'small'>('middle');

  const onSubmitForm = useCallback(value => {
    dispatch(
      modifyComment({
        ...value,
        id: editComment?.id,
        created_at: editComment?.created_at,
        updated_at: new Date().toISOString(),
      }),
    );
  }, []);

  const onClickCancel = useCallback(() => {
    dispatch(hideEditCommentForm());
  }, []);

  useEffect(() => {
    function onResize() {
      if (document.documentElement.clientWidth > 1024) setInputSize('middle');
      else setInputSize('small');
    }

    window.addEventListener('load', onResize);
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('load', onResize);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      writer: editComment?.writer,
      password: editComment?.password,
      content: editComment?.content,
    });
  }, [form, editComment]);

  return (
    <>
      <CommentFormWrapper form={form} name="writeComment" onFinish={onSubmitForm}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="writer"
              rules={[
                {
                  type: 'string',
                  required: true,
                  message: '작성자를 입력해주세요.',
                },
              ]}
            >
              <Input placeholder="작성자" size={inputSize} minLength={1} maxLength={10} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="password"
              rules={[
                {
                  type: 'string',
                  required: true,
                  message: '비밀번호 형식이 올바르지 않습니다.',
                  // pattern: new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{1,16}$/),
                },
              ]}
            >
              <Input
                type="password"
                size={inputSize}
                placeholder="비밀번호 (16자 이하의 영문 + 숫자 + 특수기호)"
                minLength={1}
                maxLength={16}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="content"
          rules={[
            {
              required: true,
              message: '댓글을 입력하세요.',
            },
          ]}
        >
          <Input.TextArea placeholder="댓글을 입력하세요." size={inputSize} showCount maxLength={500} rows={2} />
        </Form.Item>

        <Row justify="end">
          <Space>
            <PostBtn onClick={onClickCancel}>취소</PostBtn>

            <PostBtn type="primary" htmlType="submit" loading={editCommentLoading}>
              수정
            </PostBtn>
          </Space>
        </Row>
      </CommentFormWrapper>
    </>
  );
};

export default EditCommentForm;
