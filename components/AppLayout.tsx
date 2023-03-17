import React, { ReactNode, useCallback } from 'react';
import { FormOutlined } from '@ant-design/icons';
import Router from 'next/router';

import { LayoutWrapper, LayoutLogo } from '@styles/applayout';

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const onClickLogo = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <>
      <LayoutWrapper>
        <LayoutLogo onClick={onClickLogo}>
          <FormOutlined />
          <p>NOTICE BOARD</p>
        </LayoutLogo>
      </LayoutWrapper>

      {children}
    </>
  );
};

export default AppLayout;
