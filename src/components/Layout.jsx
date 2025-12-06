import { useEffect } from "react";
import { Outlet } from "react-router"
import Navbar from "./Navbar";
import Footer from "./Footer";
import Lenis from 'lenis'
import '../Lenis.css'

import GrainOverlay from "./GrainOverlay";
import CustomCursor from "./CustomCursor";

const Layout = () => {

    useEffect(() => {
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

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, [])

    return (
        <div className="bg-black overflow-hidden font-poppins max-w-screen box-border min-h-screen text-white relative uppercase mx-auto select-none md:cursor-none"
        >
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

export default Layout