import React from 'react';
import styled from 'styled-components';

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
`;

interface IButton {
  children: React.ReactChild | React.ReactNode;
}

const Button: React.FC<IButton> = ({ children }) => {
  return <ButtonMain>{children}</ButtonMain>;
};

export default Button;
