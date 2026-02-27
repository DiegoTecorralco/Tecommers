import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useTheme } from '../pages/ThemeContext';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOriginal: number;
  imagen: string;
  categoria: string[];
  marca: string;
  potencia?: string;
  modelo?: string;
  año?: string;
  descuento: number;
  especificaciones: {
    icono: string;
    texto: string;
  }[];
}

const Herramientas: React.FC = () => {
  const { addToCart, cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showProfessionalInfo, setShowProfessionalInfo] = useState(false);
  const [showNewToolsInfo, setShowNewToolsInfo] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const productos: Producto[] = [
    {
      id: 1,
      nombre: "Taladro Percutor Bosch GBH 2-28",
      descripcion: "Taladro percutor profesional 850W con función impacto, velocidad variable, ideal para concreto y metal.",
      precio: 254.15,
      precioOriginal: 299.00,
      imagen: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["power-tools", "professional"],
      marca: "Bosch",
      potencia: "850W",
      modelo: "GBH 2-28",
      año: "2024",
      descuento: 15,
      especificaciones: [
        { icono: "bolt", texto: "850W" },
        { icono: "settings", texto: "0-3000 RPM" },
        { icono: "diamond", texto: "28mm concreto" },
        { icono: "engineering", texto: "Profesional" }
      ]
    },
    {
      id: 2,
      nombre: "Juego Llaves Mixtas Stanley 32pz",
      descripcion: "Set completo 32 piezas acero cromo vanadio, incluye llaves 8-19mm, estuche metálico, garantía de por vida.",
      precio: 80.99,
      precioOriginal: 89.99,
      imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["hand-tools", "professional"],
      marca: "Stanley",
      año: "2023",
      descuento: 10,
      especificaciones: [
        { icono: "category", texto: "32 piezas" },
        { icono: "workspace_premium", texto: "Cromo Vanadio" },
        { icono: "business_center", texto: "Estuche Metálico" },
        { icono: "verified", texto: "Garantía Vida" }
      ]
    },
    {
      id: 3,
      nombre: "Sierra Circular Makita 185mm 1200W",
      descripcion: "Sierra circular profesional 185mm 1200W, corte a 45°, láser guía, protección contra retroceso, motor brushless.",
      precio: 319.20,
      precioOriginal: 399.00,
      imagen: "https://images.unsplash.com/photo-1621911192164-3f4c6b79db89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["power-tools", "professional", "new"],
      marca: "Makita",
      potencia: "1200W",
      año: "2024",
      descuento: 20,
      especificaciones: [
        { icono: "bolt", texto: "1200W" },
        { icono: "straighten", texto: "185mm" },
        { icono: "laser", texto: "Láser Guía" },
        { icono: "electric_bolt", texto: "Brushless" }
      ]
    },
    {
      id: 4,
      nombre: "Cortadora Césped Husqvarna 140cc",
      descripcion: "Cortadora gasolina 140cc, ancho corte 46cm, sistema mulching, altura ajustable 25-75mm, arranque fácil.",
      precio: 527.12,
      precioOriginal: 599.00,
      imagen: "https://images.unsplash.com/photo-1530022359239-3caad0eec948?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["gardening", "professional"],
      marca: "Husqvarna",
      potencia: "140cc",
      año: "2023",
      descuento: 12,
      especificaciones: [
        { icono: "local_gas_station", texto: "140cc" },
        { icono: "straighten", texto: "46cm corte" },
        { icono: "grass", texto: "Mulching" },
        { icono: "tune", texto: "25-75mm altura" }
      ]
    },
    {
      id: 5,
      nombre: "Nivel Láser DEWALT 30m",
      descripcion: "Nivel láser autonivelante 360°, alcance 30m, precisión ±3mm a 10m, trípode incluido, protección IP54.",
      precio: 204.18,
      precioOriginal: 249.00,
      imagen: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["measurement", "professional", "new"],
      marca: "DEWALT",
      año: "2024",
      descuento: 18,
      especificaciones: [
        { icono: "distance", texto: "30m alcance" },
        { icono: "precision_manufacturing", texto: "±3mm precisión" },
        { icono: "hdr_auto", texto: "Autonivelante" },
        { icono: "water_drop", texto: "IP54" }
      ]
    },
    {
      id: 6,
      nombre: "Kit Seguridad 3M 8 Artículos",
      descripcion: "Kit protección personal: gafas anti-impacto, respirador N95, guantes nitrilo, orejeras, chaleco, casco.",
      precio: 119.25,
      precioOriginal: 159.00,
      imagen: "https://images.unsplash.com/photo-1623479322723-2285a646f9a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["safety", "professional"],
      marca: "3M",
      año: "2023",
      descuento: 25,
      especificaciones: [
        { icono: "category", texto: "8 artículos" },
        { icono: "health_and_safety", texto: "Certificado CE" },
        { icono: "shield", texto: "Anti-impacto" },
        { icono: "filter_alt", texto: "N95" }
      ]
    },
    {
      id: 7,
      nombre: "Pistola de Calor B+D 2000W",
      descripcion: "Pistola calor 2000W, temperatura ajustable 50-600°C, 2 boquillas incluidas, ideal para soldar, decapar, plástico.",
      precio: 73.59,
      precioOriginal: 79.99,
      imagen: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["power-tools"],
      marca: "Black+Decker",
      potencia: "2000W",
      año: "2023",
      descuento: 8,
      especificaciones: [
        { icono: "bolt", texto: "2000W" },
        { icono: "thermostat", texto: "600°C máx" },
        { icono: "tune", texto: "Ajustable" },
        { icono: "settings", texto: "2 boquillas" }
      ]
    },
    {
      id: 8,
      nombre: "Escalera Werner 3.8m Aluminio",
      descripcion: "Escalera aluminio multiusos 3.8m altura máxima, capacidad 150kg, sistema bloqueo seguridad, 4 posiciones.",
      precio: 179.55,
      precioOriginal: 189.00,
      imagen: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["safety"],
      marca: "Werner",
      año: "2023",
      descuento: 5,
      especificaciones: [
        { icono: "height", texto: "3.8m altura" },
        { icono: "weight", texto: "150kg cap." },
        { icono: "lock", texto: "Bloqueo Seg." },
        { icono: "conversion_path", texto: "4 posiciones" }
      ]
    }
  ];

  const filteredProducts = productos.filter(producto => {
    const matchesSearch = searchTerm === '' || 
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.modelo && producto.modelo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (producto.potencia && producto.potencia.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = currentFilter === 'all' || 
      (currentFilter === 'new' ? producto.año === '2024' :
       currentFilter === 'professional' ? producto.categoria.includes('professional') :
       producto.categoria.includes(currentFilter));

    return matchesSearch && matchesFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-asc':
        return a.precio - b.precio;
      case 'price-desc':
        return b.precio - a.precio;
      case 'power':
        const aPower = a.potencia ? parseFloat(a.potencia.replace(/[^0-9.-]+/g, '')) : 0;
        const bPower = b.potencia ? parseFloat(b.potencia.replace(/[^0-9.-]+/g, '')) : 0;
        return bPower - aPower;
      case 'brand':
        return a.marca.localeCompare(b.marca);
      case 'discount':
        return b.descuento - a.descuento;
      case 'newest':
        return (b.año || '0').localeCompare(a.año || '0');
      default:
        return 0;
    }
  });

  const handleAddToCart = (producto: Producto) => {
    addToCart(producto, 'herramientas');
    setNotificationMessage(`${producto.nombre} agregado al carrito`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSearchSuggestion = (term: string) => {
    setSearchTerm(term);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentFilter('all');
    setSortBy('relevance');
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const getPowerColor = (potencia?: string) => {
    if (!potencia) return 'bg-[#ec1313]';
    const value = parseFloat(potencia.replace(/[^0-9.-]+/g, ''));
    if (value >= 1200) return 'bg-gradient-to-r from-red-700 to-red-600';
    if (value >= 800) return 'bg-gradient-to-r from-red-600 to-red-500';
    return 'bg-gradient-to-r from-red-500 to-red-400';
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
            <Link to="/categories" className="nav-link active">Categorías</Link>
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
                <Link to="/categories" className="side-menu-link active" onClick={closeMenu}>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4"
              style={{ color: 'var(--text-primary)' }}>
            Herramientas
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Calidad profesional para cada proyecto
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center border-3 border-[#cf2e2e] rounded-2xl p-3 mb-4 transition-all focus-within:shadow-[0_12px_30px_rgba(207,46,46,0.25)] focus-within:-translate-y-0.5"
               style={{ backgroundColor: 'var(--card-bg)' }}>
            <span className="material-symbols-outlined text-[#cf2e2e] mx-4 text-3xl">search</span>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar taladros, sierras, llaves, marcas, tipo..."
              className="flex-1 border-none outline-none text-lg py-4 font-medium"
              style={{ 
                backgroundColor: 'transparent', 
                color: 'var(--text-primary)'
              }}
            />
            <button 
              onClick={() => {
                if (searchTerm) {
                  setNotificationMessage(`Buscando: ${searchTerm}`);
                  setShowNotification(true);
                  setTimeout(() => setShowNotification(false), 2000);
                }
              }}
              className="bg-[#cf2e2e] text-white border-none rounded-xl px-6 py-4 cursor-pointer transition-all hover:bg-[#b91c1c] hover:scale-105 ml-2 flex items-center justify-center font-semibold"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 py-3">
            <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>Buscar rápido:</span>
            {['Taladro', 'Bosch', 'Sierra', 'Makita', 'Jardinería'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSearchSuggestion(suggestion)}
                className="border rounded-full px-4 py-2 text-sm cursor-pointer transition-all hover:-translate-y-0.5 font-medium"
                style={{ 
                  backgroundColor: 'rgba(236, 19, 19, 0.1)', 
                  borderColor: 'rgba(236, 19, 19, 0.3)',
                  color: '#ec1313'
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'power-tools', label: 'Eléctricas' },
              { id: 'hand-tools', label: 'Manuales' },
              { id: 'gardening', label: 'Jardinería' },
              { id: 'measurement', label: 'Medición' },
              { id: 'safety', label: 'Seguridad' },
              { id: 'professional', label: 'Profesionales' },
              { id: 'new', label: 'Novedades' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setCurrentFilter(filter.id);
                  if (filter.id === 'professional') {
                    setShowProfessionalInfo(true);
                  }
                  if (filter.id === 'new') {
                    setShowNewToolsInfo(true);
                  }
                }}
                className={`px-4 py-2 text-sm font-medium border-2 rounded-full transition-colors ${
                  currentFilter === filter.id
                    ? 'bg-[#cf2e2e] text-white border-[#cf2e2e]'
                    : ''
                }`}
                style={currentFilter !== filter.id ? { 
                  borderColor: 'var(--border-color)', 
                  color: 'var(--text-secondary)',
                  backgroundColor: 'transparent'
                } : {}}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <span className="mb-4 sm:mb-0" style={{ color: 'var(--text-secondary)' }}>
            {sortedProducts.length} herramienta{sortedProducts.length !== 1 ? 's' : ''} de {productos.length}
          </span>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>Ordenar por:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 rounded-lg text-sm focus:border-[#cf2e2e] focus:outline-none"
              style={{ 
                backgroundColor: 'var(--input-bg)', 
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="relevance">Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="power">Potencia</option>
              <option value="brand">Marca A-Z</option>
              <option value="discount">Mejor descuento</option>
              <option value="newest">Más nuevas</option>
            </select>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((producto) => (
              <div key={producto.id} 
                   className="border-2 rounded-xl overflow-hidden hover:border-[#cf2e2e] hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                   style={{ 
                     backgroundColor: 'var(--card-bg)', 
                     borderColor: 'var(--border-color)' 
                   }}>
                <div className="relative aspect-square overflow-hidden flex-shrink-0" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="absolute top-3 left-3 bg-[#cf2e2e] text-white text-xs font-bold px-2 py-1 rounded z-10">
                    {producto.descuento}% OFF
                  </div>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-base mb-2 line-clamp-2 h-12" style={{ color: 'var(--text-primary)' }}>
                    {producto.nombre}
                  </h3>
                  
                  <p className="text-sm mb-3 line-clamp-2 h-10" style={{ color: 'var(--text-secondary)' }}>
                    {producto.descripcion}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4 min-h-[60px]">
                    {producto.especificaciones.map((spec, index) => (
                      <div 
                        key={index} 
                        className={`flex items-center gap-1 text-xs text-white px-2 py-1 rounded-lg ${
                          spec.icono === 'bolt' && producto.potencia
                            ? getPowerColor(producto.potencia)
                            : 'bg-[#ec1313]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs">{spec.icono}</span>
                        <span className="whitespace-nowrap">{spec.texto}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="mb-3">
                      <span className="text-sm line-through" style={{ color: 'var(--text-tertiary)' }}>
                        ${producto.precioOriginal.toFixed(2)}
                      </span>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl font-black text-[#cf2e2e]">
                          ${producto.precio.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-xs text-green-600 font-medium mt-1">
                        ✓ Garantía 2 años
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(producto)}
                      className="w-full py-3 bg-[#cf2e2e] text-white font-bold rounded-lg hover:bg-[#b91c1c] transition-colors uppercase tracking-wider text-sm"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex flex-col items-center gap-5 max-w-md mx-auto">
              <span className="material-symbols-outlined text-7xl text-[#cf2e2e]">construction</span>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>No se encontraron herramientas</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Intenta con otros términos de búsqueda o ajusta los filtros</p>
              <button
                onClick={clearSearch}
                className="px-6 py-3 border-2 border-[#cf2e2e] text-[#cf2e2e] rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#cf2e2e] hover:text-white transition-colors"
                style={{ backgroundColor: 'transparent' }}
              >
                Mostrar todas
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-16 pt-16 border-t-2" style={{ borderColor: 'var(--border-color)' }}>
          <button className="px-8 py-4 border-2 border-[#cf2e2e] text-[#cf2e2e] rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#cf2e2e] hover:text-white transition-colors"
                  style={{ backgroundColor: 'transparent' }}>
            Ver más herramientas
          </button>
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
              Herramientas profesionales para trabajadores exigentes. Calidad y durabilidad garantizada.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Categorías</h4>
            <ul className="footer-links">
              {[
                { label: 'Herramientas Eléctricas', filter: 'power-tools' },
                { label: 'Herramientas Manuales', filter: 'hand-tools' },
                { label: 'Jardinería', filter: 'gardening' },
                { label: 'Medición', filter: 'measurement' },
                { label: 'Seguridad', filter: 'safety' },
                { label: 'Profesionales', filter: 'professional' }
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => setCurrentFilter(item.filter)}
                    className="footer-link"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Marcas</h4>
            <ul className="footer-links">
              {['Bosch', 'Makita', 'DEWALT', 'Stanley', 'Husqvarna', '3M', 'Black+Decker', 'Werner'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleSearchSuggestion(item)}
                    className="footer-link"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Garantía</h4>
            <p className="footer-description mb-4">
              Todas nuestras herramientas incluyen garantía de 2 años y soporte técnico especializado.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email para ofertas"
                className="px-5 py-3 text-sm rounded-sm focus:shadow-[0_0_0_1px_#ec1313] focus:outline-none"
                style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)' }}
              />
              <button className="bg-[#ec1313] text-white px-5 py-3 font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#dc2626] transition-colors">
                SUSCRIBIR
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2024 Tecommers Herramientas. Todos los derechos reservados.</p>
          <div className="footer-bottom-links">
            <Link to="/warranty" className="footer-bottom-link">Garantías</Link>
            <Link to="/support" className="footer-bottom-link">Soporte Técnico</Link>
            <Link to="/manuals" className="footer-bottom-link">Manuales</Link>
            <Link to="/contact" className="footer-bottom-link">Contacto</Link>
          </div>
        </div>
      </footer>

      {showNotification && (
        <div className="fixed bottom-5 right-5 p-4 rounded-lg shadow-xl z-50 flex items-center gap-3 max-w-sm animate-slide-in"
             style={{ backgroundColor: 'var(--card-bg)', borderLeft: '4px solid #cf2e2e' }}>
          <span className="material-symbols-outlined text-green-600">check_circle</span>
          <span style={{ color: 'var(--text-primary)' }}>{notificationMessage}</span>
        </div>
      )}

      {showProfessionalInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowProfessionalInfo(false)}>
          <div className="p-8 rounded-2xl max-w-md text-center shadow-2xl" 
               style={{ backgroundColor: 'var(--modal-bg)' }} 
               onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">engineering</span>
            <h4 className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>Herramientas Profesionales</h4>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Equipamiento de alta gama diseñado para uso intensivo, con mayor durabilidad, potencia y características avanzadas.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">auto_awesome</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Uso Intensivo</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">verified</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Garantía Extendida</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">rocket_launch</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Máximo Rendimiento</span>
              </div>
            </div>
            <button
              onClick={() => setShowProfessionalInfo(false)}
              className="bg-[#cf2e2e] text-white border-none px-8 py-3 rounded-lg cursor-pointer font-medium hover:bg-[#b91c1c] transition-colors"
            >
              Ver herramientas pro
            </button>
          </div>
        </div>
      )}

      {showNewToolsInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowNewToolsInfo(false)}>
          <div className="p-8 rounded-2xl max-w-md text-center shadow-2xl" 
               style={{ backgroundColor: 'var(--modal-bg)' }} 
               onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">new_releases</span>
            <h4 className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>Nuevas Herramientas 2024</h4>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Últimos modelos con tecnología avanzada, mejoras de diseño y características innovadoras para mayor productividad.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">electric_bolt</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Tecnología Brushless</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">battery_charging_full</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Autonomía Mejorada</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">memory</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Electrónica Avanzada</span>
              </div>
            </div>
            <button
              onClick={() => setShowNewToolsInfo(false)}
              className="bg-[#cf2e2e] text-white border-none px-8 py-3 rounded-lg cursor-pointer font-medium hover:bg-[#b91c1c] transition-colors"
            >
              Ver novedades
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Herramientas;