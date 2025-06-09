import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Suspense, useRef } from 'react';
import { lazy } from 'react';
const HeroSpline = lazy(() => import('./HeroSpline'));

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  const heading = useRef(null);
  const background = useRef(null);

  useGSAP(() => {
    gsap.from(".char", {
      y: '50vh',
      rotateX: 180,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      delay: 2.25,
      // ease: "bounce.out",
      easing: 'cubicBezier(.71,-0.77,.43,1.67)'
    },)

    gsap.to(background.current, {
      scrollTrigger: {
        trigger: background.current,
        start: '10% top',
        end: '10% top',
        scrub: 2,
        // markers: true
      },
      scale: 0.8,
      duration: 1.5,
      ease: "cubic-bezier(0.65, 0.00, 0.45, 1.00)",
    })
  })

  return (
    <div
      ref={background}
      className="overflow-hidden">
      <div
        className='relative'>
        <div className="flex flex-col z-2 h-full w-full pb-4 text-white absolute items-center justify-end pointer-events-none">
          <div ref={heading} className='text-[6rem] md:text-[12rem] lg:text-[16rem] font-semibold uppercase'>
            <span className="char inline-block">a</span>
            <span className="char inline-block">d</span>
            <span className="char inline-block">i</span>
            <span className="char inline-block">t</span>
            <span className="char inline-block">y</span>
            <span className="char inline-block">a</span>
          </div>
          <p className='self-end mr-12'>scroll</p>
        </div>
        <div className='h-[100vh] w-full scale-125'>
          <Suspense>
            <HeroSpline />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Home;