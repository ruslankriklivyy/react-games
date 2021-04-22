import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { setQuearySearch } from '../redux/actions/games';
import { RootState } from '../redux/store';

import searchSvg from '../assets/images/search.svg';

const SearchWrapper = styled.div`
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
    padding: 5px 20px;
    border-radius: 25px;
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
    right: 20px;
    width: 18px;
    height: 18px;
  }
`;

const Search = () => {
  const dispatch = useDispatch();
  const quearySearch = useSelector((state: RootState) => state.gamesReducer.querySearch);

  const onHandleChange = (value: string) => {
    dispatch(setQuearySearch(value));
  };

  return (
    <SearchWrapper>
      <input
        type="text"
        onChange={(e) => onHandleChange(e.target.value)}
        value={quearySearch}
        placeholder="Search"
      />
      <img src={searchSvg} alt="search svg" />
    </SearchWrapper>
  );
};

export default Search;
