import React from 'react';
import { Route } from 'react-router';
import styled, { createGlobalStyle } from 'styled-components';

import { Categories, Games, Header } from './components';
import { GamePage } from './pages';

const GlobalStyles = createGlobalStyle`
*{
  box-sizing: border-box;
  font-family: 'Rubik', sans-serif;
}
  html, body {
    background-color: #1E1F21;
    color: #fff;
    margin: 0;
    padding: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  p {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  ul, li {
    list-style: none;
  }
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 15px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={Categories} />
        <Route exact path="/" component={Games} />
        <Route exact path="/game" component={GamePage} />
      </div>
    </>
  );
}

export default App;
