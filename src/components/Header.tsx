import React from 'react';
import styled from 'styled-components';

import { GameListsLink, Search } from '.';
import { Container } from '../App';

import userSvg from '../assets/images/user.svg';

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

const User = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 33px;
    height: 33px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const Header = () => {
  return (
    <HeaderMain>
      <Container>
        <HeaderBlock>
          <Search />
          <User>
            <GameListsLink />
            <button>
              <img src={userSvg} alt="user svg" />
            </button>
          </User>
        </HeaderBlock>
      </Container>
    </HeaderMain>
  );
};

export default Header;
