import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { ReviewsManager } from '../utils/reviewsManager';
import { useTheme } from '../pages/ThemeContext';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [pendingDelete, setPendingDelete] = useState<{ reviewId: string; element: HTMLElement } | null>(null);
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  
  // ===== IMPLEMENTACIÓN DE CAMBIO DINÁMICO DE CONTENIDO =====
  const [mainTitle, setMainTitle] = useState('Todo lo que necesitas, en un solo lugar');
  const [isExtraSectionVisible, setIsExtraSectionVisible] = useState(false);
  const [titleColor, setTitleColor] = useState('#ec1313');
  
  // Función para cambiar el título principal
  const changeMainTitle = () => {
    const titles = [
      'Todo lo que necesitas, en un solo lugar',
      'Las mejores ofertas están aquí',
      'Calidad y confianza a tu alcance',
      'Descubre productos exclusivos',
      'Envíos gratis a todo el país'
    ];
    const colors = ['#ec1313', '#2563eb', '#16a34a', '#9333ea', '#ea580c'];
    
    const randomIndex = Math.floor(Math.random() * titles.length);
    setMainTitle(titles[randomIndex]);
    setTitleColor(colors[randomIndex]);
    
    // También podemos modificar el DOM directamente con textContent (ejemplo adicional)
    const subtitleElement = document.querySelector('.hero-subtitle');
    if (subtitleElement) {
      subtitleElement.textContent = `¡Nuevo título: ${titles[randomIndex].split(',')[0]}!`;
    }
  };
  
  // Función para mostrar/ocultar la sección extra
  const toggleExtraSection = () => {
    setIsExtraSectionVisible(!isExtraSectionVisible);
    
    // También podemos manipular el estilo display directamente
    const extraSection = document.getElementById('extra-info-section');
    if (extraSection) {
      extraSection.style.display = !isExtraSectionVisible ? 'block' : 'none';
    }
  };

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

  // ===== INICIALIZAR SISTEMA DE RESEÑAS CON INTEGRACIÓN REACT =====
  useEffect(() => {
    // El sistema de reseñas se inicializa automáticamente
    const reviewsManager = new ReviewsManager(
      'reviews-container',
      'review-form'
    );

    // Escuchar evento de éxito en reseñas
    const handleReviewSuccess = (event: CustomEvent) => {
      setSuccessMessage(event.detail.message);
      setShowSuccessModal(true);
      
      // Ocultar modal después de 3 segundos
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    };

    // Escuchar evento de confirmación de eliminación
    const handleDeleteConfirmation = (event: CustomEvent) => {
      const { reviewId, element, message } = event.detail;
      setDeleteMessage(message);
      setPendingDelete({ reviewId, element });
      setShowDeleteModal(true);
    };

    // Escuchar evento de eliminación exitosa
    const handleReviewDeleted = (event: CustomEvent) => {
      setDeleteMessage(event.detail.message);
      setShowDeleteSuccessModal(true);
      
      // Ocultar modal después de 2 segundos
      setTimeout(() => {
        setShowDeleteSuccessModal(false);
      }, 2000);
    };

    // Escuchar evento de validación
    const handleValidationChange = () => {
      console.log('Validación actualizada');
    };

    // Exponer el manager globalmente para acceso desde React
    window.reviewsManager = reviewsManager;

    window.addEventListener('reviewSuccess', handleReviewSuccess as EventListener);
    window.addEventListener('showDeleteConfirmation', handleDeleteConfirmation as EventListener);
    window.addEventListener('reviewDeleted', handleReviewDeleted as EventListener);
    window.addEventListener('reviewValidationChanged', handleValidationChange);

    console.log('🚀 Sistema de reseñas inicializado en HomePage');

    return () => {
      window.removeEventListener('reviewSuccess', handleReviewSuccess as EventListener);
      window.removeEventListener('showDeleteConfirmation', handleDeleteConfirmation as EventListener);
      window.removeEventListener('reviewDeleted', handleReviewDeleted as EventListener);
      window.removeEventListener('reviewValidationChanged', handleValidationChange);
    };
  }, []);

  // Confirmar eliminación
  const confirmDelete = () => {
    if (pendingDelete && window.reviewsManager) {
      window.reviewsManager.confirmDeleteReview(pendingDelete.reviewId, pendingDelete.element);
      setShowDeleteModal(false);
      setPendingDelete(null);
    }
  };

  // Cancelar eliminación
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPendingDelete(null);
  };

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
            <button 
              onClick={toggleTheme}
              className="icon-button"
              aria-label="Cambiar tema"
            >
              <span className="material-symbols-outlined">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
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

      {/* Modal de éxito para nueva reseña */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-green-600 text-5xl">rate_review</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por tu reseña!</h3>
              <p className="text-gray-600 mb-4">
                {successMessage || "Tu opinión ha sido publicada exitosamente"}
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-8 py-3 bg-[#ec1313] text-white font-bold rounded-lg hover:bg-[#b91c1c] transition-colors flex items-center gap-2 mx-auto"
              >
                <span className="material-symbols-outlined">check</span>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-red-600 text-5xl">warning</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">¿Eliminar reseña?</h3>
              <p className="text-gray-600 mb-6">
                {deleteMessage || "Esta acción no se puede deshacer"}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">delete</span>
                  Sí, eliminar
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined">cancel</span>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito para eliminación */}
      {showDeleteSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-green-600 text-5xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Reseña eliminada!</h3>
              <p className="text-gray-600 mb-4">
                {deleteMessage || "La reseña ha sido eliminada correctamente"}
              </p>
              <button
                onClick={() => setShowDeleteSuccessModal(false)}
                className="px-8 py-3 bg-[#ec1313] text-white font-bold rounded-lg hover:bg-[#b91c1c] transition-colors flex items-center gap-2 mx-auto"
              >
                <span className="material-symbols-outlined">check</span>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

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
          <h1 className="hero-title" style={{ color: titleColor }}>
            {mainTitle.split(',')[0]}, <br className="hero-break" />
            <span className="hero-highlight" style={{ color: titleColor }}>
              {mainTitle.split(',')[1] || 'en un solo lugar'}
            </span>
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

          {/* ===== BOTONES PARA CAMBIO DINÁMICO ===== */}
          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={changeMainTitle}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">edit</span>
              Cambiar Título
            </button>
            
            <button
              onClick={toggleExtraSection}
              className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined">
                {isExtraSectionVisible ? 'visibility_off' : 'visibility'}
              </span>
              {isExtraSectionVisible ? 'Ocultar' : 'Mostrar'} Sección Extra
            </button>
          </div>

          {/* ===== SECCIÓN EXTRA QUE SE PUEDE OCULTAR/MOSTRAR ===== */}
          <div 
            id="extra-info-section"
            className={`mt-8 p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl transition-all duration-300 ${
              isExtraSectionVisible ? 'block' : 'hidden'
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Información Adicional</h3>
            <p className="text-white text-opacity-90">
              Aprovecha nuestras ofertas especiales. Los mejores precios y la mejor calidad 
              están en Tecommers. ¡No esperes más para comprar!
            </p>
            <div className="mt-4 flex gap-4">
              <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm">-20%</span>
              <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">Envío gratis</span>
              <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">Nuevo</span>
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

        {/* ================= SECCIÓN DE RESEÑAS DINÁMICAS CON VALIDACIONES ================= */}
<section className="reviews-section py-16 mt-16 border-t-2 border-gray-200">
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-black uppercase mb-4"
        style={{ color: 'var(--text-primary)' }}>
      Opiniones de <span className="text-[#ec1313]">clientes</span>
    </h2>
    <p className="max-w-2xl mx-auto"
       style={{ color: 'var(--text-secondary)' }}>
      Comparte tu experiencia con nuestros productos y lee lo que otros opinan
    </p>
  </div>

  {/* Contenedor de reseñas - Aquí se insertarán dinámicamente */}
  <div id="reviews-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    {/* Las reseñas se cargarán aquí mediante JavaScript */}
  </div>

  {/* Formulario para agregar reseñas con validaciones */}
  <div className="max-w-2xl mx-auto p-8 rounded-xl shadow-lg border"
       style={{ 
         backgroundColor: 'var(--card-bg)', 
         borderColor: 'var(--border-color)' 
       }}>
    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"
        style={{ color: 'var(--text-primary)' }}>
      <span className="material-symbols-outlined text-[#ec1313] text-3xl">rate_review</span>
      Escribe tu reseña
    </h3>
    
    <form id="review-form" className="space-y-5">
      {/* Nombre del usuario con validación */}
      <div>
        <label htmlFor="reviewer-name" className="block text-sm font-medium mb-2"
               style={{ color: 'var(--text-secondary)' }}>
          Tu nombre <span className="text-[#ec1313]">*</span>
        </label>
        <input
          type="text"
          id="reviewer-name"
          placeholder="Ej: Juan Pérez"
          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ec1313] transition-colors"
          style={{ 
            backgroundColor: 'var(--input-bg)', 
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
          required
        />
        <div id="error-reviewer-name" className="error-message hidden mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg items-center gap-2">
          <span className="material-symbols-outlined text-sm">error</span>
        </div>
      </div>

      {/* Categoría del producto con validación */}
      <div>
        <label htmlFor="review-product" className="block text-sm font-medium mb-2"
               style={{ color: 'var(--text-secondary)' }}>
          Categoría <span className="text-[#ec1313]">*</span>
        </label>
        <select
          id="review-product"
          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ec1313] transition-colors"
          style={{ 
            backgroundColor: 'var(--input-bg)', 
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
          required
        >
          <option value="">Selecciona una categoría</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Electrodomésticos">Electrodomésticos</option>
          <option value="Muebles y Hogar">Muebles y Hogar</option>
          <option value="Herramientas">Herramientas</option>
        </select>
        <div id="error-review-product" className="error-message hidden mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg items-center gap-2">
          <span className="material-symbols-outlined text-sm">error</span>
        </div>
      </div>

      {/* Nombre del producto específico con validación */}
      <div>
        <label htmlFor="review-product-name" className="block text-sm font-medium mb-2"
               style={{ color: 'var(--text-secondary)' }}>
          Nombre del producto <span className="text-[#ec1313]">*</span>
        </label>
        <input
          type="text"
          id="review-product-name"
          placeholder="Ej: Refrigerador LG Side by Side"
          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ec1313] transition-colors"
          style={{ 
            backgroundColor: 'var(--input-bg)', 
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
          required
        />
        <div id="error-review-product-name" className="error-message hidden mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg items-center gap-2">
          <span className="material-symbols-outlined text-sm">error</span>
        </div>
      </div>

      {/* Calificación con estrellas y validación */}
      <div>
        <label className="block text-sm font-medium mb-2"
               style={{ color: 'var(--text-secondary)' }}>
          Calificación <span className="text-[#ec1313]">*</span>
        </label>
        <div className="flex gap-2 text-3xl" id="rating-stars">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              className="rating-star text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none"
              data-rating={star}
            >
              ★
            </button>
          ))}
        </div>
        <input type="hidden" id="review-rating-value" value="0" />
        <div id="error-rating" className="error-message hidden mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg items-center gap-2">
          <span className="material-symbols-outlined text-sm">error</span>
        </div>
      </div>

      {/* Comentario con validación y contador */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="review-comment" className="block text-sm font-medium"
                 style={{ color: 'var(--text-secondary)' }}>
            Tu opinión <span className="text-[#ec1313]">*</span>
          </label>
          <span id="character-count" className="text-sm" style={{ color: 'var(--text-tertiary)' }}>0/500</span>
        </div>
        <textarea
          id="review-comment"
          rows={4}
          placeholder="Cuéntanos tu experiencia con el producto. ¿Qué te gustó? ¿Qué mejorarías?"
          className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-[#ec1313] transition-colors resize-none"
          style={{ 
            backgroundColor: 'var(--input-bg)', 
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }}
          required
        ></textarea>
        <div id="error-review-comment" className="error-message hidden mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg items-center gap-2">
          <span className="material-symbols-outlined text-sm">error</span>
        </div>
      </div>

      {/* Botones del formulario */}
      <div className="flex gap-4">
        <button
          type="submit"
          id="submitReviewBtn"
          className="flex-1 py-4 bg-[#ec1313] text-white font-bold rounded-lg hover:bg-[#b91c1c] transition-colors flex items-center justify-center gap-2 text-lg uppercase tracking-wider"
        >
          <span className="material-symbols-outlined">add_comment</span>
          Publicar reseña
        </button>
        <button
          type="button"
          id="resetReviewBtn"
          className="py-4 px-6 font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
          style={{ 
            backgroundColor: 'var(--bg-tertiary)', 
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)'
          }}
        >
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>
    </form>
  </div>
</section>
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