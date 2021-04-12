import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import backSvg from '../assets/images/back.svg';

const BackWrapper = styled.div`
  position: fixed;
  top: 25px;
  left: 0;
  z-index: 990;
  width: 130px;
  height: 45px;

  a {
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgba(78, 79, 81, 0.4);
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    border-left: none;
    font-size: 18px;
    color: #fff;
    transition: all 0.2s ease;
    &:hover {
      opacity: 1;
    }
  }
  img {
    margin-left: 20px;
    width: 20px;
    height: 20px;
  }
`;

const Back = () => {
  return (
    <BackWrapper>
      <Link to="/">
        Back
        <img src={backSvg} alt="back svg" />
      </Link>
    </BackWrapper>
  );
};

export default Back;
