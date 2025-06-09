import Footer from "./Footer";
import { Outlet } from "react-router"
import Navbar from "./Navbar";
import Lenis from 'lenis'
import { useEffect } from "react";
import 'lenis/dist/lenis.css'

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
        <div className="bg-black font-poppins max-w-screen box-border min-h-screen text-white relative uppercase mx-auto select-none"
        >
            <div className='w-full h-full top-0 absolute z-10'>
                <Navbar />
            </div>
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout