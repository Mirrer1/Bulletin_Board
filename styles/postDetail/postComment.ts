import styled from '@emotion/styled';
import { Comment } from 'antd';

import media from '@styles/media';

export const CommentWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2em;
  padding: 1em 1.5em;

  & > :first-of-type {
    font-size: ${({ theme }) => theme.calcRem(16)};
  }

  & > .ant-divider {
    margin: 0;
  }

  ${media.tablet} {
    & > :first-of-type {
      font-size: ${({ theme }) => theme.calcRem(14)};
    }
  }

  ${media.mobile} {
    padding: 1em;

    & > :first-of-type {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }
  }
`;

export const CommentInfo = styled(Comment)`
  & > div > div > div > .ant-comment-content-author-name {
    font-size: ${({ theme }) => theme.calcRem(16)};
    color: black;
    font-weight: 700;
  }

  ${media.tablet} {
    & > div > div > div > .ant-comment-content-author-name {
      font-size: ${({ theme }) => theme.calcRem(14)};
    }

    & > div > div > .ant-comment-content-detail {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }

    & > div > div > .ant-comment-actions {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }
  }

  ${media.mobile} {
    & > div > div > div > .ant-comment-content-author-name {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }

    & > div > div > .ant-comment-content-detail {
      font-size: ${({ theme }) => theme.calcRem(10)};
    }

    & > div > div > .ant-comment-actions {
      font-size: ${({ theme }) => theme.calcRem(10)};
    }
  }
`;

export const ReplyCommentWrapper = styled.div`
  margin-left: 2em;

  ${media.mobile} {
    margin-left: 1em;
  }
`;
