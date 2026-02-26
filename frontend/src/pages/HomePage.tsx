import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './HomePage.css';

const HomePage: React.FC = () => {
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
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <svg className="logo-svg" viewBox="0 0 160 120">
              <path d="M10 20H80L65 50H45L30 110H10L25 50H10V20Z" fill="#cf2e2e" />
              <path d="M50 55H78L75 73H47L50 55Z" fill="black" />
              <path d="M43 85H71L68 103H40L43 85Z" fill="#cf2e2e" />
            </svg>
            <span className="logo-text">TECOMMERS</span>
          </div>

          <nav className="nav">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/categories" className="nav-link">Categorías</Link>
            <Link to="/offers" className="nav-link">Ofertas</Link>
            <Link to="/services" className="nav-link">Servicios</Link>
            <Link to="/about" className="nav-link">Nosotros</Link>
          </nav>

          <div className="icon-container">
            <Link to="/cart" className="icon-button" aria-label="Carrito de compras">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
            <Link to="/register" className="icon-button" aria-label="Perfil de usuario">
              <span className="material-symbols-outlined">person</span>
            </Link>
            <div className="hamburger-menu">
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
                <Link to="/" className="side-menu-link active" onClick={closeMenu}>
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
                <Link to="/about" className="side-menu-link" onClick={closeMenu}>
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

      <section className="hero">
        <div className="hero-banner"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Todo lo que necesitas, <br className="hero-break" />
            <span className="hero-highlight">en un solo lugar</span>
          </h1>
          <p className="hero-subtitle">
            Descubre nuestra selección exclusiva de productos con envíos a todo el país.
          </p>
          
          <div className="search-container">
            <div className="search-box">
              <div className="search-icon">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="search-input"
                placeholder="Buscar productos, marcas y más..."
                type="text"
              />
              <button className="search-button">Buscar</button>
            </div>
          </div>
        </div>
      </section>

      <main className="main">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Explorar</p>
            <h2 className="section-title">Nuestras Categorías</h2>
          </div>
          <Link to="/categories" className="section-link">
            Ver todas <span className="material-symbols-outlined">arrow_forward_ios</span>
          </Link>
        </div>

        <div className="categories-grid">
          <Link to="/categories/tecnologia" className="category-card">
            <div className="category-image-container">
              <img
                alt="Tecnología"
                className="category-image"
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <div className="category-overlay"></div>
            </div>
            <h3 className="category-title">Tecnología</h3>
            <p className="category-description">Más de 500 productos</p>
          </Link>

          <Link to="/categories/electrodomesticos" className="category-card">
            <div className="category-image-container">
              <img
                alt="Electrodomésticos"
                className="category-image"
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <div className="category-overlay"></div>
            </div>
            <h3 className="category-title">Electrodomésticos</h3>
            <p className="category-description">Calidad garantizada</p>
          </Link>

          <Link to="/categories/muebles-hogar" className="category-card">
            <div className="category-image-container">
              <img
                alt="Muebles y Hogar"
                className="category-image"
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <div className="category-overlay"></div>
            </div>
            <h3 className="category-title">Muebles y Hogar</h3>
            <p className="category-description">Diseño para tu vida</p>
          </Link>

          <Link to="/categories/herramientas" className="category-card">
            <div className="category-image-container">
              <img
                alt="Herramientas"
                className="category-image"
                src="https://images.unsplash.com/photo-1554825959-e9a6670d4f18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              />
              <div className="category-overlay"></div>
            </div>
            <h3 className="category-title">Herramientas</h3>
            <p className="category-description">Uso profesional</p>
          </Link>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-symbol">
                <div className="t-main"></div>
                <div className="logo-bars">
                  <div className="bar-black"></div>
                  <div className="bar-red"></div>
                </div>
              </div>
              <span className="footer-logo-text">TECOMMERS</span>
            </div>
            <p className="footer-description">
              Tu aliado estratégico en compras online. Calidad, rapidez y confianza en cada uno de
              tus pedidos.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Empresa</h4>
            <ul className="footer-links">
              <li><Link to="/about" className="footer-link">Sobre Nosotros</Link></li>
              <li><Link to="/services" className="footer-link">Nuestros Servicios</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Categorias</h4>
            <ul className="footer-links">
              <li><Link to="/categories/tecnologia" className="footer-link">Tecnología</Link></li>
              <li><Link to="/categories/electrodomesticos" className="footer-link">Electrodomésticos</Link></li>
              <li><Link to="/categories/muebles-hogar" className="footer-link">Muebles y Hogar</Link></li>
              <li><Link to="/categories/herramientas" className="footer-link">Herramientas</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2026 Tecommers. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
};

export default HomePage;