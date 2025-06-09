import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react"


gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuOpenRef = useRef();
  const menuRef = useRef();
  const navbarRef = useRef();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    window.scrollTo({ top: 0 });
  };

  useGSAP(() => {
    gsap.to(menuOpenRef.current, {
      height: `${isMenuOpen ? "85vh" : "0%"}`,
      display: `${isMenuOpen ? "block" : "hidden"}`,
      duration: 0.5,
    });

    gsap.to(navbarRef.current, {
      position: `${isMenuOpen ? "fixed" : "static"}`,
    });
  }, [isMenuOpen]);

  return (
    <div
      ref={navbarRef}
      className="h-[100vh] overflow-y-hidden w-full  flex flex-col max-w-screen justify-between items-start pointer-events-none"
    >
      <div
        ref={menuRef}
        className={`${isMenuOpen ? "bg-black" : "bg-transparent"
          } h-[15vh] w-full flex items-center justify-between pt-12 px-12`}
      >
        <img src="/assets/Favicon/logo.svg" alt="" />
        <button
          onClick={handleMenu}
          className="font-bold uppercase text-[1.2rem] md:text-[1.5rem] lg:text-[1rem] cursor-pointer pointer-events-auto"
        >
          {`${!isMenuOpen ? "menu" : "close"}`}
        </button>
      </div>
      <div ref={menuOpenRef} className="h-0 w-full bg-black pointer-events-auto">
        <div className="h-[85vh] flex flex-col justify-center mx-auto text-[8rem] w-[80vw]">
          <motion.div
            className="w-0 h-[20%] lg:h-full flex items-center justify-start"
            whileHover={{
              width: '100%',
              backgroundColor: 'white',
              color: 'black',
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          >
            <NavLink
              to="/"
              className="min-w-[80vw] border-b-2 border-white text-[2.5rem] md:text-[6rem] lg:text-[7rem] pl-8"
            >
              Projects
            </NavLink>
          </motion.div>
          <motion.div
            className="w-0 h-[20%] lg:h-full flex items-center justify-start"
            whileHover={{
              width: '100%',
              backgroundColor: 'white',
              color: 'black',
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          >
            <NavLink
              to="/"
              className="min-w-[80vw] border-b-2 border-white text-[2.5rem] md:text-[6rem] lg:text-[7rem] pl-8"
            >
              about
            </NavLink>
          </motion.div>
          <motion.div
            className="w-0 h-[20%] lg:h-full flex items-center justify-start"
            whileHover={{
              width: '100%',
              backgroundColor: 'white',
              color: 'black',
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          >
            <NavLink
              to="/"
              className="min-w-[80vw] border-b-2 border-white text-[2.5rem] md:text-[6rem] lg:text-[7rem] pl-8"
            >
              contact
            </NavLink>
          </motion.div>
        </div>
      </div>
    </div >
  );
};

export default Navbar;
