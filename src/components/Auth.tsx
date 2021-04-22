import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { githubProvider, googleProvider } from '../config/authMethods';
import socialMediaAuth from '../service/auth';
import { setIsAuth, setUser } from '../redux/actions/user';

import closeSvg from '../assets/images/close.svg';
import googleSvg from '../assets/images/google.svg';
import githubSvg from '../assets/images/github.svg';

const AuthWrapper = styled.div`
  visibility: ${(props: IAuthStyled) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props: IAuthStyled) => (props.show ? '1' : '0')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 25px;
  width: 400px;
  min-height: 200px;
  position: absolute;
  top: 80%;
  left: 50%;
  z-index: 600;
  transform: translate(-50%, 80%);
  border-radius: 20px;
  background-color: #22272b;
  transition: all 0.2s ease;
  h4 {
    font-weight: 500;
    text-align: center;
    font-size: 28px;
    opacity: 0.7;
  }
`;

const AuthLink = styled.button`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  font-weight: 500;
  font-size: 17px;
  color: #fff;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #fff;
    color: #22272b;
    img {
      transform: rotate(360deg);
    }
  }
  &:active {
    transform: translateY(5px);
  }
  img {
    width: 30px;
    height: 30px;
    margin-right: 15px;
    transition: all 0.3s ease;
  }
`;

const AuthClose = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 950;
  opacity: 0.6;
  cursor: pointer;
  background-color: transparent;
  border: none;
  outline: none;
  transition: all 0.1s ease;
  &:active {
    transform: translateY(5px);
  }
  &:hover {
    img {
      transform: rotate(90deg);
    }
  }
  img {
    display: block;
    width: 17px;
    height: 17px;
    transition: all 0.2s ease;
  }
`;

interface IAuthStyled {
  show: boolean;
}

interface IAuth {
  onVisible: () => void;
  show: boolean;
}

const Auth: React.FC<IAuth> = ({ onVisible, show }) => {
  const dispatch = useDispatch();

  const onHandleClick = async (provider: any) => {
    const res = await socialMediaAuth(provider);

    dispatch(setIsAuth(false));
    dispatch(setUser(res[0]));
    dispatch(setIsAuth(true));

    onVisible();
  };

  return (
    <AuthWrapper show={show}>
      <AuthClose onClick={() => onVisible()}>
        <img src={closeSvg} alt="close svg" />
      </AuthClose>
      <h4>Login</h4>
      <AuthLink onClick={() => onHandleClick(googleProvider)}>
        <img src={googleSvg} alt="google svg" />
        Sign in with google
      </AuthLink>
      <AuthLink onClick={() => onHandleClick(githubProvider)}>
        <img src={githubSvg} alt="github svg" />
        Sign in with github
      </AuthLink>
    </AuthWrapper>
  );
};

export default Auth;
