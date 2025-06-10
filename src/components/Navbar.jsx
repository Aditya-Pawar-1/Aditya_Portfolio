import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(useGSAP);

const Navbar = () => {
  ;
  const menuRef = useRef();
  const navbarRef = useRef();


  return (
    <div
      ref={navbarRef}
      className="max-h-[20vh] overflow-y-hidden flex max-w-screen justify-between items-center w-full top-0 absolute pointer-events-auto z-50 px-4 md:px-12"
    >
      <div
        ref={menuRef}
        className=' h-[15vh] flex items-center justify-center'
      >
        <img src="/assets/Favicon/logo.svg" alt="logo" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://github.com/Aditya-Pawar-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-[2rem]"
            src="assets/icons/github-142-svgrepo-com.svg"
            alt="github"
          />
        </a>

        <a
          href="mailto:your-pawaraditya200410@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-[2rem]"
            src="assets/icons/gmail-svgrepo-com.svg"
            alt="gmail"
          />
        </a>

        <a
          href="https://linkedin.com/in/aditya-pawar-dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-[2rem]"
            src="assets/icons/linkedin-round-svgrepo-com.svg"
            alt="linkedin"
          />
        </a>


      </div>
    </div >
  );
};

export default Navbar;