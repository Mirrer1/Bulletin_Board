import styled from '@emotion/styled';
import media from '@styles/media';
import { Space } from 'antd';

export const LayoutWrapper = styled.header`
  padding: 1em 2em;

  ${media.tablet} {
    padding: 0.8em 1.2em;
  }

  ${media.mobile} {
    padding: 0.5em 0.8em;
  }
`;

export const LayoutLogo = styled(Space)`
  font-size: ${({ theme }) => theme.calcRem(24)};
  font-weight: 700;

  & > div > p {
    margin-bottom: 0;
  }

  ${media.tablet} {
    font-size: ${({ theme }) => theme.calcRem(18)};
  }

  ${media.mobile} {
    font-size: ${({ theme }) => theme.calcRem(14)};
  }
`;
