import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Container } from '../App';

import searchSvg from '../assets/images/search.svg';
import userSvg from '../assets/images/user.svg';
import { setQuearySearch } from '../redux/gamesReducer';
import { RootState } from '../redux/store';

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

const Search = styled.div`
  width: 410px;
  height: 45px;
  display: flex;
  align-items: center;
  position: relative;
  input {
    width: 100%;
    height: 100%;
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 400;
    background-color: rgba(78, 79, 81, 0.4);
    border: none;
    padding: 5px 13px;
    border-radius: 3px;
    color: #fff;
    outline: none;
    transition: all 0.2s ease;
    border: 2px solid transparent;
    &::placeholder {
      letter-spacing: 1px;
      color: #fff;
      font-size: 16px;
      font-weight: 400;
    }
    &:focus {
      border: 2px solid #0581aa;
    }
  }
  img {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 10px;
    width: 18px;
    height: 18px;
  }
`;

const User = styled.div`
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
  const dispatch = useDispatch();
  const quearySearch = useSelector((state: RootState) => state.gamesReducer.querySearch);

  const onHandleChange = (value: string) => {
    dispatch(setQuearySearch(value));
  };

  return (
    <HeaderMain>
      <Container>
        <HeaderBlock>
          <Search>
            <input
              type="text"
              onChange={(e) => onHandleChange(e.target.value)}
              value={quearySearch}
              placeholder="Search"
            />
            <img src={searchSvg} alt="search svg" />
          </Search>
          <User>
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
