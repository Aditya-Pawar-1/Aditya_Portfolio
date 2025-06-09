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
      className="max-h-[20vh] overflow-y-hidden flex max-w-screen justify-between items-start"
    >
      <div
        ref={menuRef}
        className=' h-[15vh] flex items-center justify-between pt-12 px-12'
      >
        <img src="/assets/Favicon/logo.svg" alt="logo" />
      </div>
      <div className="flex pt-12 px-12 gap-4">
        <a
          href="https://github.com/Aditya-Pawar-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-[5vh]"
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
            className="h-[5vh]"
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
            className="h-[5vh]"
            src="assets/icons/linkedin-round-svgrepo-com.svg"
            alt="linkedin"
          />
        </a>


      </div>
    </div >
  );
};

export default Navbar;