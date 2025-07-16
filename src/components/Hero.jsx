import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, lazy, useRef, useMemo } from "react";
import useIsDesktop from "../hooks/useIsDesktop";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const HeroSpline = lazy(() => import("./HeroSpline"));

const Hero = () => {
  const heading = useRef(null);
  const background = useRef(null);
  const isDesktop = useIsDesktop();

  useGSAP(() => {
    gsap.from(".char", {
      y: "50vh",
      rotateX: 180,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      delay: 0.75,
      ease: "cubicBezier(.71,-0.77,.43,1.67)",
    });

    gsap.to(background.current, {
      scrollTrigger: {
        trigger: background.current,
        start: "10% top",
        end: "10% top",
        scrub: 2,
      },
      scale: 0.8,
      duration: 1.5,
      ease: "cubic-bezier(0.65, 0.00, 0.45, 1.00)",
    });
  }, []);

  // Memoize to avoid remounting
  const memoizedSpline = useMemo(() => <HeroSpline />, []);

  return (
    <div ref={background} className="overflow-hidden">
      <div className="relative">
        <div className="flex flex-col z-2 h-full w-full pb-20 md:pb-4 text-white absolute items-center justify-end pointer-events-none">
          <div ref={heading} className="text-[6rem] md:text-[12rem] lg:text-[16rem] font-semibold uppercase">
            {["a", "d", "i", "t", "y", "a"].map((char, i) => (
              <span key={i} className="char inline-block">{char}</span>
            ))}
          </div>
          <p className="char hidden sm:block self-end mr-12">scroll</p>
        </div>

        <div className="h-[100vh] w-full scale-125 will-change-transform">
          <Suspense fallback={<div className="h-[100vh] w-full bg-black"></div>}>
            {isDesktop ? (
              memoizedSpline
            ) : (
              <div
                className="h-[100vh] w-full bg-[url('/assets/images/Hero_Background.jpg')] bg-repeat bg-contain"
                aria-label="Hero Mobile"
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Hero;
