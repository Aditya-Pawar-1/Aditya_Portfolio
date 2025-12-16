import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import useIsMobile from "../hooks/useIsMobile";

const ProCard = ({
  pathImg,
  pathVideo,
  heading,
  subheading,
  github,
  liveLink,
  behance,
  reverse,
  isMobileApp,
}) => {
  const isMobile = useIsMobile();
  const videoRef = useRef(null);
  const isVideoInView = useInView(videoRef, { amount: 0.3 });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (isVideoInView) {
        video.play().catch((error) => console.error("Video play failed:", error));
      } else {
        video.pause();
      }
    }
  }, [isVideoInView]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  const imgX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  const videoX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const videoY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const aspectRatioClass = isMobileApp
    ? "aspect-[9/16] w-2/3 md:w-1/2 mx-auto"
    : "aspect-video w-full";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""
        } items-center gap-8 lg:gap-20 my-4 lg:my-8 perspective-1000`}
    >

      <div className="w-full md:w-1/2 flex justify-center perspective-1000">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isMobile ? 0 : rotateX,
            rotateY: isMobile ? 0 : rotateY,
            transformStyle: "preserve-3d"
          }}
          className="group relative w-full rounded-2xl bg-white/5 border border-white/10 p-3 md:p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-white/20"
        >
          <motion.div
            animate={{ y: [-8, 8] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            className="w-full h-full relative"
          >
            <div
              className={`relative overflow-hidden rounded-xl bg-black/50 flex items-center justify-center ${aspectRatioClass}`}
            >
              {pathImg && <motion.img
                style={{ x: isMobile ? 0 : imgX, y: isMobile ? 0 : imgY, scale: 1.05 }}
                src={pathImg}
                alt={heading}
                className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />}
              {pathVideo && <motion.video
                ref={videoRef}
                style={{ x: isMobile ? 0 : videoX, y: isMobile ? 0 : videoY, scale: 1 }}
                src={pathVideo}
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
              />}
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left space-y-6">
        <div className="space-y-3">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            {heading}
          </h3>
          <div className="h-[2px] w-16 bg-gradient-to-r from-white to-neutral-500 rounded-full" />
        </div>

        <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
          {subheading}
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          {liveLink && <MagneticButton href={liveLink} label="Live Demo" icon="↗" />}
          {behance && <MagneticButton href={behance} label="Behance" icon="↗" />}
          {github && <MagneticButton href={github} label="GitHub" icon="↗" />}
        </div>
      </div>
    </motion.div>
  );
};

const MagneticButton = ({ href, label, icon }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="group relative px-6 py-3 rounded-xl bg-white/5 border border-white/10 overflow-hidden inline-block"
    >
      <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex items-center gap-2">
        <span className="text-sm font-medium text-white group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-xs text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
          {icon}
        </span>
      </div>
    </motion.a>
  );
};

export default ProCard;