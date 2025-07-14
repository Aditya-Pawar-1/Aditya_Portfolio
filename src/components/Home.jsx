import React, { Suspense } from 'react';

import Loader from './Loader';
import Hero from './Hero';
const Intro = React.lazy(() => import('./Intro'));
const Drives = React.lazy(() => import('./Drives'));
import Pro from './Pro';
import Skills from './Skills';

const Home = () => {
  return (
      <div
        data-scroll
        data-scroll-speed="0.4"
      >
        <Loader />
        <Hero />
        <Intro />
        <Drives />
        <Skills />
        <Pro />
      </div>
  );
};

export default Home;
