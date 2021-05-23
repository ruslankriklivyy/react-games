import React from 'react';
import { IStoresLinks } from '../../interfaces/interfaces';

interface IGameStoreItem {
  item: IStoresLinks;
}

const GameStoreItem: React.FC<IGameStoreItem> = ({ item }) => {
  return (
    <a href={`https://${item.link}`}>
      <img src={item.img} alt="store img" />
    </a>
  );
};

export default GameStoreItem;
