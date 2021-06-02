import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import backSvg from '../assets/images/back.svg';
import { device } from '../utils/deviceMedia';

const Back = () => {
  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };

  return (
    <BackWrapper>
      <button onClick={onBack}>
        <img src={backSvg} alt="back svg" />
      </button>
    </BackWrapper>
  );
};

const BackWrapper = styled.div`
  position: fixed;
  top: 25px;
  left: 0;
  z-index: 990;
  width: 50px;
  height: 45px;
  @media ${device.desktopM} {
    display: none;
  }

  button {
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: none;
    background-color: rgba(78, 79, 81, 0.4);
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    border-left: none;
    transition: all 0.2s ease;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

export default Back;
