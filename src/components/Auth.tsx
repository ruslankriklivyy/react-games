import React from 'react';
import styled from 'styled-components';
import firebase from '../config/firebase';

import { githubProvider, googleProvider } from '../config/authMethods';
import socialMediaAuth from '../service/auth';

import googleSvg from '../assets/images/google.svg';
import githubSvg from '../assets/images/github.svg';
import { device } from '../utils/deviceMedia';
import { createUser } from '../service/games';

export const Auth = () => {
  const onHandleClick = async (provider: firebase.auth.AuthProvider) => {
    await socialMediaAuth(provider);
    createUser();
  };

  return (
    <AuthWrapper>
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

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px 25px 20px 25px;
  width: 400px;
  min-height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 600;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: #22272b;
  transition: all 0.2s ease;
  h4 {
    font-weight: 500;
    text-align: center;
    font-size: 28px;
    opacity: 0.7;
  }
  @media ${device.desktopL} {
    width: 95%;
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
