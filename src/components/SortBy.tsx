import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { setOrderBy } from '../redux/actions/games';
import { RootState } from '../redux/store';
import { Container } from '../App';
import downArrowSvg from '../assets/images/down-arrow.svg';
interface SortByStylesProps {
  show: boolean;
}

const sortByTypes = ['Metacritic', 'Released', 'Name', 'Rating'];

export const SortBy = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.gamesReducer.orderBy);
  const [visibleSortBy, setVisibleSortBy] = React.useState(false);

  const onSelectOrderType = React.useCallback(
    (orderBy: string) => {
      dispatch(setOrderBy(orderBy));
    },
    [dispatch],
  );

  const popupRef = React.useRef<HTMLDivElement>(null);
  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setVisibleSortBy(false);
      }
    },
    [setVisibleSortBy],
  );
  const clickListener = React.useCallback(
    (e) => {
      if (!e.path.includes(popupRef.current)) {
        setVisibleSortBy(false);
      }
    },
    [setVisibleSortBy],
  );
  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  return (
    <Container>
      <SortByWrapper ref={popupRef} onClick={() => setVisibleSortBy(!visibleSortBy)}>
        <SortByHandle>
          <SortByType>
            <span>Sort by:</span> {sortBy}
          </SortByType>
          <img src={downArrowSvg} className={visibleSortBy ? 'active' : ''} alt="down arrow svg" />
        </SortByHandle>
        <SortByBox show={visibleSortBy}>
          <ul>
            {sortByTypes.map((name, index) => (
              <li
                key={index}
                className={name === sortBy ? 'active' : ''}
                onClick={() => onSelectOrderType(name)}>
                {name}
              </li>
            ))}
          </ul>
        </SortByBox>
      </SortByWrapper>
    </Container>
  );
};

const SortByHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 30px;
`;

const SortByWrapper = styled.div`
  position: relative;
  margin-left: auto;
  width: 235px;
  height: 55px;
  border-radius: 15px;
  background-color: #22272b;
  cursor: pointer;

  img {
    display: block;
    width: 22px;
    height: 22px;
    margin-left: 15px;
    transition: all 0.2s ease;
    &.active {
      transform: rotate(-180deg);
    }
  }
`;

const SortByType = styled.div`
  position: relative;
  z-index: 20;
  letter-spacing: 1px;
  font-size: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 14px;
    opacity: 0.7;
    margin-right: 10px;
  }
`;

const SortByBox = styled.div`
  position: absolute;
  left: 0;
  z-index: 10;
  width: 100%;
  top: 40px;
  background-color: #22272b;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  transition: all 0.3s ease;
  ${(props: SortByStylesProps) => (props.show ? 'height: 160px;' : 'height: 0;')};

  ul {
    margin: 0;
    padding: 10px 35px;
    ${(props: SortByStylesProps) => (props.show ? 'visibility: visible;' : 'visibility: hidden')};
    li {
      letter-spacing: 1px;
      font-size: 17px;
      margin: 12px 0;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
      &.active {
        color: #0581aa;
      }
    }
  }
`;
