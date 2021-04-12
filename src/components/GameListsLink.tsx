import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../redux/store';

const GameLists = styled.span`
  font-size: 17px;
  margin-right: 25px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: transparent;
  border: 2px solid #0581aa;
  padding: 8px 20px;
  border-radius: 20px;
  transition: all 0.2s ease;
  &:hover {
    opacity: 0.8;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #22272b;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    margin-left: 12px;
    color: #0581aa;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;

const GameListsLink = () => {
  const items = useSelector((state: RootState) => state.listReducer.listItems);

  return (
    <GameLists>
      <Link to="/list">
        My game list <span>{items && items.length >= 0 ? items.length : 0}</span>
      </Link>
    </GameLists>
  );
};

export default GameListsLink;
