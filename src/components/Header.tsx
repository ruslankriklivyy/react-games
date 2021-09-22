import React from 'react';
import styled from 'styled-components';

import { Container } from '../App';
import { Search } from './Search';
import { User } from './User';

export const Header = React.memo(() => {
  return (
    <HeaderMain>
      <Container>
        <HeaderBlock>
          <Search />
          <User />
        </HeaderBlock>
      </Container>
    </HeaderMain>
  );
});

const HeaderMain = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100px;
  padding-top: 25px;
`;

const HeaderBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
