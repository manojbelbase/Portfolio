import { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";

// Lazy load components for better performance
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const Projects = lazy(() => import("./Pages/Projects").then(module => ({ default: module.Projects })));
const Contact = lazy(() => import("./Pages/Contact"));
const NotFound = lazy(() => import("./Pages/NotFound"));

const PageLoader = lazy(() => import("./Components/Loader/PageLoader"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
