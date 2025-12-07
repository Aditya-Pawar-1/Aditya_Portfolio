import React, { useState, Suspense } from 'react';
import Loader from './Loader';
import Hero from './Hero';
import Pro from './Pro';
import Skills from './Skills';

const Intro = React.lazy(() => import('./Intro'));
const Drives = React.lazy(() => import('./Drives'));

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
      <div
        data-scroll
        data-scroll-speed="0.4"
      >
        <Loader onLoaderComplete={() => setIsLoaded(true)} />
        
        <Hero startAnimation={isLoaded} />
        
        <Suspense fallback={null}>
            <Intro />
            <Drives />
        </Suspense>
        
        <Skills />
        <Pro />
      </div>
  );
};

export default Home;