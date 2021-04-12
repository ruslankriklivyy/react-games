import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Container } from '../App';

import downArrowSvg from '../assets/images/down-arrow.svg';
import { setOrderBy } from '../redux/gamesReducer';
import { RootState } from '../redux/store';

const SortByHandle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  top: 40px;
  left: 0;
  z-index: 10;
  width: 100%;
  min-height: 120px;
  background-color: #22272b;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;

  ul {
    margin: 0;
    padding: 10px 35px;
    li {
      letter-spacing: 1px;
      font-size: 17px;
      margin: 12px 0;
      opacity: 0.8;
      transition: all 0.2s ease;
      &:hover {
        opacity: 1;
      }
      &.active {
        color: #0581aa;
      }
    }
  }
`;

const sortByTypes = ['Metacritic', 'Released', 'Name', 'Rating'];

const SortBy = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: RootState) => state.gamesReducer.orderBy);
  const [visibleSortBy, setVisibleSortBy] = React.useState(false);

  const onSelectOrderType = (orderBy: string) => {
    dispatch(setOrderBy(orderBy));
  };

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
        {visibleSortBy && (
          <SortByBox>
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
        )}
      </SortByWrapper>
    </Container>
  );
};

export default SortBy;
