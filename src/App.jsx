import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./components/Home"
// import Projects from "./components/Project"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />}/>
          {/* <Route path='projects'  element={<Home />}/> */}
      </Route>
    </Routes>
  )
}

export default App