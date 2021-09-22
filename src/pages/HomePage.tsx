import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Categories } from '../components/Categories';
import { Games } from '../components/Games/Games';
import { Header } from '../components/Header';
import { Preloader } from '../components/Preloader';
import { SortBy } from '../components/SortBy';
import { auth } from '../config/firebase';

const HomePage = () => {
  const [loading] = useAuthState(auth);

  if (!loading) {
    return <Preloader />;
  }

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
