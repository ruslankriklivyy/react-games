import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fetchGames, setCurrentPage, setGameId, setIsLoadingGames } from '../redux/gamesReducer';
import { RootState } from '../redux/store';

import { Container } from '../App';
import { GameItem, GameItemLoader, Paginator } from '.';
import scrollTop from '../utils/scrollTop';

const GamesWrapper = styled.div`
  margin-top: 80px;
  .react-reveal {
    width: 325px;
    height: 480px;
    margin-bottom: 25px;
  }
`;

const GamesMain = styled.div`
  display: flex !important;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Games = () => {
  const dispatch = useDispatch();
  const { items, orderBy, genreName, querySearch, currentPage, isLoadingGames } = useSelector(
    (state: RootState) => state.gamesReducer,
  );
  const totalCount = useSelector((state: RootState) => state.gamesReducer.items.count);

  const onSelectGameId = (id: number) => {
    dispatch(setGameId(id));
  };

  const onSelectPage = (page: number) => {
    dispatch(setCurrentPage(page));
    scrollTop();
  };

  React.useEffect(() => {
    dispatch(setIsLoadingGames(false));
    dispatch(fetchGames(genreName, querySearch, currentPage, orderBy));
    dispatch(setIsLoadingGames(true));
  }, [dispatch, genreName, querySearch, currentPage, orderBy]);

  return (
    <GamesWrapper>
      <Container>
        <GamesMain>
          {isLoadingGames
            ? items &&
              items.results &&
              items.results.map((obj) => <GameItem onSelectGameId={onSelectGameId} {...obj} />)
            : Array(20)
                .fill(0)
                .map((_, index) => <GameItemLoader key={index} />)}
        </GamesMain>
        <Paginator currentPage={currentPage} totalPages={totalCount} onSelectPage={onSelectPage} />
      </Container>
    </GamesWrapper>
  );
};

export default Games;
