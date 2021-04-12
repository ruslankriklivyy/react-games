import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Container } from '../App';
import { removeItemToList } from '../redux/listReducer';
import { Back, GameItem } from '../components';
import { RootState } from '../redux/store';

import removeSvg from '../assets/images/remove.svg';
import emptySvg from '../assets/images/empty.svg';

const RemoveItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 20px;
  width: 40px;
  height: 40px;
  background-color: #22272b;
  visibility: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transition: all 0.2s ease;
  opacity: 0.5;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
  }
`;

const ListPageWrapper = styled.div`
  padding-top: 140px;
`;

const ListPageBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const GameWrapper = styled.div`
  width: 400px;
  position: relative;
  .react-reveal {
    height: 480px;
  }
  &:hover {
    ${RemoveItem} {
      visibility: visible;
      top: -40px;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

const Empty = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  img {
    display: block;
    margin: 0 auto;
    width: 600px;
    height: 700px;
  }
`;

const ListPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.listReducer.listItems);

  const onRemoveItem = (id: number) => {
    dispatch(removeItemToList(id));
  };

  return (
    <ListPageWrapper>
      <Back />
      <Container>
        <ListPageBox>
          {items.length > 0 ? (
            items.map((obj) => (
              <GameWrapper key={obj.id}>
                <RemoveItem onClick={() => onRemoveItem(obj.id)}>
                  <img src={removeSvg} alt="remove svg" />
                </RemoveItem>
                <GameItem
                  id={obj.id}
                  background_image={obj.background_image}
                  name={obj.name}
                  rating={obj.rating}
                  released={obj.released}
                  parent_platforms={obj.parent_platforms}
                />
              </GameWrapper>
            ))
          ) : (
            <Empty>
              <img src={emptySvg} alt="empty svg" />
            </Empty>
          )}
        </ListPageBox>
      </Container>
    </ListPageWrapper>
  );
};

export default ListPage;
