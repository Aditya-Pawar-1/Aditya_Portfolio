import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Loader = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const counterRef = useRef({ value: 0 });

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(counterRef.current, {
      value: 100,
      duration: 3,
      ease: "power2.out",
      onUpdate: () => {
        if (textRef.current) {
          textRef.current.textContent = `${Math.round(counterRef.current.value)}%`;
        }
      },
    })
      .call(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          containerRef.current.style.display = "none";
        }
      });
  });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-end justify-end pb-10 pr-10 md:pb-20 md:pr-20 bg-black overflow-hidden"
    >
      <h4
        ref={textRef}
        className="text-[4rem] md:text-[6rem] lg:text-[10rem] font-mono font-bold text-white leading-none tracking-tighter"
      >
        0%
      </h4>
    </div>
  );
};

export default Loader;
