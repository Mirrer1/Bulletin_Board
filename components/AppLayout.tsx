import React, { ReactNode } from 'react';
import { FormOutlined } from '@ant-design/icons';

import { LayoutWrapper, LayoutLogo } from '@styles/applayout';

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <LayoutWrapper>
        <LayoutLogo>
          <FormOutlined />
          <p>NOTICE BOARD</p>
        </LayoutLogo>
      </LayoutWrapper>

      {children}
    </>
  );
};

export default AppLayout;
