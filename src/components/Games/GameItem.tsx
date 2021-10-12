import React from 'react';
import Fade from 'react-reveal/Fade';
import styled from 'styled-components';

import { Button } from '../Button';
import { IPlatforms } from '../../interfaces/interfaces';

import starSvg from '../../assets/images/star.svg';
import arrowSvg from '../../assets/images/arrow.svg';
import gameDefaultJpg from '../../assets/images/game-default.jpg';

interface IGameItem {
  id: number;
  background_image: string;
  name: string;
  rating: number;
  released: string;
  parent_platforms: Array<IPlatforms>;
  onSelectGameId?: (id: number) => void;
}

export const GameItem: React.FC<IGameItem> = ({
  id,
  background_image,
  name,
  rating,
  released,
  parent_platforms,
  onSelectGameId,
}) => {
  return (
    <Fade bottom>
      <GamesItem>
        <GamesImg>
          <img src={!background_image ? gameDefaultJpg : background_image} alt="game img" />
        </GamesImg>
        <GamesInfo>
          <h4>{name}</h4>
          <GamesInfoBottom>
            <GamesTop>
              <GamesRating>
                <img src={starSvg} alt="star svg" /> {rating}
              </GamesRating>
              <GamesPlatform>
                {parent_platforms?.length > 0 &&
                  parent_platforms
                    .slice(0, 3)
                    .map((item, index) => <span key={index}>{item.platform.name}</span>)}
              </GamesPlatform>
            </GamesTop>
            <GamesReleased>{released}</GamesReleased>
            <Button onClick={() => onSelectGameId && onSelectGameId(id)}>
              More Info <img src={arrowSvg} alt="arrow svg" />
            </Button>
          </GamesInfoBottom>
        </GamesInfo>
      </GamesItem>
    </Fade>
  );
};

const GamesItem = styled.div`
  width: 100%;
  margin-bottom: 32px;
  height: 100%;
  border-radius: 25px;
  background-color: #22272b;
  opacity: 0.8;
  transition: all 0.3s ease;
  position: relative;
  &:hover {
    opacity: 1;
  }
`;

const GamesImg = styled.div`
  width: 100%;
  height: 300px;

  img {
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GamesInfo = styled.div`
  padding: 15px 20px;
  h4 {
    font-weight: 400;
    letter-spacing: 1px;
    font-size: 16px;
  }
`;

const GamesInfoBottom = styled.div`
  padding-top: 20px;
  button {
    position: absolute;
    bottom: 10px;
    right: 20px;
    display: flex;
    justify-content: center;
    margin-left: auto;
    margin-top: 10px;
    width: 50%;
    height: 40px;
    border-radius: 35px;
    background-color: transparent;
    border: 2px solid #0581aa;
    &:hover {
      img {
        transform: rotate(-180deg);
      }
    }
    img {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      transition: all 0.2s ease;
    }
  }
`;

const GamesRating = styled.span`
  display: flex;
  font-size: 15px;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 18px;
    height: 18px;
    margin-right: 8px;
  }
`;

const GamesReleased = styled.span``;

const GamesPlatform = styled.div`
  span {
    font-size: 15px;
    position: relative;
    margin-right: 5px;
    padding-right: 5px;
    border-right: 2px solid #0581aa;
    &:last-child {
      border-right: none;
    }
  }
`;

const GamesTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
