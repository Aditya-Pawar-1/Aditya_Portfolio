import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from "react-router-dom";
import useIsMobile from '../hooks/useIsMobile';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {

  const isMobile = useIsMobile();
  const handleTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useGSAP(() => {
    gsap.from('.FooterChar', {
      scrollTrigger: {
        trigger: '.FooterChar',
        start: window.innerWidth > 980 ? '40% 80%' : '5% 80%',
        end: window.innerWidth > 980 ? '45% 80%' : '5% 80%',
        scrub: 4,
        ease: "power4.in",
        once: true,
      },
      opacity: 0,
      delay: 1,
      stagger: 0.1,
    })
  })

  return (
    <div className="h-[25vh] md:h-[40vh] lg:h-[60vh] border-t-2">
      <div className="h-[80%] border-b-2 flex">
        <div className="w-[85%] flex items-center justify-center">
          <div className="text-[5rem] md:text-[10rem] lg:text-[18rem] pb-5">
            <span className="FooterChar inline-block">a</span>
            <span className="FooterChar inline-block">d</span>
            <span className="FooterChar inline-block">i</span>
            <span className="FooterChar inline-block">t</span>
            <span className="FooterChar inline-block">y</span>
            <span className="FooterChar inline-block">a</span>
          </div>
        </div>
        <div className="w-[15%] text-[0.6rem] md:text[1.8rem] lg:text-base flex flex-col gap-2 justify-center cursor-pointer">
          <a
            href='mailto:aditya.pawar.dev@outlook.com'
          >
            email
          </a>
          <Link
            to='https://linkedin.com/in/aditya-pawar-dev'
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </Link>
          <Link
            to='https://github.com/Aditya-Pawar-1'
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </Link>
          <Link
            to='https://www.behance.net/adityapawar49'
            target="_blank"
            rel="noopener noreferrer"
          >
            behance
          </Link>
        </div>
      </div>
      <div className="h-[20%] flex items-center justify-between px-5 lg:px-15 ">
        <p className="text-[0.6rem] md:text[1.8rem] lg:text-base left-[5%] top-[40%]">All Rights Resevered © 2025</p>
        {isMobile ?
          <button onClick={handleTop} className="cursor-pointer text-[0.6rem] md:text[1.8rem] lg:text-base">BACK TO TOP</button>
          : <p className="text-[0.6rem] md:text[1.8rem] lg:text-base left-[70%] top-[40%]"> Crafted with - React • GSAP • Spline • Tailwind</p>
        }
      </div>
    </div>
  )
}

export default Footer