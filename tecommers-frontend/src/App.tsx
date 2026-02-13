import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import OffersPage from './pages/OffersPage';
// import ServicesPage from './pages/ServicesPage';
// import AboutPage from './pages/AboutPage';
// import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/offers" element={<OffersPage />} />
        {/* <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;