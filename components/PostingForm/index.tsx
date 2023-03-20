import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Row, Col, Space } from 'antd';

import { PostBtn } from '@styles/postDetail/post';
import { FormWrapper } from '@styles/postingForm';

const PostingForm = () => {
  const [form] = Form.useForm();
  const [inputSize, setInputSize] = useState<'large' | 'middle' | 'small'>('large');

  const onSubmitForm = useCallback((value: any) => {
    console.log(value);
  }, []);

  useEffect(() => {
    function onResize() {
      if (document.documentElement.clientWidth > 1024) setInputSize('large');
      else if (document.documentElement.clientWidth > 768) setInputSize('middle');
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
      <FormWrapper form={form} name="post" layout="vertical" requiredMark={false} onFinish={onSubmitForm}>
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
          name="title"
          rules={[
            {
              type: 'string',
              required: true,
              message: '제목을 입력해주세요.',
            },
          ]}
        >
          <Input placeholder="제목을 입력해주세요." size={inputSize} minLength={1} maxLength={40} />
        </Form.Item>

        <Form.Item
          name="content"
          rules={[
            {
              type: 'string',
              required: true,
              message: '내용을 입력해주세요.',
            },
          ]}
        >
          <Input.TextArea
            placeholder="내용을 입력해주세요."
            size={inputSize}
            allowClear
            showCount
            minLength={1}
            maxLength={2000}
            autoSize={{
              minRows: 15,
              maxRows: 35,
            }}
          />
        </Form.Item>

        <Row justify="end">
          <Space>
            <PostBtn href="/">취소</PostBtn>
            <PostBtn type="primary" htmlType="submit">
              작성
            </PostBtn>
          </Space>
        </Row>
      </FormWrapper>
    </>
  );
};

export default PostingForm;