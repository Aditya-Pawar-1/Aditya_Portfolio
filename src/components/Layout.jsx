import { useEffect } from "react";
import { Outlet } from "react-router"
import Navbar from "./Navbar";
import Footer from "./Footer";
import Lenis from 'lenis'
import '../Lenis.css'

const Layout = () => {

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, [])

    return (
        <div className="bg-black overflow-hidden font-poppins max-w-screen box-border min-h-screen text-white relative uppercase mx-auto select-none"
        >
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout