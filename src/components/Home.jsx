import React, { Suspense } from 'react';

const Loader = React.lazy(() => import('./Loader'));
const Hero = React.lazy(() => import('./Hero'));
const Intro = React.lazy(() => import('./Intro'));
const Drives = React.lazy(() => import('./Drives'));
import Pro from './Pro';
// const Project = React.lazy(() => import('./Project')); // Uncomment if needed

const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div
        data-scroll
        data-scroll-speed="0.4"
      >

        <Hero />
        <Intro />
        <Drives />
        {/* <Project /> */}
        <Pro />
      </div>
    </Suspense>
  );
};

export default Home;
