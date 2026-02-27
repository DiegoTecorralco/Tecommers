import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useTheme } from '../pages/ThemeContext';

interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ServicesPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();

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

  const services: Service[] = [
    {
      id: 1,
      name: 'Mis pedidos',
      description: 'Rastrea y gestiona tus compras',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY9snUA78gFbD8l4HutO2ozBKDxtYOrPUocAW_PM1o3hT7kCLWyJUK27v-IbJkT8xIKutX-OcZWOcy_3buM33ye2sbst_KBbecKVwJGlLYwFp0EA2OujLotEnXG3FkMnZJxZqeJy6Urw62hH07QW1EnBj5Sf5WYHOWCBrwXJofCvJkX9tlx_Idrj_--7vUc6dhwjCZEZHBuG7Yfr0bg2Au9jLgRt351_uI4oF0U81G5atNbUyBOpqTwwQjbArJLqloVNrsEGvtbUE'
    },
    {
      id: 2,
      name: 'Devoluciones',
      description: 'Procesar devoluciones fácilmente',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_TdfjCO8YTNj7_hR-ykw27inAridVB1Zuafz1coCRv0SRtVDeKWEtrAUsQ1d0kGgV9jXUJnS8TeML3tOO5Yq5TgKJbcpNrjm1qAxKlNG4WgJTpv4UDFu-FCixFf7GtK8z3_xoNiGvguY--r12OPaCptbnxHU9cKpGe3d1c5WeszMTNO1nK4jjPavAEr9RqjAwCQ-1CF9EcCHyk3OOOGBciqFAHCsJ0d4gH1g6X43fQNBBbjfqM-ICRhgOHhBnTbTq2N7FVoHu5GA'
    },
    {
      id: 3,
      name: 'Soporte',
      description: 'Asistencia técnica disponible',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgbY2fJPeyUKY60w89XhY8X7RY1LaRIfCOm_HcSLbxSBECn-u71Cs8_sfoW2mZ2SPtIi-I62n_EqHxx7mm4J54uNvyt3QwTGLMcdgZlXlXw2MkfA_vPrLrMupgO3jvwKtB93fuFP2J5UZx1WiKglIMRB03OY4Lu4e5du6mE7qHYDEyLXxJnrF5dlVlFij6bwoCxavPctovvh3nD1RNUqML150jVruycEw8hMrVfE6MYG8LOHmYAGWICXNIBl6bkeZ7gRy--s6l314'
    },
    {
      id: 4,
      name: 'Beneficios premium',
      description: 'Ver tus beneficios exclusivos',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbywBMqk8bZrS-qda2YSBA3rpfg-HcLyUF2m6XTy6KPnM2HtHgghA6blor_zo1olVXTiKkUNVYvwkQ_cEk9ZWseefLyKIF0siTPgeI1PjgdOoCUGOhsWr7hx_58EcKtBF0HPqo4m2lvuWYZAy7TDuNK6NoGn2vyOKJiQZqnXu2HrbtpjyQUo4KetAnqD7_p7xGNg2LR0dcPBEQIBxG-zgh0pqHfFsbqUnLeJpBGEfyn1G1p6UoOwZ9zNj-q4aG-z_SEBn7jfiTqHo'
    },
    {
      id: 5,
      name: 'Reportar',
      description: 'Seguridad y reportes de fraude',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoqgUfNnusz2taNr3M6zBIB4DcwqM8ZjaFKfUtjch25JpNyAteE8je9WhQOibhMDQWECG9dROG1Q4OnFyi8l1p56zylT_NRwcVBZ3YeQjeffpW2ovk0ga-GQqpAhiR8JOykkNJGiSmmPtoMA1vX1m6ZQ1xE8gocnDwrTTPxo8o2pRGf8TqlOOjZNhlelvdnED64bhsudG_TJkWBqrt-PTparV6Lu1Tm5HtZNSwko2fDzzirX64_N-Au6A0m-QBoHdjaHnx4_KV6wY'
    },
    {
      id: 6,
      name: 'Contáctanos',
      description: 'Canales de soporte directo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF2ylAh8VXx8zqRC-UH6yK6Y8c-R7qtb5hBUlcFdGndh4aC6e_lS7FjMielQcSgNFb5OiMPwDtpqTltM5y7dtjz1UOJcEocp-gR2Ho-kpTmo_dARYcUfAsP8e-JlYRr4YJd4gqOH0DQFgRILy_Xp_XVB7Kbk_QKdsA3lrsK0T0TPpOwaIg5XMhKT0VeL8HzCL-Vvn6e7WgtaqR_yDWc4t6GNvyXbeDvYDL4UjsBzcVJXTihqHESkNlEMuWAsUa1abNkhBOX0LPsn8'
    },
    {
      id: 7,
      name: 'Tu cuenta',
      description: 'Perfil y configuración',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9hIDoxMr7zQnNSPYhbdHrn59LU95KTkFKR5mcX-UIkQIYIeRjGtXOlfqvLRErI7nlIoDxCIhKIWSD6uykh0C9twPNe5HcjdKMJkUjMsXkb3U9dWinbps5wIu0CfsKcXO8QrqXN6ZWnzHQh_9pw_3zGkhUSxEwFzidOUwR1SsB-OEs-03eHVk_lBo1cQp4ma-zo4JsplPjLHKoA5pX62eyqB6_GrvUtYwiu6jGkvVx2olQAdvzZ61fJHcaLuFwLhLrFL3VaMMfrgg'
    }
  ];

  const categories = [
    { id: 'electrodomesticos', name: 'Electrodomésticos', icon: 'devices' },
    { id: 'muebles-hogar', name: 'Muebles y Hogar', icon: 'chair' },
    { id: 'tecnologia', name: 'Tecnología', icon: 'computer' },
    { id: 'herramientas', name: 'Herramientas', icon: 'build' }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo-container">
            <svg className="logo-svg" viewBox="0 0 160 120">
              <path d="M10 20H80L65 50H45L30 110H10L25 50H10V20Z" fill="#cf2e2e" />
              <path d="M50 55H78L75 73H47L50 55Z" fill="black" />
              <path d="M43 85H71L68 103H40L43 85Z" fill="#cf2e2e" />
            </svg>
            <span className="logo-text">TECOMMERS</span>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/categories" className="nav-link">Categorías</Link>
            <Link to="/offers" className="nav-link">Ofertas</Link>
            <Link to="/services" className="nav-link active">Servicios</Link>
            <Link to="/about" className="nav-link">Nosotros</Link>
          </nav>

          <div className="icon-container">
            <button onClick={toggleTheme} className="icon-button" aria-label="Cambiar tema">
              <span className="material-symbols-outlined">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            <Link to="/cart" className="icon-button" aria-label="Carrito de compras">
              <span className="material-symbols-outlined">shopping_cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
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
                <Link to="/services" className="side-menu-link active" onClick={closeMenu}>
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

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-12 w-full">
        <div className="text-center mb-16">
          <h1 className="text-[#ec1313] text-5xl md:text-6xl font-extrabold mb-4">
            Nuestros servicios
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-2xl flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer group"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <div className="w-full aspect-[4/3] rounded-xl mb-6 overflow-hidden"
                   style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                {service.name}
              </h3>
              <p className="text-sm font-semibold text-[#ec1313]">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto my-24 text-center">
          <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
            Algunas de las cosas que puedes hacer aquí
          </h2>
          <p className="leading-relaxed text-lg" style={{ color: 'var(--text-secondary)' }}>
            Nuestra plataforma de servicios está diseñada para brindarte autonomía y seguridad en cada paso de tu experiencia de compra. Desde el seguimiento en tiempo real hasta la gestión de reembolsos, estamos comprometidos con tu satisfacción total y soporte 24/7.
          </p>
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

          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/terms" className="footer-link">Términos y condiciones</Link></li>
              <li><Link to="/privacy" className="footer-link">Política de privacidad</Link></li>
              <li><Link to="/cookies" className="footer-link">Cookies</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2024 Tecommers. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;