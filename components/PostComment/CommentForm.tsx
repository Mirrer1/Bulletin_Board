import React, { useCallback } from 'react';
import { Form, Input, Row, Button } from 'antd';

const CommentForm = () => {
  const [form] = Form.useForm();

  const onSubmitComment = useCallback((e: any) => {
    console.log(e);
  }, []);

  return (
    <>
      <Form form={form} name="writeComment" onFinish={onSubmitComment}>
        <Form.Item
          name="comment"
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
          <Button type="primary" htmlType="submit">
            등록
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default CommentForm;
