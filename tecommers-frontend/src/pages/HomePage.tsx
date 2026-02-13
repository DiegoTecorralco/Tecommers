import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <>
      {/* ================= NAVBAR PRINCIPAL ================= */}
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
            <Link to="/" className="nav-link active">
              Home
            </Link>
            <Link to="/categories" className="nav-link">
              Categorías
            </Link>
            <Link to="/offers" className="nav-link">
              Ofertas
            </Link>
            <Link to="/services" className="nav-link">
              Servicios
            </Link>
            <Link to="/about" className="nav-link">
              Nosotros
            </Link>
          </nav>

          <div className="icon-container">
            <button className="icon-button" aria-label="Carrito de compras">
              <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            <Link to="/register" className="icon-button" aria-label="Perfil de usuario">
              <span className="material-symbols-outlined">person</span>
            </Link>
          </div>
        </div>
      </header>
      {/* ================= FIN NAVBAR ================= */}

      {/* ================= HERO SECTION ================= */}
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
            <div className="category-links">
              <Link to="/category/electronica" className="category-link">
                Electrónica
              </Link>
              <span className="category-dot"></span>
              <Link to="/category/moda" className="category-link">
                Moda
              </Link>
              <span className="category-dot"></span>
              <Link to="/category/hogar" className="category-link">
                Hogar
              </Link>
              <span className="category-dot"></span>
              <Link to="/category/deportes" className="category-link">
                Deportes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORÍAS SECTION ================= */}
      <main className="main">
        <div className="section-header">
          <div>
            <p className="section-subtitle">Explorar</p>
            <h2 className="section-title">Nuestras Categorías</h2>
          </div>
          <Link to="/categories" className="section-link">
            Ver todas{' '}
            <span className="material-symbols-outlined section-link-icon">
              arrow_forward_ios
            </span>
          </Link>
        </div>
        <div className="categories-grid">
          {/* Tecnología */}
          <Link to="/category/tecnologia" className="category-card">
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

          {/* Electrodomésticos */}
          <Link to="/category/electrodomesticos" className="category-card">
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

          {/* Muebles y Hogar */}
          <Link to="/category/muebles-hogar" className="category-card">
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

          {/* Herramientas */}
          <Link to="/category/herramientas" className="category-card">
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

      {/* ================= FOOTER ================= */}
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
            <div className="social-icons">
              <button className="social-icon" aria-label="Compartir">
                <span className="material-symbols-outlined">share</span>
              </button>
              <button className="social-icon" aria-label="Correo">
                <span className="material-symbols-outlined">mail</span>
              </button>
            </div>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Empresa</h4>
            <ul className="footer-links">
              <li>
                <Link to="/about" className="footer-link">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/branches" className="footer-link">
                  Sucursales
                </Link>
              </li>
              <li>
                <Link to="/careers" className="footer-link">
                  Trabaja con nosotros
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="footer-link">
                  Sustentabilidad
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Soporte</h4>
            <ul className="footer-links">
              <li>
                <Link to="/help" className="footer-link">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link to="/returns" className="footer-link">
                  Políticas de devolución
                </Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="footer-link">
                  Estado de envío
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="newsletter-description">
              Suscríbete para recibir ofertas exclusivas cada semana.
            </p>
            <div className="newsletter-form">
              <input
                className="newsletter-input"
                placeholder="Tu correo electrónico"
                type="email"
              />
              <button className="newsletter-button">Suscribirme</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2024 Tecommers. Todos los derechos reservados.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">
              Privacidad
            </Link>
            <Link to="/legal" className="footer-bottom-link">
              Legal
            </Link>
            <Link to="/cookies" className="footer-bottom-link">
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomePage;