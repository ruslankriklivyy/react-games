import React from 'react';
import ContentLoader from 'react-content-loader';

export const GameItemLoader = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={560}
    viewBox="0 0 400 560"
    backgroundColor="#22272B"
    foregroundColor="#353b3f">
    <rect x="0" y="0" rx="25" ry="25" width="325" height="440" />
  </ContentLoader>
);
