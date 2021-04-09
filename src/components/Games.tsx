import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from '.';
import { Container } from '../App';
import { fetchGames, setGameId } from '../redux/gamesReducer';
import { RootState } from '../redux/store';
import starSvg from '../assets/images/star.svg';
import arrowSvg from '../assets/images/arrow.svg';
import { Link } from 'react-router-dom';

const GamesWrapper = styled.div`
  margin-top: 80px;
`;

const GamesMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const GamesItem = styled.div`
  width: 23%;
  margin-bottom: 32px;
  min-height: 450px;
  border-radius: 5px;
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
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
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
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 15px;
    right: 0;
    width: 50%;
    height: 40px;
    border-radius: 0;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    img {
      width: 20px;
      height: 20px;
      margin-left: 10px;
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

const Games = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.gamesReducer.items);
  const genreName = useSelector((state: RootState) => state.gamesReducer.genreName);
  const querySearch = useSelector((state: RootState) => state.gamesReducer.querySearch);

  const onSelectGameId = (id: number) => {
    dispatch(setGameId(id));
  };

  React.useEffect(() => {
    dispatch(fetchGames(genreName, querySearch));
  }, [dispatch, genreName, querySearch]);

  return (
    <GamesWrapper>
      <Container>
        <GamesMain>
          {items &&
            items.results &&
            items.results.map(
              ({ background_image, name, released, rating, parent_platforms, id }) => (
                <GamesItem key={id}>
                  <GamesImg>
                    <img src={background_image} alt="game img" />
                  </GamesImg>
                  <GamesInfo>
                    <h4>{name}</h4>
                    <GamesInfoBottom>
                      <GamesTop>
                        <GamesRating>
                          <img src={starSvg} alt="star svg" /> {rating}
                        </GamesRating>
                        <GamesPlatform>
                          {parent_platforms &&
                            parent_platforms.length > 0 &&
                            parent_platforms
                              .slice(0, 3)
                              .map((item) => <span>{item.platform.name}</span>)}
                        </GamesPlatform>
                      </GamesTop>
                      <GamesReleased>{released}</GamesReleased>
                      <Link to="/game" onClick={() => onSelectGameId(id)}>
                        <Button>
                          More Info <img src={arrowSvg} alt="arrow svg" />
                        </Button>
                      </Link>
                    </GamesInfoBottom>
                  </GamesInfo>
                </GamesItem>
              ),
            )}
        </GamesMain>
      </Container>
    </GamesWrapper>
  );
};

export default Games;
