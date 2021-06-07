import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../redux/store';
import { Auth, GameListsLink } from '.';
import socialLogout from '../service/logout';
import { setIsAuth } from '../redux/actions/user';
import userSvg from '../assets/images/user.svg';

interface IUserStyled {
  show: boolean;
}

const User = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state: RootState) => state.userReducer);
  const [visibleAuth, setVisibleAuth] = React.useState(false);

  const logout = async (e: React.MouseEvent) => {
    e.preventDefault();

    await socialLogout();
    dispatch(setIsAuth(false));
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
      <BlockOut ref={popupRef} show={visibleAuth}></BlockOut>
      <Auth show={visibleAuth} onVisible={handleVisibleAuth} />
      <UserWrapper>
        <GameListsLink />
        {isAuth ? (
          <UserInfo>
            <UserInfoLeft>
              <span>{user?.displayName}</span>
              <a href="/" onClick={(e) => logout(e)}>
                Logout
              </a>
            </UserInfoLeft>
            <img src={user?.photoURL} alt="user" />
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

const BlockOut = styled.div`
  position: fixed;
  visibility: ${(props: IUserStyled) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props: IUserStyled) => (props.show ? '1' : '0')};
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.7);
  transition: all 0.2s ease;
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

export default User;
