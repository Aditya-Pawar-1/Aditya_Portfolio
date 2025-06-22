import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, TextPlugin);

const Loader = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(textRef.current, {
      duration: 1.5,
      text: "Loading ...",
      ease: "power1.inOut",
    })

      .call(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
      })

      .to(containerRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      }, "+=0.3");
  });

  return (
    <div
      ref={containerRef}
      className="h-[100vh] flex items-center justify-center overflow-y-hidden fixed w-full z-[999] bg-black"
    >
      <h4
        ref={textRef}
        className="text-[2.5rem] md:text-[4.5rem] lg:text-[8rem] font-quantico font-black text-white"
      />
    </div>
  );
};

export default Loader;
