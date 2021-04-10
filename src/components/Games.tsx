import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fetchGames, setGameId } from '../redux/gamesReducer';
import { RootState } from '../redux/store';

import { Container } from '../App';
import { GameItem } from '.';

const GamesWrapper = styled.div`
  margin-top: 80px;
`;

const GamesMain = styled.div`
  display: flex !important;
  flex-wrap: wrap;
  align-items: center;
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
            items.results.map((obj) => <GameItem onSelectGameId={onSelectGameId} {...obj} />)}
        </GamesMain>
      </Container>
    </GamesWrapper>
  );
};

export default Games;
