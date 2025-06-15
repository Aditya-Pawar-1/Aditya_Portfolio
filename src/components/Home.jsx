import React, { Suspense } from 'react';

import Loader from './Loader';
import Hero from './Hero';
const Intro = React.lazy(() => import('./Intro'));
const Drives = React.lazy(() => import('./Drives'));
import Pro from './Pro';
// const Project = React.lazy(() => import('./Project')); // Uncomment if needed

const Home = () => {
  return (
    // <Suspense fallback={<Loader />}>
      <div
        data-scroll
        data-scroll-speed="0.4"
      >
        <Loader />
        <Hero />
        <Intro />
        <Drives />
        {/* <Project /> */}
        <Pro />
      </div>
    // </Suspense>
  );
};

export default Home;
