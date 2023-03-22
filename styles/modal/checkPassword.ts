import styled from '@emotion/styled';
import { Space, Input } from 'antd';

export const PasswordModalText = styled(Space)`
  margin: 1.5em 0;

  & > div > h1 {
    font-weight: 700;
    margin-bottom: 0;
  }
`;

export const PasswordModalInput = styled(Input.Search)`
  margin-bottom: 0.5em;
`;
