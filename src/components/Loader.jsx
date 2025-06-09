import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";
import { useEffect, useRef, useState } from 'react';


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(TextPlugin)


const Loader = () => {

  const num = useRef()
  const main = useRef()
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    if (progress === 100) {
      gsap.to(main.current, {
        height: 0,
        opacity: 0,
        display: 'none',
        duration: 1,
      });
    }
  }, [progress]);

  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 10);
      return () => {
        clearInterval(timer)
        window.scrollTo({ top: 0 });
      };
    }
  }, [progress]);

  return (
    <div ref={main} className="h-[100vh] flex items-center justify-center overflow-y-hidden fixed w-[100%] z-999 bg-black">
      <h4 ref={num} className="text-[2.5rem] md:text-[4.5rem] lg:text-[8rem] font-quantico">{progress}%</h4>
    </div>
  )
}

export default Loader