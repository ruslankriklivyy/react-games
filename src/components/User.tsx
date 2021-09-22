import React from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';

import socialLogout from '../service/logout';
import userSvg from '../assets/images/user.svg';
import { auth } from '../config/firebase';
import { GameListsLink } from './Games/GameListsLink';

export const User = () => {
  const [visibleAuth, setVisibleAuth] = React.useState(false);
  const [user] = useAuthState(auth);

  const logout = async (e: React.MouseEvent) => {
    e.preventDefault();

    await socialLogout();
  };

  const handleVisibleAuth = React.useCallback(() => {
    setVisibleAuth(!visibleAuth);
  }, [visibleAuth]);

  const popupRef = React.useRef<HTMLHeadingElement>(null);
  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        handleVisibleAuth();
      }
    },
    [handleVisibleAuth],
  );
  const clickListener = React.useCallback(
    (e) => {
      if (
        e.target.className &&
        popupRef.current &&
        e.target.className === popupRef.current.className
      ) {
        handleVisibleAuth();
      }
    },
    [handleVisibleAuth],
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
    <>
      <UserWrapper>
        <GameListsLink />
        {user ? (
          <UserInfo>
            <UserInfoLeft>
              <span>{user?.displayName}</span>
              <a href="/" onClick={(e) => logout(e)}>
                Logout
              </a>
            </UserInfoLeft>
            <img src={user.photoURL || ''} alt="user" />
          </UserInfo>
        ) : (
          <button onClick={() => handleVisibleAuth()}>
            <img src={userSvg} alt="user svg" />
          </button>
        )}
      </UserWrapper>
    </>
  );
};

const UserInfoLeft = styled.div`
  a {
    display: block;
    color: #fff;
    background-color: transparent;
    border: none;
    width: 30px;
    margin-right: left;
    font-size: 14px;
    opacity: 0.7;
    letter-spacing: 1px;
  }
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    width: 33px;
    height: 33px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
      opacity: 0.8;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
    opacity: 0.8;
    font-size: 18px;
    letter-spacing: 1px;
  }
  img {
    margin: 0 auto;
    border-radius: 20px;
    width: 47px;
    height: 47px;
    display: block;
  }
`;
