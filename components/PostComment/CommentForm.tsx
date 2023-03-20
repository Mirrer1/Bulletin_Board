import React, { useCallback } from 'react';
import { Form, Input, Row, Col } from 'antd';

import { FormVisible } from '@typings/db';
import { PostBtn } from '@styles/postDetail/post';

const CommentForm = ({ setOpenReply }: FormVisible) => {
  const [form] = Form.useForm();

  const onSubmitComment = useCallback((e: { firstComment: string }) => {
    console.log(e);
    form.resetFields();
    setOpenReply && setOpenReply();
  }, []);

  return (
    <>
      <Form form={form} name="writeComment" onFinish={onSubmitComment}>
        <Form.Item
          name="firstComment"
          rules={[
            {
              required: true,
              message: '댓글을 입력하세요.',
            },
          ]}
        >
          <Input.TextArea placeholder="댓글을 입력하세요." showCount maxLength={100} rows={2} />
        </Form.Item>

        <Row justify="end">
          <PostBtn type="primary" htmlType="submit">
            등록
          </PostBtn>
        </Row>
      </Form>
    </>
  );
};

export default CommentForm;
