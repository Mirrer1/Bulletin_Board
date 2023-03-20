import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Row, Col } from 'antd';

import { FormVisible } from '@typings/db';
import { PostBtn } from '@styles/postDetail/post';
import { CommentFormWrapper } from '@styles/postingForm';

const CommentForm = ({ setOpenReply }: FormVisible) => {
  const [form] = Form.useForm();
  const [inputSize, setInputSize] = useState<'middle' | 'small'>('middle');

  const onSubmitComment = useCallback((value: { writer: string; password: string; firstComment: string } | unknown) => {
    console.log(value);
    form.resetFields();
    setOpenReply && setOpenReply();
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

  return (
    <>
      <CommentFormWrapper form={form} name="writeComment" onFinish={onSubmitComment}>
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
                  pattern: new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{1,16}$/),
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
          name="firstComment"
          rules={[
            {
              required: true,
              message: '댓글을 입력하세요.',
            },
          ]}
        >
          <Input.TextArea placeholder="댓글을 입력하세요." size={inputSize} showCount maxLength={100} rows={2} />
        </Form.Item>

        <Row justify="end">
          <PostBtn type="primary" htmlType="submit">
            등록
          </PostBtn>
        </Row>
      </CommentFormWrapper>
    </>
  );
};

export default CommentForm;
