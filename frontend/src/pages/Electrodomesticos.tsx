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
  eficiencia?: string;
  capacidad?: string;
  modelo?: string;  
  descuento: number;
  especificaciones: {
    icono: string;
    texto: string;
  }[];
}

const Electrodomesticos: React.FC = () => {
  const { addToCart, cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showEfficiencyInfo, setShowEfficiencyInfo] = useState(false);
  const [showLatestInfo, setShowLatestInfo] = useState(false);
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
      nombre: "Refrigerador LG Side by Side",
      descripcion: "Refrigerador inteligente 635L, energía A++, dispensador de agua y hielo, pantalla táctil, WiFi.",
      precio: 2049.18,
      precioOriginal: 2499.00,
      imagen: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["kitchen", "smart", "latest"],
      marca: "LG",
      eficiencia: "A++",
      capacidad: "635L",
      modelo: "2024",
      descuento: 18,
      especificaciones: [
        { icono: "energy_savings_leaf", texto: "A++" },
        { icono: "water_drop", texto: "635L" },
        { icono: "smartphone", texto: "Smart" },
        { icono: "icecream", texto: "Dispensador" }
      ]
    },
    {
      id: 2,
      nombre: "Lavadora Samsung 18kg",
      descripcion: "Lavadora carga frontal 18kg, A+++, tecnología EcoBubble, motor Digital Inverter, control WiFi.",
      precio: 701.22,
      precioOriginal: 899.00,
      imagen: "https://images.unsplash.com/photo-1626806787461-102c1a6a5e5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["laundry", "energy-a", "latest"],
      marca: "Samsung",
      eficiencia: "A+++",
      capacidad: "18kg",
      modelo: "2024",
      descuento: 22,
      especificaciones: [
        { icono: "energy_savings_leaf", texto: "A+++" },
        { icono: "weight", texto: "18kg" },
        { icono: "speed", texto: "1400 RPM" },
        { icono: "wifi", texto: "WiFi" }
      ]
    },
    {
      id: 3,
      nombre: "Cocina Inducción Mabe 5 quemadores",
      descripcion: "Cocina de inducción 5 quemadores, vidrio templado, temporizador digital, seguridad infantil.",
      precio: 594.15,
      precioOriginal: 699.00,
      imagen: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["kitchen", "smart"],
      marca: "Mabe",
      eficiencia: "A",
      modelo: "2023",
      descuento: 15,
      especificaciones: [
        { icono: "fireplace", texto: "5 quemadores" },
        { icono: "electric_bolt", texto: "Inducción" },
        { icono: "safety_divider", texto: "Seguridad" },
        { icono: "timer", texto: "Digital" }
      ]
    },
    {
      id: 4,
      nombre: "Aire Acondicionado Daikin 12,000 BTU",
      descripcion: "Split inverter 12,000 BTU, A+++, tecnología Flash Streamer, modo silencioso, WiFi, timer 24h.",
      precio: 636.75,
      precioOriginal: 849.00,
      imagen: "https://images.unsplash.com/photo-1612840666551-ee4652c7c852?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["climate", "energy-a", "latest"],
      marca: "Daikin",
      eficiencia: "A+++",
      capacidad: "12000 BTU",
      modelo: "2024",
      descuento: 25,
      especificaciones: [
        { icono: "energy_savings_leaf", texto: "A+++" },
        { icono: "ac_unit", texto: "12K BTU" },
        { icono: "wifi", texto: "WiFi" },
        { icono: "volume_off", texto: "Silencioso" }
      ]
    },
    {
      id: 5,
      nombre: "Microondas Panasonic Grill 32L",
      descripcion: "Microondas con grill 32L, 1100W, 37 programas automáticos, panel de control táctil, descongelar.",
      precio: 175.12,
      precioOriginal: 199.00,
      imagen: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["kitchen", "small"],
      marca: "Panasonic",
      capacidad: "32L",
      modelo: "2023",
      descuento: 12,
      especificaciones: [
        { icono: "microwave", texto: "1100W" },
        { icono: "straighten", texto: "32L" },
        { icono: "local_fire_department", texto: "Grill" },
        { icono: "touch_app", texto: "Táctil" }
      ]
    },
    {
      id: 6,
      nombre: "Secadora Whirlpool 9kg",
      descripcion: "Secadora de condensación 9kg, A++, sensor de humedad, 15 programas, filtro autoclean.",
      precio: 599.20,
      precioOriginal: 749.00,
      imagen: "https://images.unsplash.com/photo-1626806787461-102c1a6a5e5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["laundry", "smart"],
      marca: "Whirlpool",
      eficiencia: "A++",
      capacidad: "9kg",
      modelo: "2023",
      descuento: 20,
      especificaciones: [
        { icono: "energy_savings_leaf", texto: "A++" },
        { icono: "weight", texto: "9kg" },
        { icono: "sensors", texto: "Sensor" },
        { icono: "cleaning_services", texto: "AutoClean" }
      ]
    },
    {
      id: 7,
      nombre: "Robot Aspirador iRobot Roomba",
      descripcion: "Robot aspirador inteligente, mapeo láser, control por app, auto recarga, para mascotas.",
      precio: 419.30,
      precioOriginal: 599.00,
      imagen: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["small", "smart", "latest"],
      marca: "iRobot",
      modelo: "2024",
      descuento: 30,
      especificaciones: [
        { icono: "smart_toy", texto: "Inteligente" },
        { icono: "radar", texto: "Mapeo" },
        { icono: "app_registration", texto: "App" },
        { icono: "pets", texto: "Mascotas" }
      ]
    },
    {
      id: 8,
      nombre: "Purificador de Aire Xiaomi Pro",
      descripcion: "Purificador de aire 48m², 4 filtros HEPA, control por app, sensor de calidad de aire.",
      precio: 245.18,
      precioOriginal: 299.00,
      imagen: "https://images.unsplash.com/photo-1622484211145-72ae948e2575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["small", "smart", "climate"],
      marca: "Xiaomi",
      modelo: "2023",
      descuento: 18,
      especificaciones: [
        { icono: "air", texto: "48m²" },
        { icono: "filter_alt", texto: "4 filtros" },
        { icono: "monitor_heart", texto: "Sensor" },
        { icono: "dark_mode", texto: "Noche" }
      ]
    }
  ];

  const filteredProducts = productos.filter(producto => {
    const matchesSearch = searchTerm === '' || 
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.eficiencia && producto.eficiencia.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (producto.capacidad && producto.capacidad.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = currentFilter === 'all' || 
      (currentFilter === 'energy-a' ? producto.eficiencia?.includes('A++') : 
       currentFilter === 'latest' ? producto.modelo === '2024' :
       producto.categoria.includes(currentFilter));

    return matchesSearch && matchesFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-asc':
        return a.precio - b.precio;
      case 'price-desc':
        return b.precio - a.precio;
      case 'efficiency':
        return (b.eficiencia?.length || 0) - (a.eficiencia?.length || 0);
      case 'capacity':
        const aCap = a.capacidad ? parseFloat(a.capacidad.replace(/[^0-9.-]+/g, '')) : 0;
        const bCap = b.capacidad ? parseFloat(b.capacidad.replace(/[^0-9.-]+/g, '')) : 0;
        return bCap - aCap;
      case 'newest':
        return (b.modelo || '0').localeCompare(a.modelo || '0');
      case 'brand':
        return a.marca.localeCompare(b.marca);
      default:
        return 0;
    }
  });

  const handleAddToCart = (producto: Producto) => {
    addToCart(producto, 'electrodomesticos');
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

  const getEfficiencyColor = (eficiencia?: string) => {
    switch(eficiencia) {
      case 'A+++':
        return 'bg-gradient-to-r from-green-600 to-green-500';
      case 'A++':
        return 'bg-gradient-to-r from-green-500 to-green-400';
      case 'A+':
        return 'bg-gradient-to-r from-green-400 to-emerald-300';
      default:
        return 'bg-[#ec1313]';
    }
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
            Electrodomésticos
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Tecnología y eficiencia para tu hogar
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
              placeholder="Buscar refrigeradores, lavadoras, cocinas, aires, marcas..."
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
            {['Refrigerador', 'Lavadora', 'LG', 'Samsung', 'Aire Acondicionado'].map((suggestion) => (
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
              { id: 'all', label: 'Todos' },
              { id: 'kitchen', label: 'Cocina' },
              { id: 'laundry', label: 'Lavandería' },
              { id: 'climate', label: 'Climatización' },
              { id: 'small', label: 'Pequeños' },
              { id: 'smart', label: 'Inteligentes' },
              { id: 'energy-a', label: 'A+++' },
              { id: 'latest', label: 'Últimos modelos' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setCurrentFilter(filter.id);
                  if (filter.id === 'energy-a') {
                    setShowEfficiencyInfo(true);
                  }
                  if (filter.id === 'latest') {
                    setShowLatestInfo(true);
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
            {sortedProducts.length} electrodoméstico{sortedProducts.length !== 1 ? 's' : ''} de {productos.length}
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
              <option value="efficiency">Eficiencia energética</option>
              <option value="capacity">Capacidad</option>
              <option value="newest">Más nuevos</option>
              <option value="brand">Marca A-Z</option>
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
                          spec.icono === 'energy_savings_leaf' && producto.eficiencia
                            ? getEfficiencyColor(spec.texto)
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
                        ✓ Incluye instalación profesional
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
              <span className="material-symbols-outlined text-7xl text-[#cf2e2e]">kitchen</span>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>No se encontraron electrodomésticos</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Intenta con otros términos de búsqueda o ajusta los filtros</p>
              <button
                onClick={clearSearch}
                className="px-6 py-3 border-2 border-[#cf2e2e] text-[#cf2e2e] rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#cf2e2e] hover:text-white transition-colors"
                style={{ backgroundColor: 'transparent' }}
              >
                Mostrar todos
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-16 pt-16 border-t-2" style={{ borderColor: 'var(--border-color)' }}>
          <button className="px-8 py-4 border-2 border-[#cf2e2e] text-[#cf2e2e] rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#cf2e2e] hover:text-white transition-colors"
                  style={{ backgroundColor: 'transparent' }}>
            Ver más electrodomésticos
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
              Electrodomésticos inteligentes para un hogar eficiente. Tecnología que simplifica tu vida.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Categorías</h4>
            <ul className="footer-links">
              {[
                { label: 'Cocina', filter: 'kitchen' },
                { label: 'Lavandería', filter: 'laundry' },
                { label: 'Climatización', filter: 'climate' },
                { label: 'Pequeños', filter: 'small' },
                { label: 'Inteligentes', filter: 'smart' },
                { label: 'Eficiencia A+++', filter: 'energy-a' }
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
              {['LG', 'Samsung', 'Mabe', 'Daikin', 'Whirlpool', 'Xiaomi', 'Panasonic', 'iRobot'].map((item) => (
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
            <h4 className="footer-heading">Servicios</h4>
            <p className="footer-description mb-4">
              Instalación profesional, garantía extendida y soporte técnico especializado.
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
          <p className="copyright">© 2024 Tecommers Electrodomésticos. Garantía y servicio incluidos.</p>
          <div className="footer-bottom-links">
            <Link to="/installation" className="footer-bottom-link">Instalación</Link>
            <Link to="/warranty" className="footer-bottom-link">Garantías</Link>
            <Link to="/financing" className="footer-bottom-link">Financiamiento</Link>
            <Link to="/pickup" className="footer-bottom-link">Retiro viejo</Link>
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

      {showEfficiencyInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowEfficiencyInfo(false)}>
          <div className="p-8 rounded-2xl max-w-md text-center shadow-2xl" 
               style={{ backgroundColor: 'var(--modal-bg)' }} 
               onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-green-600 mb-5">info</span>
            <h4 className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>Eficiencia Energética A+++</h4>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Los electrodomésticos con clasificación A+++ consumen hasta un 60% menos de energía que los de clase A, reduciendo significativamente tu factura eléctrica.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-green-600">savings</span>
                <span className="text-xs font-medium text-green-600">Ahorro hasta 60%</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-green-600">recycling</span>
                <span className="text-xs font-medium text-green-600">Ecológico</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-green-600">verified</span>
                <span className="text-xs font-medium text-green-600">Certificación UE</span>
              </div>
            </div>
            <button
              onClick={() => setShowEfficiencyInfo(false)}
              className="bg-[#cf2e2e] text-white border-none px-8 py-3 rounded-lg cursor-pointer font-medium hover:bg-[#b91c1c] transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {showLatestInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowLatestInfo(false)}>
          <div className="p-8 rounded-2xl max-w-md text-center shadow-2xl" 
               style={{ backgroundColor: 'var(--modal-bg)' }} 
               onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">new_releases</span>
            <h4 className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>Últimos Modelos 2024</h4>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Electrodomésticos con la tecnología más avanzada, diseño innovador y las mejores características del mercado.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">wifi</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Conectividad IoT</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">auto_awesome</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Inteligencia Artificial</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">design_services</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Diseño Premium</span>
              </div>
            </div>
            <button
              onClick={() => setShowLatestInfo(false)}
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

export default Electrodomesticos;