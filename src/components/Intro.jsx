import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import useIsMobile from "../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const root = useRef(null);
  const section = useRef(null);
  const labelRef = useRef(null);
  const lineRef = useRef(null);
  const headingBlockRef = useRef(null);
  const subheadingRef = useRef(null);
  const visualContainerRef = useRef(null);
  const mainCardRef = useRef(null);
  const floatCard1Ref = useRef(null);
  const floatCard2Ref = useRef(null);
  const glowRef = useRef(null);

  const isMobile = useIsMobile();

  useGSAP(() => {
    const tl = gsap.timeline();
    const lines = headingBlockRef.current?.querySelectorAll(".intro-line");

    tl.from(labelRef.current, {
      opacity: 0,
      y: 16,
      duration: 0.45,
      ease: "power3.out",
    }).from(lineRef.current, {
      width: "0%",
      duration: 0.6,
      ease: "power3.inOut",
    }, "<");

    if (lines?.length) {
      tl.from(lines, {
        y: "115%",
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "expo.out",
      }, "-=0.15");
    }

    tl.from(subheadingRef.current, {
      opacity: 0,
      y: 14,
      duration: 0.55,
      ease: "power3.out",
    }, "-=0.25");

    tl.from(visualContainerRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power3.out",
    }, "-=0.8");

    tl.from([floatCard1Ref.current, floatCard2Ref.current], {
      scale: 0,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: "back.out(1.7)",
    }, "-=0.5");
  }, { scope: root });

  useGSAP(() => {
    if (isMobile) return;

    gsap.to(mainCardRef.current, {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(floatCard1Ref.current, {
      y: -25,
      x: 5,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.5
    });

    gsap.to(floatCard2Ref.current, {
      y: 20,
      x: -5,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });

    gsap.to(glowRef.current, {
      opacity: 0.6,
      scale: 1.2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: root, dependencies: [isMobile] });

  useGSAP(() => {
    if (isMobile) return;

    const container = visualContainerRef.current;
    const main = mainCardRef.current;
    const float1 = floatCard1Ref.current;
    const float2 = floatCard2Ref.current;
    const glow = glowRef.current;

    const resetState = () => {
      gsap.to([main, glow], { rotationX: 0, rotationY: 0, x: 0, y: 0, duration: 0.6, ease: "power3.out" });
      gsap.to([float1, float2], { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
    };

    const handleMouseEnter = () => {
      gsap.to(container, { scale: 1.02, duration: 0.3, ease: "power3.out" });
      gsap.to(glow, { opacity: 0.9, duration: 0.4, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(glow, { opacity: 0.6, duration: 0.4, ease: "power3.out" });
      resetState();
    };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const xNorm = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const yNorm = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      gsap.to(main, {
        rotationY: xNorm * 10,
        rotationX: -yNorm * 10,
        transformPerspective: 1000,
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(glow, { x: xNorm * 10, y: yNorm * 10, duration: 0.6, ease: "power3.out" });
      gsap.to(float1, { x: -xNorm * 18, y: -yNorm * 18, duration: 0.6, ease: "power3.out" });
      gsap.to(float2, { x: xNorm * 14, y: yNorm * 14, duration: 0.6, ease: "power3.out" });
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: root, dependencies: [isMobile] });

  const handleMouseEnterHeading = (e) =>
    gsap.to(e.currentTarget, { scale: 1.02, x: 10, duration: 0.3, ease: "power3.out" });

  const handleMouseLeaveHeading = (e) =>
    gsap.to(e.currentTarget, { scale: 1, x: 0, duration: 0.3, ease: "power3.out" });

  return (
    <section
      ref={root}
      className="relative min-h-[100vh] w-full overflow-hidden bg-[url(public/assets/images/10016491_27230.svg)] bg-no-repeat bg-top text-white perspective-[1000px]"
    >
      <div
        ref={section}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col lg:flex-row items-center justify-center gap-12 px-6 pt-32 pb-20 lg:px-8 lg:py-0 lg:h-screen"
      >
        <div className="w-full lg:w-1/2 space-y-8 z-20">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <p ref={labelRef} className="uppercase tracking-[0.25em] text-xs font-medium text-indigo-300">
                who am i?
              </p>
              <div ref={lineRef} className="h-[1px] w-24 bg-indigo-500/50" />
            </div>

            <div
              ref={headingBlockRef}
              onMouseEnter={handleMouseEnterHeading}
              onMouseLeave={handleMouseLeaveHeading}
              className="select-none group"
            >
              <div className="overflow-hidden">
                <h1 className="intro-line inline-block text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-bold leading-[1] tracking-tight">
                  <span
                    className="text-white transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#e5e5e5] group-hover:to-[#b3b3b3] group-hover:bg-clip-text group-hover:text-transparent group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
                  >
                    UI/UX
                  </span>{" "}
                  <span className="text-slate-300 font-semibold">designer</span>
                </h1>
              </div>

              <div className="overflow-hidden">
                <h1 className="intro-line inline-block text-[2.5rem] md:text-[4rem] lg:text-[5rem] font-bold leading-[1] tracking-tight">
                  <span className="text-slate-300 font-semibold">&amp; MERN</span>{" "}
                  <span
                    className="text-white transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#e5e5e5] group-hover:to-[#b3b3b3] group-hover:bg-clip-text group-hover:text-transparent group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
                  >
                    developer
                  </span>
                </h1>
              </div>
            </div>
          </div>

          <p
            ref={subheadingRef}
            className="max-w-lg text-sm md:text-base text-slate-400 leading-relaxed"
          >
            I bridge the gap between <span className="text-white font-medium">design</span> and{" "}
            <span className="text-white font-medium">engineering</span>. I build pixel-perfect, engaging, and accessible digital experiences using modern architecture.
          </p>
        </div>

        <div className="w-full lg:w-1/2 relative flex items-center justify-center h-[50vh] lg:h-auto">
          <div
            ref={visualContainerRef}
            className="relative w-[300px] md:w-[400px] aspect-square flex items-center justify-center cursor-pointer"
          >
            <div ref={glowRef} className="absolute inset-0 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />

            <div
              ref={floatCard1Ref}
              className="absolute -top-6 -left-8 md:-left-12 z-30 w-32 md:w-40 p-3 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl"
            >
              <div className="flex gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="space-y-1.5 opacity-60">
                <div className="h-1.5 w-3/4 bg-slate-400 rounded-full" />
                <div className="h-1.5 w-1/2 bg-indigo-400 rounded-full" />
                <div className="h-1.5 w-2/3 bg-slate-400 rounded-full" />
              </div>
            </div>

            <div
              ref={mainCardRef}
              className="relative z-20 w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] bg-[#0a0a0a]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src="/assets/images/Intro_Background.jpg"
                alt="Abstract Design"
                className="h-full w-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay" />
            </div>

            <div
              ref={floatCard2Ref}
              className="absolute -bottom-8 -right-4 md:-right-10 z-30 w-28 md:w-32 h-32 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center shadow-2xl"
            >
              <div className="text-center">
                <span className="block text-2xl">🎨</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 mt-1">
                  Design
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Intro;