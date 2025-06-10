import Drives from "./Drives";
import Hero from "./Hero";
import Intro from "./Intro";
import Loader from "./Loader";
// import Project from "./Project";
import Pro from "./Pro";

const Home = () => {
  return (
    <div
      data-scroll
      data-scroll-speed="0.4"
    >
      <Loader />
      <Hero />
      <Intro />
      <Drives />
      {/* <Project /> */}
      <Pro />
    </div>
  )
}

export default Home