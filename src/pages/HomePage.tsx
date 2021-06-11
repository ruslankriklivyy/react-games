import React from 'react';
import { Categories, Games, Header, SortBy } from '../components';

const HomePage = () => {
  return (
    <>
      <Header />
      <Categories />
      <SortBy />
      <Games />
    </>
  );
};

export default HomePage;
