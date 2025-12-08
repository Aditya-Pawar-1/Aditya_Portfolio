import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, lazy, useRef, useMemo } from "react";
import useIsDesktop from "../hooks/useIsDesktop";

gsap.registerPlugin(ScrollTrigger);

const HeroSpline = lazy(() => import("./HeroSpline"));

const Hero = ({ startAnimation }) => {
  const heading = useRef(null);
  const background = useRef(null);
  const mobileOrbRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const isDesktop = useIsDesktop();

  const xTo = useRef(null);
  const yTo = useRef(null);

  useGSAP(() => {
    if (!startAnimation) return;

    const tl = gsap.timeline();

    tl.from(".char", {
      y: "100%",
      rotateX: 90,
      opacity: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: "power4.out",
    }).from(
      ".hero-tagline",
      {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.8"
    );

    if (background.current) {
      gsap.to(background.current, {
        scrollTrigger: {
          trigger: background.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: "30%",
        opacity: 0.5,
        ease: "none",
      });
    }
  }, [startAnimation]);

  useGSAP(
    () => {
      if (isDesktop || !mobileOrbRef.current) return;

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(mobileOrbRef.current, {
        scale: 1.1,
        filter: "blur(60px)",
        duration: 4,
        ease: "sine.inOut",
      });

      gsap.to(".floating-shape", {
        y: -20,
        rotation: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    },
    { dependencies: [isDesktop] }
  );

  const handleTouchMove = (e) => {
    if (isDesktop || !xTo.current) return;
    const { clientX, clientY } = e.touches[0];
    const { innerWidth, innerHeight } = window;

    const x = (clientX - innerWidth / 2) * 0.5;
    const y = (clientY - innerHeight / 2) * 0.5;

    if (xTo.current) xTo.current(x);
    if (yTo.current) yTo.current(y);
  };

  const handleTouchEnd = () => {
    if (isDesktop || !xTo.current) return;
    if (xTo.current) xTo.current(0);
    if (yTo.current) yTo.current(0);
  };

  const memoizedSpline = useMemo(() => <HeroSpline />, []);

  return (
    <div
      ref={background}
      className="overflow-hidden bg-black h-screen w-full relative"
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="h-full w-full absolute top-0 left-0 z-0 scale-[1.25] origin-center pointer-events-auto">
        <Suspense fallback={<div className="h-full w-full bg-black" />}>
          {isDesktop ? (
            memoizedSpline
          ) : (
            <div
              ref={mobileContainerRef}
              className="relative h-full w-full overflow-hidden pointer-events-none"
            >
              <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150" />

              <div className="absolute inset-0 z-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/20 animate-pulse"
                    style={{
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                      width: `${Math.random() * 2 + 1}px`,
                      height: `${Math.random() * 2 + 1}px`,
                      animationDuration: `${Math.random() * 3 + 2}s`,
                    }}
                  />
                ))}
              </div>

              <div
                ref={mobileOrbRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] pointer-events-none will-change-transform"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/30 via-purple-500/20 to-transparent blur-[40px] animate-spin-slow" />
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[30px] mix-blend-overlay" />
                <div className="absolute -inset-10 rounded-full bg-blue-900/10 blur-[60px]" />
              </div>

              <div className="floating-shape absolute top-[25%] right-[10%] w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm z-10 hidden sm:block" />
              <div className="floating-shape absolute bottom-[30%] left-[10%] w-16 h-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm z-10" />
            </div>
          )}
        </Suspense>
      </div>

      <div className="flex flex-col z-50 h-full w-full pb-32 md:pb-4 text-white absolute items-center justify-center md:justify-end pointer-events-none">
        <div
          ref={heading}
          className="flex justify-center text-[18vw] md:text-[10rem] lg:text-[16rem] font-bold uppercase leading-none tracking-tighter"
        >
          {["a", "d", "i", "t", "y", "a"].map((char, i) => (
            <span
              key={i}
              className="char inline-block will-change-transform shadow-black drop-shadow-2xl"
            >
              {char}
            </span>
          ))}
        </div>

        <p className="hero-tagline mt-2 md:mt-6 text-[3vw] md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase text-white/70 font-light">
          CREATIVE &nbsp; <span className="text-blue-400">•</span> &nbsp;
          DEVELOPER
        </p>
      </div>
    </div>
  );
};

export default Hero;