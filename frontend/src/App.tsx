import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './pages/CartContext';
import { ThemeProvider } from './pages/ThemeContext';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import OffersPage from './pages/OffersPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import RegisterPage from './pages/RegisterPage';
import Tecnologia from './pages/Tecnologia';
import Electrodomesticos from './pages/Electrodomesticos';
import Herramientas from './pages/Herramientas';
import MueblesHogar from './pages/MueblesHogar';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/categories/tecnologia" element={<Tecnologia />} />
            <Route path="/categories/electrodomesticos" element={<Electrodomesticos />} />
            <Route path="/categories/herramientas" element={<Herramientas />} />
            <Route path="/categories/muebles-hogar" element={<MueblesHogar />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </CartProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;