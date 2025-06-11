import React, { Suspense } from 'react';

// Lazy load components
const Loader = React.lazy(() => import('./Loader'));
const Hero = React.lazy(() => import('./Hero'));
const Intro = React.lazy(() => import('./Intro'));
const Drives = React.lazy(() => import('./Drives'));
const Pro = React.lazy(() => import('./Pro'));
// const Project = React.lazy(() => import('./Project')); // Uncomment if needed

const Home = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
};

export default Home;
