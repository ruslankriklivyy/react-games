import React from 'react';
import styled from 'styled-components';

interface IButton {
  children: React.ReactChild | React.ReactNode;
  onClick?: React.ReactEventHandler;
}

export const Button: React.FC<IButton> = ({ children, onClick }) => {
  return <ButtonMain onClick={onClick}>{children}</ButtonMain>;
};

const ButtonMain = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: #0581aa;
  padding: 10px;
  font-size: 15px;
  color: #fff;
  font-weight: 500;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.1s ease;
  &:active {
    transform: translateY(5px);
  }
`;
