import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextPlugin from "gsap/TextPlugin";
import { useEffect, useRef, useState } from 'react';


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(TextPlugin)


const Loader = () => {


  return (
    <div className="h-[100vh] flex items-center justify-center overflow-y-hidden fixed w-[100%] z-999 bg-black">
      <h4 className="text-[2.5rem] md:text-[4.5rem] lg:text-[8rem] font-quantico font-black">Loding ...</h4>
    </div>
  )
}

export default Loader