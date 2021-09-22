import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fetchGenres, setGenreName } from '../redux/actions/games';
import { RootState } from '../redux/store';

import { Container } from '../App';

interface IProps {
  active: boolean;
}

export const Categories = React.memo(() => {
  const dispatch = useDispatch();
  const genres = useSelector((state: RootState) => state.gamesReducer.genres);
  const genreName = useSelector((state: RootState) => state.gamesReducer.genreName);

  const onSelectGenre = React.useCallback(
    (genreName: string, e: React.MouseEvent) => {
      e.preventDefault();
      dispatch(setGenreName(genreName));
    },
    [dispatch],
  );

  React.useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <CategoriesWrapper>
      <Container>
        <CategoriesMenu>
          <ul>
            {genres &&
              genres.results?.map(({ name, id, slug, image_background }) => (
                <li key={id}>
                  <CategoriesItem
                    active={genreName?.toLowerCase() === name.toLowerCase() ? true : false}
                    onClick={(e: React.MouseEvent) => onSelectGenre(slug, e)}>
                    <img src={image_background} alt="genre img" />
                    <a href="/">{name}</a>
                  </CategoriesItem>
                </li>
              ))}
          </ul>
        </CategoriesMenu>
      </Container>
    </CategoriesWrapper>
  );
});

const CategoriesWrapper = styled.div`
  padding-top: 120px;
`;

const CategoriesMenu = styled.div`
  background-color: #22272b;
  padding-top: 12px;
  border-radius: 25px;
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    li {
      a {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 5;
        width: 100%;
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 500;
        font-size: 18px;
        opacity: 0.8;
        transition: all 0.2s ease;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;

const CategoriesItem = styled.div`
  position: relative;
  width: 150px;
  height: 55px;
  margin-right: 12px;
  margin-left: 12px;
  margin-bottom: 24px;
  border-radius: 25px;
  transition: all 0.1s ease;
  ${(props: IProps) =>
    props.active ? 'border: 2px solid #0581aa' : 'border: 2px solid transparent'};

  &:hover {
    border: 2px solid #0581aa;
  }
  &:active {
    transform: translateY(5px);
  }

  img {
    border-radius: 25px;
    display: block;
    object-fit: cover;
    opacity: 0.3;
    width: 100%;
    height: 100%;
  }
`;
