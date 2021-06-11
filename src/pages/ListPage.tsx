import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import firebase from 'firebase';

import { Container } from '../App';
import { removeItemToList, setList } from '../redux/actions/list';
import { Back, GameItem, Header } from '../components';
import { RootState } from '../redux/store';
import { auth } from '../config/firebase';
import { deleteGame } from '../service/games';
import { IGameItem } from '../interfaces/interfaces';

import removeSvg from '../assets/images/remove.svg';
import emptySvg from '../assets/images/empty.svg';
import { device } from '../utils/deviceMedia';

const ListPage = React.memo(() => {
  const dispatch = useDispatch();
  const { listItems } = useSelector((state: RootState) => state.listReducer);
  const items = Object.values(listItems);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      const db = firebase.firestore();
      db.collection('users')
        .doc(user?.uid)
        .get()
        .then((doc) => {
          const userArr: any = doc.data();
          if (userArr) {
            dispatch(setList(userArr['games']));
          }
        });
    });
  }, [dispatch]);

  const onRemoveItem = (id: number) => {
    deleteGame(id);
    dispatch(removeItemToList(id));
  };

  return (
    <>
      <Header />
      <ListPageWrapper>
        <Back />
        <Container>
          <ListPageBox>
            {items.length > 0 ? (
              items.map(
                (obj: IGameItem) =>
                  obj && (
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
                  ),
              )
            ) : (
              <Empty>
                <img src={emptySvg} alt="empty svg" />
              </Empty>
            )}
          </ListPageBox>
        </Container>
      </ListPageWrapper>
    </>
  );
});

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
  justify-content: flex-start;
  align-items: center;
`;

const GameWrapper = styled.div`
  width: 400px;
  margin-bottom: 50px;
  margin-left: 20px;
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
  @media ${device.desktopL} {
    img {
      width: 95%;
      height: 100%;
    }
  }
`;

export default ListPage;
