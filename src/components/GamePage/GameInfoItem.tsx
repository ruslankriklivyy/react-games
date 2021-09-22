import React from 'react';
import styled from 'styled-components';
import { IGameItem } from '../../interfaces/interfaces';

interface IGameInfoItem {
  chosenGame: IGameItem;
}

export const GameInfoItem: React.FC<IGameInfoItem> = ({ chosenGame }) => {
  return (
    <GamePageInfo>
      <GamePageInfoItem>
        <b>Released:</b> <span>{chosenGame.released}</span>
      </GamePageInfoItem>
      <GamePageInfoItem>
        <b>Developers: </b>
        {chosenGame.developers?.map(({ name, id }) => (
          <GamePageDevelopers key={id}>{name}</GamePageDevelopers>
        ))}
      </GamePageInfoItem>
      <GamePageInfoItem>
        <b>Publishers: </b>
        {chosenGame.publishers?.map(({ name, id }) => (
          <span key={id}>{name}</span>
        ))}
      </GamePageInfoItem>
    </GamePageInfo>
  );
};

const GamePageInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
`;

const GamePageInfoItem = styled.div`
  margin-right: 15px;
  margin-bottom: 5px;
  font-size: 15px;
  b {
    font-weight: 400;
  }
`;

const GamePageDevelopers = styled.div`
  display: inline-flex;
  align-items: center;
  padding-right: 5px;
  margin-right: 5px;
  border-right: 2px solid #0581aa;
  &:last-child {
    border-right: none;
  }
`;
