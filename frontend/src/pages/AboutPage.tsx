import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const AboutPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const categories = [
    { id: 'electrodomesticos', name: 'Electrodomésticos', icon: 'devices' },
    { id: 'muebles-hogar', name: 'Muebles y Hogar', icon: 'chair' },
    { id: 'tecnologia', name: 'Tecnología', icon: 'computer' },
    { id: 'herramientas', name: 'Herramientas', icon: 'build' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= NAVBAR PRINCIPAL ================= */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 h-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <svg className="h-10 w-auto" viewBox="0 0 160 120">
              <path d="M10 20H80L65 50H45L30 110H10L25 50H10V20Z" fill="#cf2e2e" />
              <path d="M50 55H78L75 73H47L50 55Z" fill="black" />
              <path d="M43 85H71L68 103H40L43 85Z" fill="#cf2e2e" />
            </svg>
            <span className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a] -ml-3">
              TECOMMERS
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors text-sm py-2">
              Home
            </Link>
            <Link to="/categories" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors text-sm py-2">
              Categorías
            </Link>
            <Link to="/offers" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors text-sm py-2">
              Ofertas
            </Link>
            <Link to="/services" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors text-sm py-2">
              Servicios
            </Link>
            <Link to="/about" className="text-[#cf2e2e] font-bold hover:text-[#ec1313] transition-colors text-sm py-2 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#ec1313]">
              Nosotros
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2.5 rounded-full bg-slate-100 text-gray-700 hover:text-[#ec1313] hover:bg-slate-200 transition-all w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ec1313] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/register" className="p-2.5 rounded-full bg-slate-100 text-gray-700 hover:text-[#ec1313] hover:bg-slate-200 transition-all w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">person</span>
            </Link>
            <div className="hamburger-menu lg:hidden">
              <button 
                className={`hamburger-button ${isMenuOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
                aria-label="Menú"
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MENÚ LATERAL ================= */}
      <div className={`side-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <div className="side-menu-user">
            <div className="side-menu-avatar">
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div className="side-menu-user-info">
              <h3>Invitado</h3>
              <p>Inicia sesión para más opciones</p>
            </div>
          </div>
          <button className="side-menu-close" onClick={closeMenu}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="side-menu-search">
          <div className="side-menu-search-box">
            <span className="material-symbols-outlined">search</span>
            <input 
              type="text" 
              className="side-menu-search-input" 
              placeholder="Buscar productos..." 
            />
          </div>
        </div>

        <div className="side-menu-nav">
          <div className="side-menu-section">
            <h4 className="side-menu-section-title">Menú Principal</h4>
            <ul className="side-menu-links">
              <li>
                <Link to="/" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">home</span>Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">category</span>Categorías
                </Link>
              </li>
              <li>
                <Link to="/offers" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">local_offer</span>Ofertas
                </Link>
              </li>
              <li>
                <Link to="/services" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">build</span>Servicios
                </Link>
              </li>
              <li>
                <Link to="/about" className="side-menu-link active" onClick={closeMenu}>
                  <span className="material-symbols-outlined">info</span>Nosotros
                </Link>
              </li>
            </ul>
          </div>

          <div className="side-menu-section">
            <h4 className="side-menu-section-title">Categorías Populares</h4>
            <div className="side-menu-category-grid">
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  to={`/categories/${cat.id}`} 
                  className="side-menu-category-item" 
                  onClick={closeMenu}
                >
                  <div className="category-icon">
                    <span className="material-symbols-outlined">{cat.icon}</span>
                  </div>
                  <span className="category-name">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="side-menu-footer">
          <div className="side-menu-footer-links">
            <Link to="/help" className="side-menu-footer-link" onClick={closeMenu}>
              <span className="material-symbols-outlined">help</span>
              Centro de Ayuda
            </Link>
            <Link to="/login" className="side-menu-footer-link" onClick={closeMenu}>
              <span className="material-symbols-outlined">login</span>
              Iniciar Sesión
            </Link>
            <Link to="/register" className="side-menu-footer-link" onClick={closeMenu}>
              <span className="material-symbols-outlined">app_registration</span>
              Registrarse
            </Link>
          </div>
        </div>
      </div>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="flex-1 flex justify-center px-4 md:px-0 py-10">
        <div className="flex flex-col max-w-5xl w-full">
          {/* Título */}
          <div className="pb-12 pt-4">
            <h1 className="text-[#ec1313] tracking-tight text-6xl md:text-7xl font-bold leading-tight text-center">
              Nosotros
            </h1>
          </div>

          {/* Imagen hero */}
          <div className="mb-12">
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-sm">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGSYbd1anRZ2sYQDUKS-GpYffjPoWO7u5mVVb56Ql78Cs08ok0SnLSPtrBtaniN8zQsc1jpAnP_v-knkR-qd4unqhfWKqQq-NHiqtjmf-C5kfE3aq0ingeyVei_4DPA0ut0y-amjNDqvDSMiRKqcJx7BRrKRNfPF1nAWb37_OoVg1qBHGtJNBQC9KoRcQQ4GUPzxmpwMH0lWrlXNbq2eXLJv69Ah20jqUN1JtMoJSkqdMG3gSsnZKesLakHNrFvpbSxgnWzm8h2G8"
                alt="Modern team workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Nuestra historia */}
          <div className="mb-20">
            <h2 className="text-[#1b0d0d] text-4xl font-bold leading-tight tracking-tight pb-6">
              Nuestra historia
            </h2>
            <div className="flex flex-col gap-6">
              <p className="text-lg leading-relaxed text-[#1b0d0d]">
                Tecommers nació con la visión de revolucionar el comercio electrónico, ofreciendo productos de alta calidad con una identidad audaz. Desde nuestros inicios, nos hemos esforzado por conectar a los clientes con lo mejor del mercado, manteniendo siempre un compromiso inquebrantable con la excelencia y la innovación constante en cada paso de nuestro crecimiento.
              </p>
              <p className="text-lg leading-relaxed text-[#1b0d0d]">
                Lo que comenzó como un pequeño proyecto apasionado por el diseño y la funcionalidad se ha convertido en un referente regional. Nuestra filosofía se basa en la simplicidad, la eficiencia y, sobre todo, en poner a las personas en el centro de nuestra tecnología.
              </p>
            </div>
          </div>

          {/* Grid de valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
            {/* Misión */}
            <div className="flex flex-col gap-4 rounded-xl bg-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2 text-[#ec1313]">
                <span className="material-symbols-outlined text-[28px]">target</span>
              </div>
              <h3 className="text-xl font-bold text-[#1b0d0d] text-center">Misión</h3>
              <p className="text-gray-500 text-base leading-relaxed text-center">
                Impulsar el éxito de nuestros clientes a través de una plataforma de comercio electrónico accesible, eficiente y de alta calidad técnica.
              </p>
            </div>

            {/* Visión */}
            <div className="flex flex-col gap-4 rounded-xl bg-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2 text-[#ec1313]">
                <span className="material-symbols-outlined text-[28px]">visibility</span>
              </div>
              <h3 className="text-xl font-bold text-[#1b0d0d] text-center">Visión</h3>
              <p className="text-gray-500 text-base leading-relaxed text-center">
                Convertirnos en el referente líder de e-commerce a nivel regional para el año 2030, destacando por nuestra agilidad y confianza.
              </p>
            </div>

            {/* Valores */}
            <div className="flex flex-col gap-4 rounded-xl bg-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center mb-2 text-[#ec1313]">
                <span className="material-symbols-outlined text-[28px]">diamond</span>
              </div>
              <h3 className="text-xl font-bold text-[#1b0d0d] text-center">Valores</h3>
              <ul className="text-gray-500 text-base leading-relaxed list-none p-0 text-center">
                <li className="mb-1">• Innovación</li>
                <li className="mb-1">• Integridad</li>
                <li className="mb-1">• Enfoque en el cliente</li>
                <li className="mb-1">• Calidad Superior</li>
              </ul>
            </div>
          </div>

          {/* Footer de la página */}
          <footer className="pt-16 pb-12 border-t border-[#e7cfcf]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Información de contacto */}
              <div>
                <h3 className="text-xl font-bold text-[#1b0d0d] mb-6">Información de Contacto</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#ec1313]">mail</span>
                    <span className="text-lg text-[#1b0d0d]">contacto@tecommers.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#ec1313]">call</span>
                    <span className="text-lg text-[#1b0d0d]">+54 (11) 4567-8900</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#ec1313]">location_on</span>
                    <span className="text-lg text-[#1b0d0d]">Huauchinango, Puebla</span>
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
              <div>
                <h3 className="text-xl font-bold text-[#1b0d0d] mb-6">Síguenos</h3>
                <div className="flex gap-4 mb-12">
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#e7cfcf] text-[#ec1313] hover:bg-[#ec1313] hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined">social_leaderboard</span>
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#e7cfcf] text-[#ec1313] hover:bg-[#ec1313] hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined">language</span>
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#e7cfcf] text-[#ec1313] hover:bg-[#ec1313] hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined">share</span>
                  </a>
                </div>
                <p className="text-sm text-gray-400">© 2024 Tecommers. Todos los derechos reservados.</p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;