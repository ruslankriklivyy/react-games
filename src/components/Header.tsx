import React from 'react';

import styled from 'styled-components';
import { Search } from '.';

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

const GameLists = styled.span`
  font-size: 17px;
  margin-right: 25px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: transparent;
  border: 2px solid #0581aa;
  padding: 8px 20px;
  border-radius: 7px;
  transition: all 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
`;

const Header = () => {
  return (
    <HeaderMain>
      <Container>
        <HeaderBlock>
          <Search />
          <User>
            <GameLists>My game list</GameLists>
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
