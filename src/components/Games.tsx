import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fetchGames, setCurrentPage, setGameId } from '../redux/gamesReducer';
import { RootState } from '../redux/store';

import { Container } from '../App';
import { GameItem, Paginator } from '.';
import scrollTop from '../utils/scrollTop';

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
  const totalCount = useSelector((state: RootState) => state.gamesReducer.items.count);
  const genreName = useSelector((state: RootState) => state.gamesReducer.genreName);
  const querySearch = useSelector((state: RootState) => state.gamesReducer.querySearch);
  const currentPage = useSelector((state: RootState) => state.gamesReducer.currentPage);

  const onSelectGameId = (id: number) => {
    dispatch(setGameId(id));
  };

  const onSelectPage = (page: number) => {
    dispatch(setCurrentPage(page));
    scrollTop();
  };

  React.useEffect(() => {
    dispatch(fetchGames(genreName, querySearch, currentPage));
  }, [dispatch, genreName, querySearch, currentPage]);

  return (
    <GamesWrapper>
      <Container>
        <GamesMain>
          {items &&
            items.results &&
            items.results.map((obj) => <GameItem onSelectGameId={onSelectGameId} {...obj} />)}
        </GamesMain>
        <Paginator currentPage={currentPage} totalPages={totalCount} onSelectPage={onSelectPage} />
      </Container>
    </GamesWrapper>
  );
};

export default Games;
