import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Portfolio from './pages/Portfolio';
import Homepage2 from './pages/Homepage2';
import JujuStorytellers from './pages/JujuStorytellers';
import JujuAIFilms from './pages/JujuAIFilms';

// Import Styles
import './styles/home-style.css';
import './styles/home-style-2.css';
import './styles/style.css';
import './styles/style2.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home2" element={<Homepage2 />} />
          <Route path="/juju-storytellers" element={<JujuStorytellers />} />
          <Route path="/juju-ai-films" element={<JujuAIFilms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
