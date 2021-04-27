import React from 'react';
import { IStoresLinks } from '../../interfaces/interfaces';

interface IGameStoreItem {
  item: IStoresLinks;
  index: number;
}

const GameStoreItem: React.FC<IGameStoreItem> = ({ item, index }) => {
  return (
    <a href={`https://${item.link}`} key={index.toString()}>
      <img src={item.img} alt="store img" />
    </a>
  );
};

export default GameStoreItem;
