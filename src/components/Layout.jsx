import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Lenis from 'lenis';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import '../Lenis.css';
import GrainOverlay from "./GrainOverlay";
import CustomCursor from "./CustomCursor";

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
            lenis.destroy();
        }
    }, [location]);

    return (
        <div className="bg-black overflow-hidden font-poppins max-w-screen box-border min-h-screen text-white relative uppercase mx-auto select-none md:cursor-none">
            <CustomCursor />
            <GrainOverlay />
            <div className="relative z-10 w-full">
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}

export default Layout;