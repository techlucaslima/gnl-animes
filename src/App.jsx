import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AnimePage from "./pages/AnimePage";
import Favorites from "./pages/Favorites";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const setAppHeight = () => {
        const vh = window.innerHeight;
        document.documentElement.style.setProperty('--app-height', `${vh}px`)
    };

    setAppHeight();
    window.addEventListener('resize', setAppHeight);
  }, []);

  return (
    <BrowserRouter>
    <div className="flex flex-col min-h-[var(--app-height)]">
      <Header />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/anime/:id" element={<AnimePage />}/>
        </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  )
}

export default App
