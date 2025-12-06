import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useIsMobile from "../hooks/useIsMobile";

const CustomCursor = () => {
  const isMobile = useIsMobile();
  const cursorRef = useRef(null);
  const innerRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    if (isMobile) return;
    const cursor = cursorRef.current;
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3.out" });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a");

      setIsHovering(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile]);

  useGSAP(() => {
    if (isMobile) return;
    const inner = innerRef.current;
    const ring = ringRef.current;

    if (isHovering) {
      gsap.to(inner, {
        scale: 0.55,
        opacity: 0.9,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(ring, {
        scale: 1.7,
        opacity: 0.25,
        backdropFilter: "blur(6px)",
        duration: 0.25,
        ease: "power2.out",
      });
    } else {
      gsap.to(inner, {
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(ring, {
        scale: 1,
        opacity: 0.12,
        backdropFilter: "blur(3px)",
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isHovering, isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ willChange: "transform" }}
    >
      <div
        ref={ringRef}
        className="
          absolute inset-0
          w-[38px] h-[38px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full border border-white/25
          bg-white/5
          opacity-10
          backdrop-blur-md
        "
      />

      <div
        ref={innerRef}
        className="
          relative left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[6px] h-[6px]
          bg-white rounded-full
        "
      />
    </div>
  );
};

export default CustomCursor;