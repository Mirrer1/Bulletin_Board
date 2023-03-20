import styled from '@emotion/styled';
import { Form } from 'antd';

import media from '@styles/media';

export const FormWrapper = styled(Form)`
  .ant-form-item:first-of-type {
    margin-bottom: 0.7em;
  }
`;

export const CommentFormWrapper = styled(FormWrapper)`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1em 1.5em;

  ${media.mobile} {
    padding: 1em;
  }
`;
