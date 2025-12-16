import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useIsMobile from '../hooks/useIsMobile';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.to(textRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef });


  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col justify-between py-10 px-6 md:px-20 border-t border-white/10">

      <div className="absolute inset-0 flex items-center justify-center opacity-30 md:opacity-10 pointer-events-none z-0">
        <h1 ref={textRef} className="text-[18vw] font-bold leading-none select-none whitespace-nowrap">
          ADITYA
        </h1>
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <FloatingPills />
      </div>

      <div className="relative z-20 w-full flex flex-col md:flex-row justify-between items-end gap-10 mt-auto h-full">

        <div className="flex flex-col gap-6 w-full md:w-auto">
          <div className="flex flex-col gap-2">
            <h3 className="text-gray-500 text-sm tracking-widest uppercase">Connect</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-lg font-light">
              <SocialLink href="mailto:aditya@pawaraditya.com">Email</SocialLink>
              <SocialLink href="https://linkedin.com/in/aditya-pawar-dev">LinkedIn</SocialLink>
              <SocialLink href="https://github.com/Aditya-Pawar-1">GitHub</SocialLink>
              <SocialLink href="https://www.behance.net/adityapawar49">Behance</SocialLink>
            </div>
          </div>
          <p className="text-gray-600 text-xs mt-4">© 2025 Aditya Pawar. All rights reserved.</p>
        </div>

        <div className="hidden md:flex w-full md:w-auto justify-end md:justify-center pr-10 pb-10">
          <GravityCube />
        </div>
      </div>
    </div>
  );
};

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white font-normal text-gray-400 transition-colors duration-300 relative group"
  >
    {children}
    <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
  </a>
)

const GravityCube = () => {
    const containerRef = useRef(null);
    const cubeRef = useRef(null);
    const floatRef = useRef(null);

    useGSAP(() => {
        const container = containerRef.current;
        const cube = cubeRef.current;
        const floatGroup = floatRef.current;

        gsap.to(floatGroup, {
            y: -20,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        const tumbleTween = gsap.to(cube, {
            rotationX: 360,
            rotationY: 360,
            duration: 20,
            repeat: -1,
            ease: "none"
        });

        const xTo = gsap.quickTo(container, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(container, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();
            
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.5);
            yTo(y * 0.5);
        };

        const handleMouseEnter = () => {
            tumbleTween.pause();
            gsap.to(cube, {
                rotationX: 0,
                rotationY: 0,
                scale: 1.1,
                duration: 0.8,
                ease: "back.out(1.7)"
            });
            gsap.to(floatGroup, { y: 0, duration: 0.5 }); 
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            
            gsap.to(cube, {
                scale: 1,
                duration: 0.5,
                onComplete: () => {
                    tumbleTween.play();
                }
            });

            gsap.to(floatGroup, {
                y: -20,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };

    }, { scope: containerRef });

    const faceBase = "absolute inset-0 flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]";
    
    return (
        <div ref={containerRef} className="perspective-[1000px] w-32 h-32 cursor-pointer pointer-events-auto z-50">
            <div ref={floatRef} className="w-full h-full">
                <div 
                    ref={cubeRef} 
                    className="w-full h-full relative [transform-style:preserve-3d]"
                >
                    <a href="mailto:aditya@pawaraditya.com" className={`${faceBase} translate-z-[64px] group`}>
                        <span className="text-white font-bold text-lg tracking-wider group-hover:scale-110 transition-transform">
                            Let's Talk
                        </span>
                    </a>

                    <div className={`${faceBase} -translate-z-[64px] rotate-y-180`}>
                        <span className="text-white/30 text-2xl">✉️</span>
                    </div>

                    <div className={`${faceBase} translate-x-[64px] rotate-y-90`}>
                        <span className="text-white/30">Get in touch</span>
                    </div>

                    <div className={`${faceBase} -translate-x-[64px] -rotate-y-90`}>
                        <span className="text-white/30">Connect</span>
                    </div>

                    <div className={`${faceBase} -translate-y-[64px] rotate-x-90`}></div>

                    <div className={`${faceBase} translate-y-[64px] -rotate-x-90`}></div>
                </div>
            </div>
        </div>
    );
};


const FloatingPills = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const tags = ["React", "GSAP", "Spline", "Tailwind", "JavaScript", "Creative"];

  useGSAP(() => {
    if (isMobile) return;
    const pills = gsap.utils.toArray('.tech-pill');

    pills.forEach((pill) => {
      gsap.set(pill, {
        x: gsap.utils.random(100, window.innerWidth - 100),
        y: gsap.utils.random(100, window.innerHeight / 2),
      });

      gsap.from(pill, {
        y: -500,
        opacity: 0,
        duration: 1.5,
        ease: "bounce.out",
        delay: gsap.utils.random(0, 0.5)
      });

      const drift = () => {
        let targetX = gsap.utils.random(0, window.innerWidth);
        let targetY = gsap.utils.random(0, window.innerHeight);

        if (targetX < 350 && targetY > window.innerHeight - 200) {
          targetX += 300;
          targetY -= 200;
        }

        if (targetX > window.innerWidth - 350 && targetY > window.innerHeight - 250) {
          targetX -= 300;
          targetY -= 200;
        }

        gsap.to(pill, {
          x: targetX,
          y: targetY,
          rotation: gsap.utils.random(-25, 25),
          duration: gsap.utils.random(6, 12),
          ease: "sine.inOut",
          onComplete: drift
        });
      };

      gsap.delayedCall(1.5, drift);
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      pills.forEach((pill) => {
        const rect = pill.getBoundingClientRect();
        const pillX = rect.left + rect.width / 2;
        const pillY = rect.top + rect.height / 2;

        const dx = clientX - pillX;
        const dy = clientY - pillY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = 250;

        if (distance < radius) {
          const angle = Math.atan2(dy, dx);
          const force = (radius - distance) / radius;
          const moveDistance = force * 60;

          gsap.to(pill, {
            x: `+=${Math.cos(angle) * -moveDistance}`,
            y: `+=${Math.sin(angle) * -moveDistance}`,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);

  }, { scope: containerRef });

  if (isMobile) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {tags.map((tag, i) => (
        <div
          key={i}
          className="tech-pill absolute px-5 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-md rounded-full text-white/90 border border-white/20 text-xs md:text-sm font-medium whitespace-nowrap pointer-events-auto hover:bg-white/20 transition-colors"
        >
          {tag}
        </div>
      ))}
    </div>
  );
};

export default Footer;