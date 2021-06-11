import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Categories, Games, Header, SortBy } from '../components';
import { auth } from '../config/firebase';
import { Preloader } from '../components';

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
