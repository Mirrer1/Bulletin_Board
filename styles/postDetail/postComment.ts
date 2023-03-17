import styled from '@emotion/styled';
import { Form, List } from 'antd';

import media from '@styles/media';

export const CommentFormWrapper = styled(Form)`
  margin-bottom: 2em;
`;

export const CommentListWrapper = styled(List)`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1em 1.5em;

  ${media.tablet} {
    padding: 0.5em 1em;
  }

  ${media.mobile} {
    padding: 1em;
  }
`;

export const CommentWrapper = styled(List.Item.Meta)`
  & > div > h4 {
    font-size: ${({ theme }) => theme.calcRem(16)};
    font-weight: 700;
  }

  ${media.tablet} {
    & > div > h4 {
      font-size: ${({ theme }) => theme.calcRem(14)};
    }
  }

  ${media.mobile} {
    & > div > h4 {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }
  }
`;

export const CommentInfo = styled.div`
  & > :first-of-type {
    font-size: ${({ theme }) => theme.calcRem(14)};
    color: #000000;
    margin-bottom: 0.5em;
  }

  ${media.tablet} {
    & > :first-of-type,
    :last-child {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }
  }

  ${media.mobile} {
    & > :first-of-type,
    :last-child {
      font-size: ${({ theme }) => theme.calcRem(10)};
    }
  }
`;

export const CommentBtn = styled.a`
  font-size: ${({ theme }) => theme.calcRem(14)};

  ${media.tablet} {
    font-size: ${({ theme }) => theme.calcRem(12)};
  }

  ${media.mobile} {
    font-size: ${({ theme }) => theme.calcRem(10)};
  }
`;
