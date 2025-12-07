import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const Loader = ({ onLoaderComplete }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const counterRef = useRef({ value: 0 });

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(counterRef.current, {
      value: 100,
      duration: 2.5,
      ease: "power3.inOut",
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.textContent = `${Math.round(counterRef.current.value)}%`;
        }
      },
    })
    .to(progressBarRef.current, {
        scaleX: 1,
        duration: 2.5,
        ease: "power3.inOut",
    }, "<")
    .call(() => {
        if (onLoaderComplete) onLoaderComplete();
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      delay: 0.2,
      onComplete: () => {
        gsap.set(containerRef.current, { display: "none" });
      }
    });
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-end justify-end bg-black text-white overflow-hidden"
    >
      <div className="pb-10 pr-10 md:pb-20 md:pr-20 overflow-hidden">
        <h4
            ref={textRef}
            className="text-[4rem] md:text-[6rem] lg:text-[10rem] font-bold leading-none tracking-tighter"
        >
            0%
        </h4>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20">
        <div 
            ref={progressBarRef} 
            className="h-full w-full bg-white origin-left scale-x-0" 
        />
      </div>
    </div>
  );
};

export default Loader;