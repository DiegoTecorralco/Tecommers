import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import TecommersRegister from '../utils/register';

const RegisterPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
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
    <div className="min-h-screen flex flex-col">
      {/* ================= NAVBAR PRINCIPAL ================= */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 h-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <svg className="h-10 w-auto" viewBox="0 0 160 120">
              <path d="M10 20H80L65 50H45L30 110H10L25 50H10V20Z" fill="#ec1313" />
              <path d="M50 55H78L75 73H47L50 55Z" fill="black" />
              <path d="M43 85H71L68 103H40L43 85Z" fill="#ec1313" />
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
            <Link to="/about" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors text-sm py-2">
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
          <p className="text-gray-500 text-lg">
            Únete a nuestra comunidad y descubre las mejores ofertas
          </p>
        </div>

        {/* Contenedor del formulario */}
        <div className="max-w-3xl mx-auto">
          <form id="registerForm" ref={formRef} className="space-y-8" noValidate>
            {/* Sección 1: Información personal */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ec1313]">person</span>
                Información personal
              </h2>
              <p className="text-sm text-gray-500 mb-6">Todo campo marcado con * es obligatorio</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                  />
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-nombre"></div>
                  <small className="text-xs text-gray-500">Mínimo 3 caracteres</small>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico <span className="text-[#ec1313]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="ejemplo@correo.com"
                    autoComplete="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                  />
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-email"></div>
                  <small className="text-xs text-gray-500">Usaremos este correo para notificaciones</small>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                    />
                    <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-telefono"></div>
                    <small className="text-xs text-gray-500">10 dígitos sin espacios</small>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                      Fecha de nacimiento <span className="text-[#ec1313]">*</span>
                    </label>
                    <input
                      type="date"
                      id="fechaNacimiento"
                      name="fechaNacimiento"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                    />
                    <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-fechaNacimiento"></div>
                    <small className="text-xs text-gray-500">Debes ser mayor de 18 años</small>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 2: Credenciales de acceso */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ec1313]">lock</span>
                Credenciales de acceso
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all pr-12"
                    />
                    <button
                      type="button"
                      className="toggle-password absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#ec1313] transition-colors"
                      data-target="password"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-password"></div>
                  <div className="mt-3">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="strength-bar h-full w-0 transition-all duration-300"></div>
                    </div>
                    <p className="strength-text text-xs mt-1 text-gray-500">Seguridad de la contraseña</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all pr-12"
                    />
                    <button
                      type="button"
                      className="toggle-password absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#ec1313] transition-colors"
                      data-target="confirmPassword"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-confirmPassword"></div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  <strong>Tu contraseña debe incluir:</strong>
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <li className="requirement-item flex items-center gap-2 text-gray-600" data-rule="length">
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Al menos 8 caracteres
                  </li>
                  <li className="requirement-item flex items-center gap-2 text-gray-600" data-rule="uppercase">
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Una letra mayúscula
                  </li>
                  <li className="requirement-item flex items-center gap-2 text-gray-600" data-rule="lowercase">
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Una letra minúscula
                  </li>
                  <li className="requirement-item flex items-center gap-2 text-gray-600" data-rule="number">
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Un número
                  </li>
                  <li className="requirement-item flex items-center gap-2 text-gray-600" data-rule="special">
                    <span className="material-symbols-outlined text-red-500 text-base">cancel</span>
                    Un carácter especial (@$!%*?&)
                  </li>
                </ul>
              </div>
            </div>

            {/* Sección 3: Verificación humana */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ec1313]">verified</span>
                Verificación de seguridad
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="captcha" className="captcha-label block text-sm font-medium text-gray-700">
                    Para confirmar que no eres un robot: ¿Cuánto es 7 + 5? *
                  </label>
                  <input
                    type="number"
                    id="captcha"
                    name="captcha"
                    required
                    placeholder="Escribe la respuesta"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1313] focus:border-transparent transition-all"
                  />
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-captcha"></div>
                  <small className="text-xs text-gray-500">Pregunta simple para prevenir registros automáticos</small>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="terminos"
                      name="terminos"
                      required
                      className="mt-1 w-4 h-4 text-[#ec1313] border-gray-300 rounded focus:ring-[#ec1313]"
                    />
                    <span className="text-sm text-gray-600">
                      Acepto los <Link to="/terms" className="text-[#ec1313] hover:underline">Términos y Condiciones</Link> y la <Link to="/privacy" className="text-[#ec1313] hover:underline">Política de Privacidad</Link> *
                    </span>
                  </label>
                  <div className="error-message text-sm text-red-600 flex items-center gap-1 hidden" id="error-terminos"></div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      className="mt-1 w-4 h-4 text-[#ec1313] border-gray-300 rounded focus:ring-[#ec1313]"
                    />
                    <span className="text-sm text-gray-600">
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
                className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 min-w-[200px] justify-center"
              >
                <span className="material-symbols-outlined">restart_alt</span>
                Limpiar formulario
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta? <Link to="/login" className="text-[#ec1313] font-medium hover:underline">Inicia sesión aquí</Link>
              </p>
            </div>
          </form>
        </div>

        {/* Botón volver al inicio */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-white border-2 border-[#ec1313] text-[#ec1313] font-bold rounded-full hover:bg-[#ec1313] hover:text-white transition-all"
          >
            Volver al inicio
          </Link>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-6 text-[#ec1313]">
              <div className="relative w-8 h-6">
                <div className="absolute top-0 left-0 w-full h-[30%] bg-[#ec1313] transform -skew-x-[20deg]"></div>
                <div className="absolute top-[35%] left-[35%] w-[45%] h-[20%] bg-black transform -skew-x-[20deg]"></div>
                <div className="absolute bottom-0 left-[25%] w-[40%] h-[25%] bg-[#ec1313] transform -skew-x-[20deg]"></div>
                <div className="absolute top-0 left-[15%] w-[15%] h-full bg-[#ec1313] transform -skew-x-[20deg]"></div>
              </div>
              <span className="text-lg font-black tracking-tight text-black ml-1">TECOMMERS</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Tu tienda online de confianza para todas tus necesidades.
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Ayuda</h4>
            <ul className="list-none flex flex-col gap-3 text-sm text-gray-500">
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Centro de ayuda</a></li>
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Contacto</a></li>
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Guía de compra</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="list-none flex flex-col gap-3 text-sm text-gray-500">
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Términos y condiciones</a></li>
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Política de privacidad</a></li>
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Aviso legal</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Newsletter</h4>
            <div className="flex rounded-lg overflow-hidden border border-gray-300">
              <input type="email" placeholder="Email" className="flex-1 px-4 py-2 text-sm outline-none border-none" />
              <button className="bg-[#ec1313] text-white px-4 py-2 text-xs font-bold border-none cursor-pointer transition-colors hover:bg-[#b91c1c]">
                UNIRSE
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            © 2024 Tecommers. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            <a href="#" className="text-gray-400 no-underline transition-colors hover:text-[#ec1313]">Privacidad</a>
            <a href="#" className="text-gray-400 no-underline transition-colors hover:text-[#ec1313]">Términos</a>
          </div>
        </div>
      </footer>

      {/* Modal de éxito */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl animate-fade-in">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Cuenta creada exitosamente!</h3>
              <p className="text-gray-600 mb-4">
                Te hemos enviado un correo de confirmación a <strong className="text-[#ec1313]">{successEmail}</strong>
              </p>
              <p className="text-sm text-gray-500 mb-6">
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