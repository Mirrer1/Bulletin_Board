import styled from '@emotion/styled';

import media from '@styles/media';

export const PostListHeader = styled.section`
  padding: 2em 3em;

  & > div {
    background-color: ${({ theme }) => theme.colors.primary};
    padding: 1em 1.5em;
    margin-bottom: 2em;
  }

  & > div > header {
    font-size: ${({ theme }) => theme.calcRem(20)};
    font-weight: 700;
    margin-bottom: 0.3em;
  }

  & > div > p {
    font-size: ${({ theme }) => theme.calcRem(14)};
    opacity: 60%;
  }

  ${media.tablet} {
    padding: 1em 1.5em;

    & > div {
      padding: 0.5em 1em;
      margin-bottom: 1.5em;
    }

    & > div > header {
      font-size: ${({ theme }) => theme.calcRem(18)};
    }

    & > div > p {
      font-size: ${({ theme }) => theme.calcRem(12)};
    }
  }

  ${media.mobile} {
    padding: 0.5em;

    & > div {
      margin-bottom: 1.5em;
    }

    & > div > header {
      font-size: ${({ theme }) => theme.calcRem(16)};
    }

    & > div > p {
      font-size: ${({ theme }) => theme.calcRem(10)};
    }
  }
`;

export const ListContentHeader = styled.div`
  font-weight: 700;

  ${media.mobile} {
    font-size: ${({ theme }) => theme.calcRem(12)};
  }
`;

export const ListContentInfo = styled.div`
  ${media.mobile} {
    font-size: ${({ theme }) => theme.calcRem(10)};
  }
`;
