import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { fetchGenres, setGenreName } from '../redux/gamesReducer';
import { RootState } from '../redux/store';

import { Container } from '../App';

const CategoriesWrapper = styled.div`
  padding-top: 120px;
`;

const CategoriesMenu = styled.div`
  background-color: #22272b;
  padding-top: 12px;
  border-radius: 5px;
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
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-weight: 500;
        font-size: 21px;
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
  margin-right: 25px;
  margin-bottom: 25px;
  border-radius: 7px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  ${(props: IProps) =>
    props.active ? 'border: 2px solid #0581aa' : 'border: 2px solid transparent'};
  &:hover {
    border: 2px solid #0581aa;
  }

  img {
    border-radius: 7px;
    display: block;
    object-fit: cover;
    opacity: 0.3;
    width: 100%;
    height: 100%;
  }
`;

interface IProps {
  active: boolean;
}

const Categories = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state: RootState) => state.gamesReducer.genres);
  const genreName = useSelector((state: RootState) => state.gamesReducer.genreName);

  const onSelectGenre = (genreName: string, e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setGenreName(genreName.toLowerCase().replace(/\s+/g, '')));
  };

  React.useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <CategoriesWrapper>
      <Container>
        <CategoriesMenu>
          <ul>
            {genres &&
              genres.results &&
              genres.results.map(({ name, id, image_background }) => (
                <li key={id}>
                  <CategoriesItem
                    active={genreName?.toLowerCase() === name.toLowerCase() ? true : false}
                    onClick={(e: React.MouseEvent) => onSelectGenre(name, e)}>
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
};

export default Categories;
