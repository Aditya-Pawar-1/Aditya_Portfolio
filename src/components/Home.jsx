import Drives from "./Drives";
import Hero from "./Hero";
import Intro from "./Intro";
import Loader from "./Loader";
import Project from "./Project";

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
      <Project />
    </div>
  )
}

export default Home