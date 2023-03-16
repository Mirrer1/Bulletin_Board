import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div>
      <div>공통메뉴</div>
      {children}
    </div>
  );
};

export default AppLayout;
