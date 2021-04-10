import React from 'react';
import Fade from 'react-reveal/Fade';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchOneGame } from '../redux/gamesReducer';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

import plusSvg from '../assets/images/plus.svg';
import epicGamesPng from '../assets/images/epicGames.png';
import backSvg from '../assets/images/back.svg';
import starSvg from '../assets/images/star.svg';
import appStorePng from '../assets/images/app-store.png';
import googlePlayPng from '../assets/images/google-play.png';
import xboxPng from '../assets/images/xbox.png';
import xbox360Png from '../assets/images/xbox360.png';
import steamPng from '../assets/images/steam.png';
import gogPng from '../assets/images/gog.png';
import playstationPng from '../assets/images/playstation.png';
import nintendoPng from '../assets/images/nintendo.png';
import { Button } from '../components';

const GamePageBlock = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const GamePageWrapper = styled.div`
  padding: 120px 15px 0 15px;
  height: 100vh;
  width: 100%;
  position: absolute;
  left: 50%;
  max-width: 1400px;
  margin: 0 auto;
  transform: translate(-50%, 0);
  top: 0;
`;

const GamePageMain = styled.div`
  display: flex;
  flex-wrap: wrap;
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
    border-radius: 7px;
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
`;

const GamePageTitle = styled.h4`
  font-weight: 500;
  font-size: 35px;
  margin-bottom: 20px;
`;

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

const GamePageBlur = styled.div`
  position: relative;
  filter: blur(12px);
  width: 100%;
  height: 100vh;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const GamePageDescription = styled.p`
  line-height: 1.3;
`;

const GamePageInfoBottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const GamePagePlatforms = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const GamePagePlatformsItem = styled.div`
  margin-bottom: 5px;
  margin-right: 20px;
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

const GamePageStores = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
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

const Back = styled.div`
  position: fixed;
  top: 25px;
  left: 0;
  z-index: 990;
  width: 130px;
  height: 40px;

  a {
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-bottom-right-radius: 8px;
    border-top-right-radius: 8px;
    border: 2px solid #22272b;
    border-left: none;
    font-size: 20px;
    color: #fff;
    transition: all 0.2s ease;
    &:hover {
      opacity: 1;
    }
  }
  img {
    margin-left: 20px;
    width: 20px;
    height: 20px;
  }
`;

const storesLinks = [
  { name: 'Xbox Store', img: xboxPng, link: 'microsoft.com' },
  { name: 'Epic Games', img: epicGamesPng, link: 'epicgames.com' },
  { name: 'Xbox 360 Store', img: xbox360Png, link: 'marketplace.xbox.com' },
  { name: 'Steam', img: steamPng, link: 'store.steampowered.com' },
  {
    name: 'PlayStation Store',
    img: playstationPng,
    link: 'store.playstation.com',
  },
  { name: 'Google Play', img: googlePlayPng, link: 'play.google.com' },
  { name: 'App Store', img: appStorePng, link: 'apps.apple.com' },
  { name: 'GOG', img: gogPng, link: 'gog.com' },
  { name: 'Nintendo Store', img: nintendoPng, link: 'nintendo.com' },
];

const GamePage = () => {
  const dispatch = useDispatch();
  const chosenGame = useSelector((state: RootState) => state.gamesReducer.chosenGame);
  const gameId = useSelector((state: RootState) => state.gamesReducer.gameId);

  const generateLinks = React.useCallback(
    (arr: any) => {
      const active = chosenGame.stores.map((i) => i.store.name);
      const result = arr.map((i: any) => {
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

  const newArr = chosenGame.stores ? generateLinks(storesLinks) : [];

  React.useEffect(() => {
    dispatch(fetchOneGame(gameId));
  }, [dispatch, gameId]);

  return (
    chosenGame && (
      <>
        <Back>
          <Link to="/">
            Back
            <img src={backSvg} alt="back svg" />
          </Link>
        </Back>
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
                    <GamePageTitle>{chosenGame.name}</GamePageTitle>
                    <GamePageDescription>
                      {chosenGame.description && chosenGame.description_raw}
                    </GamePageDescription>
                    <GamePageInfo>
                      <GamePageInfoItem>
                        <b>Released:</b> <span>{chosenGame.released}</span>
                      </GamePageInfoItem>
                      <GamePageInfoItem>
                        <b>Developers: </b>
                        {chosenGame.developers &&
                          chosenGame.developers.map(({ name, id }) => (
                            <GamePageDevelopers key={id}>{name}</GamePageDevelopers>
                          ))}
                      </GamePageInfoItem>
                      <GamePageInfoItem>
                        <b>Publishers: </b>
                        {chosenGame.publishers &&
                          chosenGame.publishers.map(({ name, id }) => <span key={id}>{name}</span>)}
                      </GamePageInfoItem>
                    </GamePageInfo>
                    <GamePageInfoBottom>
                      <GamePageRating>
                        <img src={starSvg} alt="star svg" />
                        {chosenGame.rating}
                      </GamePageRating>
                      <GamePagePlatforms>
                        {chosenGame.platforms &&
                          chosenGame.platforms.map((item) => (
                            <GamePagePlatformsItem>{item.platform.name}</GamePagePlatformsItem>
                          ))}
                      </GamePagePlatforms>
                    </GamePageInfoBottom>
                    <GamePageStores>
                      {chosenGame.stores &&
                        newArr.map(
                          (item: any, index: any) =>
                            item && (
                              <a href={`https://${item.link}`} key={index.toString()}>
                                <img src={item.img} alt="store img" />
                              </a>
                            ),
                        )}
                    </GamePageStores>
                    <Button>
                      Add to list <img src={plusSvg} alt="plus svg" />
                    </Button>
                  </Fade>
                </GamePageRight>
              </GamePageMain>
            </GamePageWrapper>
          </GamePageBlock>
        </Fade>
      </>
    )
  );
};

export default GamePage;
