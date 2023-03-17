import styled from '@emotion/styled';
import { Col } from 'antd';

import media from '@styles/media';

export const PostWrapper = styled.section`
  padding: 2em 3em;

  ${media.tablet} {
    padding: 1em 1.5em;
  }

  ${media.mobile} {
    padding: 1em;
  }
`;

export const PostContent = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1em 1.5em;
  margin-bottom: 2em;

  & > header {
    font-size: ${({ theme }) => theme.calcRem(20)};
    font-weight: 700;
    margin-bottom: 0.5em;
  }

  & > p {
    font-size: ${({ theme }) => theme.calcRem(14)};
  }

  ${media.tablet} {
    padding: 0.5em 1em;
    margin-bottom: 1.5em;

    & > header {
      font-size: ${({ theme }) => theme.calcRem(18)};
    }

    & > p {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }
  }

  ${media.mobile} {
    padding: 1em;

    & > header {
      font-size: ${({ theme }) => theme.calcRem(16)};
    }

    & > p {
      font-size: ${({ theme }) => theme.calcRem(10)};
    }
  }
`;

export const PostWriteInfo = styled(Col)`
  & > :first-of-type {
    font-size: ${({ theme }) => theme.calcRem(16)};
  }

  & > :last-child {
    opacity: 60%;
  }

  ${media.tablet} {
    & > :first-of-type {
      font-size: ${({ theme }) => theme.calcRem(14)};
    }

    & > :last-child {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }
  }

  ${media.mobile} {
    & > :first-of-type {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }

    & > :last-child {
      font-size: ${({ theme }) => theme.calcRem(10)};
    }
  }
`;

export const PostCommentInfo = styled(Col)`
  ${({ theme }) => theme.flexSet()};

  & > :first-of-type {
    margin-right: 0.5em;
  }

  & > :last-child {
    margin-right: 0;
  }

  ${media.tablet} {
    & > :first-of-type {
      font-size: ${({ theme }) => theme.calcRem(14)};
    }

    & > :last-child {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }
  }

  ${media.mobile} {
    & > :first-of-type {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }

    & > :last-child {
      font-size: ${({ theme }) => theme.calcRem(10)};
    }
  }
`;
