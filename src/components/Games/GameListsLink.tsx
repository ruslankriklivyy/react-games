import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../redux/store';

import gamesCart from '../../assets/images/games-cart.svg';
import { device } from '../../utils/deviceMedia';
import { auth } from '../../config/firebase';
import firebase from 'firebase';
import { setList } from '../../redux/actions/list';

export const GameListsLink = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.listReducer.listItems);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      const db = firebase.firestore();
      db.collection('users')
        .doc(user?.uid)
        .get()
        .then((doc) => {
          const userArr = doc.data();
          if (userArr) {
            dispatch(setList(userArr['games']));
          }
        })
        .catch((err) => alert(err));
    });
  }, [dispatch]);

  return (
    <GameLists>
      <Link to="/list">
        <img src={gamesCart} alt="games cart svg" />
        <span>{items?.length >= 0 ? items.length : 0}</span>
      </Link>
    </GameLists>
  );
};

const GameLists = styled.span`
  position: relative;
  font-size: 17px;
  margin-right: 25px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: transparent;
  border-radius: 20px;
  transition: all 0.2s ease;
  @media ${device.mobile} {
    margin-left: 20px;
  }
  &:hover {
    opacity: 0.8;
  }
  img {
    width: 25px;
    height: 25px;
  }
  span {
    position: absolute;
    top: -10px;
    left: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #22272b;
    width: 22px;
    height: 22px;
    border-radius: 100%;
    margin-left: 12px;
    color: #0581aa;
    font-size: 14px;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
`;
