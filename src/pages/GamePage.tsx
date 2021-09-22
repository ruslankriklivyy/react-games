import React from 'react';
import Fade from 'react-reveal/Fade';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import scrollTop from '../utils/scrollTop';
import { addItemToList } from '../redux/actions/list';
import { IGameItem, IStoresLinks } from '../interfaces/interfaces';
import { device } from '../utils/deviceMedia';
import { fetchScreenshots, fetchOneGame } from '../redux/actions/games';
import { RootState } from '../redux/store';

import linkSvg from '../assets/images/link.svg';
import plusSvg from '../assets/images/plus.svg';
import starSvg from '../assets/images/star.svg';
import { Header } from '../components/Header';
import { Back } from '../components/Back';
import { GameInfoItem } from '../components/GamePage/GameInfoItem';
import { GameStoreItem } from '../components/GamePage/GameStoreItem';
import { Button } from '../components/Button';
import { GamePageScreenshots } from '../components/GamePage/GamePageScreenshots';

const GamePage = () => {
  const dispatch = useDispatch();
  const { chosenGame, gameId, screenshots, storesImages } = useSelector(
    (state: RootState) => state.gamesReducer,
  );

  const onAddToList = (obj: IGameItem) => {
    dispatch(addItemToList(obj));
  };

  const generateLinks = React.useCallback(
    (arr: Array<IStoresLinks>) => {
      const active = chosenGame.stores.map((i) => i.store.name);
      const result = arr.map((i) => {
        if (active.indexOf(i.name) >= 0) {
          return i;
        } else {
          return null;
        }
      });
      return result;
    },
    [chosenGame.stores],
  );

  const newArr = chosenGame.stores ? generateLinks(storesImages) : [];

  React.useEffect(() => {
    dispatch(fetchScreenshots(chosenGame.slug));
  }, [dispatch, chosenGame.slug]);

  React.useEffect(() => {
    const storageGameId = JSON.parse(localStorage.getItem('gameId') || 'null');

    if (storageGameId) {
      dispatch(fetchOneGame(storageGameId));
    } else {
      dispatch(fetchOneGame(gameId));
    }

    scrollTop();
  }, [dispatch, gameId]);

  return (
    chosenGame && (
      <>
        <Header />
        <Back />
        <Fade left>
          <GamePageBlock>
            <GamePageBlur
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${chosenGame.background_image_additional})`,
              }}></GamePageBlur>
            <GamePageWrapper>
              <GamePageMain>
                <GamePageLeft>
                  <img src={chosenGame.background_image} alt="game img" />
                </GamePageLeft>
                <GamePageRight>
                  <Fade left>
                    <GamePageTitle>
                      {chosenGame.name}
                      <a href={chosenGame.website}>
                        <img src={linkSvg} alt="link svg" />
                      </a>
                    </GamePageTitle>
                    <GamePageDescription>{chosenGame.description_raw}</GamePageDescription>
                    <GameInfoItem chosenGame={chosenGame} />
                    <GamePageInfoBottom>
                      <GamePageRating>
                        <img src={starSvg} alt="star svg" />
                        {chosenGame.rating}
                      </GamePageRating>
                      <GamePagePlatforms>
                        {chosenGame.platforms?.map((item, index) => (
                          <GamePagePlatformsItem key={index}>
                            {item.platform.name}
                          </GamePagePlatformsItem>
                        ))}
                      </GamePagePlatforms>
                    </GamePageInfoBottom>
                    <GamePageStores>
                      {chosenGame.stores &&
                        newArr.map(
                          (item, index: number) =>
                            item && <GameStoreItem item={item} key={index} />,
                        )}
                    </GamePageStores>
                    <Button onClick={() => onAddToList(chosenGame)}>
                      Add to list <img src={plusSvg} alt="plus svg" />
                    </Button>
                  </Fade>
                </GamePageRight>
              </GamePageMain>
              <GamePageScreenshots screenshots={screenshots} />
            </GamePageWrapper>
          </GamePageBlock>
        </Fade>
      </>
    )
  );
};

const GamePageBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const GamePageWrapper = styled.div`
  padding: 120px 15px 0 15px;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 50%;
  max-width: 1400px;
  margin: 0 auto;
  transform: translate(-50%, 0);
  z-index: 400;
  top: 0;
`;

const GamePageMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100vh;

  @media ${device.desktopL} {
    flex-direction: column;
    max-height: 1900px;
    min-height: 1200px;
  }
`;

const GamePageLeft = styled.div`
  margin-right: 30px;
  width: 410px;
  img {
    border-radius: 7px;
    width: 100%;
    height: 550px;
    display: block;
    object-fit: cover;
  }
  @media ${device.desktopL} {
    width: 100%;
  }
`;

const GamePageRight = styled.div`
  width: 60%;
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 2px solid #0581aa;
    margin-top: 30px;
    width: 220px;
    height: 50px;
    font-size: 17px;
    border-radius: 25px;
    transition: all 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
    img {
      width: 25px;
      height: 25px;
      margin-left: 20px;
    }
  }
  @media ${device.desktopL} {
    margin-top: 20px;
    width: 100%;
    button {
      margin: 30px auto 0 auto;
    }
  }
`;

const GamePageTitle = styled.h4`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 35px;
  margin-bottom: 20px;
  img {
    width: 23px;
    height: 23px;
    margin-left: 15px;
  }
`;

const GamePageBlur = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  filter: blur(12px);
  width: 100%;
  height: 100vh;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const GamePageDescription = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
`;

const GamePageInfoBottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  @media ${device.desktopL} {
    margin-top: 0;
  }
`;

const GamePagePlatforms = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const GamePagePlatformsItem = styled.div`
  line-height: 1.2;
  margin-right: 20px;
  @media ${device.desktopL} {
    margin-right: 0;
    margin-left: 20px;
    line-height: 1.4;
  }
`;

const GamePageRating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-right: 40px;
  img {
    width: 25px;
    height: 25px;
    margin-right: 7px;
  }
`;

const GamePageStores = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  @media ${device.desktopL} {
    margin-top: 20;
    justify-content: center;
  }
  a {
    opacity: 0.8;
    width: 40px;
    height: 40px;
    margin-bottom: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius: 8px;
    transition: all 0.2s ease;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &:hover {
      opacity: 1;
      transform: scale(1.1);
    }
  }
`;

export default GamePage;
