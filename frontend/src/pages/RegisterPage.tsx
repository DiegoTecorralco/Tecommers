import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useTheme } from '../pages/ThemeContext';
import TecommersRegister from '../utils/register';

const RegisterPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState('¿Cuál es el resultado de 7 + 5?');

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

  // Inicializar el sistema de registro
  useEffect(() => {
    if (formRef.current) {
      // @ts-ignore - El sistema de registro se inicializará con el DOM
      const registerSystem = new TecommersRegister();
      
      // Guardar referencia para uso global
      window.registerSystem = registerSystem;
      
      // Escuchar eventos personalizados
      const handleShowModal = (e: CustomEvent) => {
        setShowModal(true);
        setSuccessEmail(e.detail.email);
        startCountdown();
      };

      const handleHideModal = () => {
        setShowModal(false);
        setCountdown(5);
      };

      window.addEventListener('showRegisterModal', handleShowModal as EventListener);
      window.addEventListener('hideRegisterModal', handleHideModal);

      return () => {
        window.removeEventListener('showRegisterModal', handleShowModal as EventListener);
        window.removeEventListener('hideRegisterModal', handleHideModal);
      };
    }
  }, []);

  const startCountdown = () => {
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleContinue = () => {
    setShowModal(false);
    setCountdown(5);
    // Redirigir al dashboard o home
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* ================= NAVBAR PRINCIPAL ================= */}
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo-container">
            <svg className="logo-svg" viewBox="0 0 160 120">
              <path d="M10 20H80L65 50H45L30 110H10L25 50H10V20Z" fill="#ec1313" />
              <path d="M50 55H78L75 73H47L50 55Z" fill="black" />
              <path d="M43 85H71L68 103H40L43 85Z" fill="#ec1313" />
            </svg>
            <span className="logo-text">TECOMMERS</span>
          </Link>

          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/categories" className="nav-link">Categorías</Link>
            <Link to="/offers" className="nav-link">Ofertas</Link>
            <Link to="/services" className="nav-link">Servicios</Link>
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
            <Link to="/register" className="icon-button active" aria-label="Perfil de usuario">
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
            <Link to="/register" className="side-menu-footer-link active" onClick={closeMenu}>
              <span className="material-symbols-outlined">app_registration</span>
              Registrarse
            </Link>
          </div>
        </div>
      </div>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-[#ec1313] text-5xl md:text-7xl font-black uppercase tracking-tight mb-2">
            Registro
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Únete a nuestra comunidad y descubre las mejores ofertas
          </p>
        </div>

        {/* Contenedor del formulario */}
        <div className="max-w-3xl mx-auto">
          <form id="registerForm" ref={formRef} className="space-y-8" noValidate>
            {/* Sección 1: Información personal */}
            <div className="p-6 md:p-8 rounded-xl shadow-sm border"
                 style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="material-symbols-outlined text-[#ec1313]">person</span>
                Información personal
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Todo campo marcado con * es obligatorio</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Nombre completo <span className="text-[#ec1313]">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    minLength={3}
                    maxLength={50}
                    placeholder="Ej: María González López"
                    autoComplete="name"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-nombre"></div>
                  <small className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Mínimo 3 caracteres</small>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Correo electrónico <span className="text-[#ec1313]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="ejemplo@correo.com"
                    autoComplete="email"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-email"></div>
                  <small className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Usaremos este correo para notificaciones</small>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="telefono" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Teléfono <span className="text-[#ec1313]">*</span>
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      pattern="[0-9]{10}"
                      placeholder="1234567890"
                      autoComplete="tel"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                      style={{ 
                        backgroundColor: 'var(--input-bg)', 
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-telefono"></div>
                    <small className="text-xs" style={{ color: 'var(--text-tertiary)' }}>10 dígitos sin espacios</small>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="fechaNacimiento" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      Fecha de nacimiento <span className="text-[#ec1313]">*</span>
                    </label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      required
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                      style={{ 
                        backgroundColor: 'var(--input-bg)', 
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-fechaNacimiento"></div>
                    <small className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Debes ser mayor de 18 años</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 2: Credenciales de acceso */}
            <div className="p-6 md:p-8 rounded-xl shadow-sm border"
                 style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="material-symbols-outlined text-[#ec1313]">lock</span>
                Credenciales de acceso
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Contraseña <span className="text-[#ec1313]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      minLength={8}
                      placeholder="Mínimo 8 caracteres"
                      autoComplete="new-password"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all pr-12"
                      style={{ 
                        backgroundColor: 'var(--input-bg)', 
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <button
                      type="button"
                      className="toggle-password absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: 'var(--text-tertiary)' }}
                      data-target="password"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-password"></div>
                  <div className="mt-3">
                    <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <div className="strength-bar h-full w-0 transition-all duration-300" style={{ backgroundColor: '#ef4444' }}></div>
                    </div>
                    <p className="strength-text text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>Seguridad de la contraseña</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Confirmar contraseña <span className="text-[#ec1313]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      minLength={8}
                      placeholder="Repite tu contraseña"
                      autoComplete="new-password"
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all pr-12"
                      style={{ 
                        backgroundColor: 'var(--input-bg)', 
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-primary)'
                      }}
                    />
                    <button
                      type="button"
                      className="toggle-password absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: 'var(--text-tertiary)' }}
                      data-target="confirmPassword"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-confirmPassword"></div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                  <strong>Tu contraseña debe incluir:</strong>
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <li className="requirement-item flex items-center gap-2" data-rule="length" style={{ color: 'var(--text-secondary)' }}>
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Al menos 8 caracteres
                  </li>
                  <li className="requirement-item flex items-center gap-2" data-rule="uppercase" style={{ color: 'var(--text-secondary)' }}>
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Una letra mayúscula
                  </li>
                  <li className="requirement-item flex items-center gap-2" data-rule="lowercase" style={{ color: 'var(--text-secondary)' }}>
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Una letra minúscula
                  </li>
                  <li className="requirement-item flex items-center gap-2" data-rule="number" style={{ color: 'var(--text-secondary)' }}>
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Un número
                  </li>
                  <li className="requirement-item flex items-center gap-2" data-rule="special" style={{ color: 'var(--text-secondary)' }}>
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Un carácter especial (@$!%*?&)
                  </li>
                </ul>
              </div>
            </div>

            {/* Sección 3: Verificación humana */}
            <div className="p-6 md:p-8 rounded-xl shadow-sm border"
                 style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="material-symbols-outlined text-[#ec1313]">verified</span>
                Verificación de seguridad
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="captcha" className="captcha-label block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Para confirmar que no eres un robot: ¿Cuánto es 7 + 5? *
                  </label>
                  <input
                    type="number"
                    id="captcha"
                    name="captcha"
                    required
                    placeholder="Escribe la respuesta"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      borderColor: 'var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  />
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-captcha"></div>
                  <small className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Pregunta simple para prevenir registros automáticos</small>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="terminos"
                      name="terminos"
                      required
                      className="mt-1 w-4 h-4 text-[#ec1313] rounded focus:ring-[#ec1313]"
                      style={{ accentColor: '#ec1313' }}
                    />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Acepto los <Link to="/terms" className="text-[#ec1313] hover:underline">Términos y Condiciones</Link> y la <Link to="/privacy" className="text-[#ec1313] hover:underline">Política de Privacidad</Link> *
                    </span>
                  </label>
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-terminos"></div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      className="mt-1 w-4 h-4 text-[#ec1313] rounded focus:ring-[#ec1313]"
                      style={{ accentColor: '#ec1313' }}
                    />
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      Sí, quiero recibir ofertas exclusivas y novedades por correo electrónico
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center pt-4">
              <button
                type="submit"
                id="submitBtn"
                className="px-8 py-3 bg-[#ec1313] text-white font-bold rounded-lg hover:bg-[#b91c1c] transition-colors flex items-center gap-2 min-w-[200px] justify-center"
              >
                <span className="material-symbols-outlined">person_add</span>
                Crear cuenta
              </button>
              
              <button
                type="button"
                id="resetBtn"
                className="px-8 py-3 font-bold rounded-lg transition-colors flex items-center gap-2 min-w-[200px] justify-center"
                style={{ 
                  backgroundColor: 'var(--bg-tertiary)', 
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <span className="material-symbols-outlined">restart_alt</span>
                Limpiar formulario
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                ¿Ya tienes una cuenta? <Link to="/login" className="text-[#ec1313] font-medium hover:underline">Inicia sesión aquí</Link>
              </p>
            </div>
          </form>
        </div>

        {/* Botón volver al inicio */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="px-8 py-3 border-2 border-[#ec1313] text-[#ec1313] font-bold rounded-full transition-all hover:bg-[#ec1313] hover:text-white"
            style={{ backgroundColor: 'transparent' }}
          >
            Volver al inicio
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
              Tu tienda online de confianza para todas tus necesidades.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Ayuda</h4>
            <ul className="footer-links">
              <li><Link to="/help" className="footer-link">Centro de ayuda</Link></li>
              <li><Link to="/contact" className="footer-link">Contacto</Link></li>
              <li><Link to="/guide" className="footer-link">Guía de compra</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/terms" className="footer-link">Términos y condiciones</Link></li>
              <li><Link to="/privacy" className="footer-link">Política de privacidad</Link></li>
              <li><Link to="/legal" className="footer-link">Aviso legal</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Newsletter</h4>
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-1 px-4 py-2 text-sm outline-none border-none"
                style={{ 
                  backgroundColor: 'var(--input-bg)', 
                  color: 'var(--text-primary)'
                }}
              />
              <button className="bg-[#ec1313] text-white px-4 py-2 text-xs font-bold border-none cursor-pointer transition-colors hover:bg-[#b91c1c]">
                UNIRSE
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2024 Tecommers. Todos los derechos reservados.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacidad</Link>
            <Link to="/terms" className="footer-bottom-link">Términos</Link>
          </div>
        </div>
      </footer>

      {/* Modal de éxito */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-xl max-w-md w-full p-8 shadow-2xl animate-fade-in"
               style={{ backgroundColor: 'var(--modal-bg)' }}>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>¡Cuenta creada exitosamente!</h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Te hemos enviado un correo de confirmación a <strong className="text-[#ec1313]">{successEmail}</strong>
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>
                Redirigiendo a tu cuenta en <span className="font-bold text-[#ec1313]">{countdown}</span> segundos...
              </p>
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-[#ec1313] text-white font-bold rounded-lg hover:bg-[#b91c1c] transition-colors flex items-center gap-2 mx-auto"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
                Continuar ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;