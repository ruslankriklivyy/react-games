import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import {
  fetchGames,
  setCurrentPage,
  setGameId,
  setIsLoadingGames,
} from '../../redux/actions/games';
import { RootState } from '../../redux/store';
import { Container } from '../../App';
import scrollTop from '../../utils/scrollTop';
import { device } from '../../utils/deviceMedia';
import { Paginator } from '../Paginator';
import { GameItemLoader } from './GameItemLoader';
import { GameItem } from './GameItem';

export const Games = React.memo(() => {
  const dispatch = useDispatch();
  const { items, orderBy, genreName, querySearch, currentPage, isLoadingGames } = useSelector(
    (state: RootState) => state.gamesReducer,
  );
  const totalCount = useSelector((state: RootState) => state.gamesReducer.items.count);
  const history = useHistory();

  const onSelectGameId = React.useCallback(
    (id: number) => {
      history.push(`game/${id}`);
      dispatch(setGameId(id));
    },
    [dispatch, history],
  );

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
            ? items.results?.map((obj) => (
                <GameItem key={obj.id} onSelectGameId={onSelectGameId} {...obj} />
              ))
            : Array(20)
                .fill(0)
                .map((_, index) => <GameItemLoader key={index} />)}
        </GamesMain>
        <Paginator currentPage={currentPage} totalPages={totalCount} onSelectPage={onSelectPage} />
      </Container>
    </GamesWrapper>
  );
});

const GamesWrapper = styled.div`
  margin-top: 80px;
  .react-reveal {
    width: 325px;
    height: 480px;
    margin-bottom: 25px;
    @media ${device.laptop} {
      width: 300px;
    }
    @media ${device.mobile} {
      width: 100%;
    }
  }
`;

const GamesMain = styled.div`
  display: flex !important;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;
