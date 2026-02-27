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
  chip?: string;
  almacenamiento?: string;
  ram?: string;
  descuento: number;
  especificaciones: {
    icono: string;
    texto: string;
  }[];
}

const Tecnologia: React.FC = () => {
  const { addToCart, cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showLatestInfo, setShowLatestInfo] = useState(false);
  const [showGamingInfo, setShowGamingInfo] = useState(false);
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
      nombre: "iPhone 17 Pro Max",
      descripcion: "Smartphone flagship con chip A18 Pro, cámara triple 48MP, pantalla ProMotion 120Hz, 1TB.",
      precio: 1229.18,
      precioOriginal: 1499.00,
      imagen: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["smartphone", "latest"],
      marca: "Apple",
      chip: "A18 Pro",
      almacenamiento: "1TB",
      ram: "8GB",
      descuento: 18,
      especificaciones: [
        { icono: "memory", texto: "A18 Pro" },
        { icono: "storage", texto: "1TB" },
        { icono: "photo_camera", texto: "48MP" },
        { icono: "battery_full", texto: "5G" }
      ]
    },
    {
      id: 2,
      nombre: "Laptop Gaming ASUS ROG",
      descripcion: "Laptop gaming Intel i9, RTX 4080, 32GB RAM, 2TB SSD, pantalla QHD 240Hz, RGB per-key.",
      precio: 2261.22,
      precioOriginal: 2899.00,
      imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["laptop", "gaming"],
      marca: "ASUS",
      chip: "i9",
      almacenamiento: "2TB",
      ram: "32GB",
      descuento: 22,
      especificaciones: [
        { icono: "memory", texto: "i9 + 32GB" },
        { icono: "videogame_asset", texto: "RTX 4080" },
        { icono: "storage", texto: "2TB SSD" },
        { icono: "monitor", texto: "QHD 240Hz" }
      ]
    },
    {
      id: 3,
      nombre: "Samsung Galaxy Tab S9 Ultra",
      descripcion: "Tablet premium 14.6\", Snapdragon 8 Gen 2, 12GB RAM, 512GB, S Pen incluido, AMOLED 120Hz.",
      precio: 1019.15,
      precioOriginal: 1199.00,
      imagen: "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["tablet", "latest"],
      marca: "Samsung",
      chip: "8 Gen 2",
      almacenamiento: "512GB",
      ram: "12GB",
      descuento: 15,
      especificaciones: [
        { icono: "memory", texto: "8 Gen 2" },
        { icono: "tablet", texto: "14.6\" AMOLED" },
        { icono: "storage", texto: "512GB" },
        { icono: "draw", texto: "S Pen" }
      ]
    },
    {
      id: 4,
      nombre: "Apple Watch Series 9",
      descripcion: "Smartwatch 45mm, chip S9, monitor ECG, SpO2, siempre encendido, GPS, resistencia al agua.",
      precio: 377.52,
      precioOriginal: 429.00,
      imagen: "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["wearable", "latest"],
      marca: "Apple",
      descuento: 12,
      especificaciones: [
        { icono: "watch", texto: "45mm" },
        { icono: "monitor_heart", texto: "ECG + SpO2" },
        { icono: "water_drop", texto: "50m" },
        { icono: "battery_full", texto: "18h" }
      ]
    },
    {
      id: 5,
      nombre: "Sony WH-1000XM5",
      descripcion: "Audífonos noise cancelling premium, batería 30h, sonido Hi-Res, 8 micrófonos, compatibilidad LDAC.",
      precio: 319.20,
      precioOriginal: 399.00,
      imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["audio"],
      marca: "Sony",
      descuento: 20,
      especificaciones: [
        { icono: "headphones", texto: "Noise Cancelling" },
        { icono: "battery_full", texto: "30 horas" },
        { icono: "graphic_eq", texto: "Hi-Res Audio" },
        { icono: "mic", texto: "8 micrófonos" }
      ]
    },
    {
      id: 6,
      nombre: "Google Pixel 8 Pro",
      descripcion: "Smartphone con Tensor G3, cámara 50MP, Magic Editor, 7 años de actualizaciones, 256GB.",
      precio: 819.18,
      precioOriginal: 999.00,
      imagen: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["smartphone", "latest"],
      marca: "Google",
      chip: "Tensor G3",
      almacenamiento: "256GB",
      ram: "12GB",
      descuento: 18,
      especificaciones: [
        { icono: "memory", texto: "Tensor G3" },
        { icono: "photo_camera", texto: "50MP + IA" },
        { icono: "storage", texto: "256GB" },
        { icono: "update", texto: "7 años OS" }
      ]
    },
    {
      id: 7,
      nombre: "MacBook Pro 16\" M3 Max",
      descripcion: "Laptop profesional M3 Max, 64GB RAM, 2TB SSD, pantalla Liquid Retina XDR, batería 22h.",
      precio: 2974.15,
      precioOriginal: 3499.00,
      imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["laptop", "latest"],
      marca: "Apple",
      chip: "M3 Max",
      almacenamiento: "2TB",
      ram: "64GB",
      descuento: 15,
      especificaciones: [
        { icono: "memory", texto: "M3 Max" },
        { icono: "storage", texto: "2TB SSD" },
        { icono: "monitor", texto: "XDR 120Hz" },
        { icono: "battery_full", texto: "22 horas" }
      ]
    },
    {
      id: 8,
      nombre: "Meta Quest 3 512GB",
      descripcion: "VR headset standalone, resolución 4K+, procesador Snapdragon XR2 Gen 2, 512GB, mixed reality.",
      precio: 486.75,
      precioOriginal: 649.00,
      imagen: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["gaming", "latest"],
      marca: "Meta",
      chip: "XR2 Gen 2",
      almacenamiento: "512GB",
      ram: "12GB",
      descuento: 25,
      especificaciones: [
        { icono: "memory", texto: "XR2 Gen 2" },
        { icono: "visibility", texto: "4K+ per eye" },
        { icono: "storage", texto: "512GB" },
        { icono: "view_in_ar", texto: "Mixed Reality" }
      ]
    }
  ];

  const filteredProducts = productos.filter(producto => {
    const matchesSearch = searchTerm === '' || 
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (producto.chip && producto.chip.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (producto.almacenamiento && producto.almacenamiento.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter = currentFilter === 'all' || 
      (currentFilter === 'latest' ? producto.categoria.includes('latest') : producto.categoria.includes(currentFilter));

    return matchesSearch && matchesFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-asc':
        return a.precio - b.precio;
      case 'price-desc':
        return b.precio - a.precio;
      case 'performance':
        return (b.precioOriginal - b.precio) - (a.precioOriginal - a.precio);
      case 'newest':
        return b.id - a.id;
      case 'brand':
        return a.marca.localeCompare(b.marca);
      default:
        return 0;
    }
  });

  const handleAddToCart = (producto: Producto) => {
    addToCart(producto, 'tecnologia');
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
            Tecnología
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Innovación y rendimiento al alcance de tu mano
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
              placeholder="Buscar smartphones, laptops, tablets, wearables, marcas..."
              className="flex-1 border-none outline-none text-lg py-4 font-medium"
              style={{ 
                backgroundColor: 'transparent', 
                color: 'var(--text-primary)',
                placeholder: { color: 'var(--text-tertiary)' }
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
            {['iPhone', 'Samsung', 'Gaming', 'Apple Watch', 'Audífonos'].map((suggestion) => (
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
              { id: 'smartphone', label: 'Smartphones' },
              { id: 'laptop', label: 'Laptops' },
              { id: 'tablet', label: 'Tablets' },
              { id: 'gaming', label: 'Gaming' },
              { id: 'wearable', label: 'Wearables' },
              { id: 'audio', label: 'Audio' },
              { id: 'latest', label: 'Últimos modelos' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setCurrentFilter(filter.id);
                  if (filter.id === 'latest') {
                    setShowLatestInfo(true);
                  }
                  if (filter.id === 'gaming') {
                    setShowGamingInfo(true);
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
            {sortedProducts.length} producto{sortedProducts.length !== 1 ? 's' : ''} de {productos.length}
          </span>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm" style={{ color: 'var(--text-secondary)' }}>Ordenar por:</label>
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
              <option value="performance">Rendimiento</option>
              <option value="newest">Más nuevos</option>
              <option value="brand">Marca A-Z</option>
            </select>
          </div>
        </div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((producto) => (
              <div key={producto.id} 
                   className="border-2 rounded-xl overflow-hidden hover:border-[#cf2e2e] hover:shadow-xl transition-all duration-300"
                   style={{ 
                     backgroundColor: 'var(--card-bg)', 
                     borderColor: 'var(--border-color)' 
                   }}>
                <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <div className="absolute top-3 left-3 bg-[#cf2e2e] text-white text-xs font-bold px-2 py-1 rounded z-10">
                    {producto.descuento}% OFF
                  </div>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-base mb-2 line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                    {producto.nombre}
                  </h3>
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {producto.descripcion}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {producto.especificaciones.map((spec, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs text-white bg-[#ec1313] px-2 py-1 rounded-lg">
                        <span className="material-symbols-outlined text-xs">{spec.icono}</span>
                        <span className="whitespace-nowrap">{spec.texto}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <span className="text-sm line-through" style={{ color: 'var(--text-tertiary)' }}>
                      ${producto.precioOriginal.toFixed(2)}
                    </span>
                    <div className="flex items-end gap-2">
                      <p className="text-2xl font-black text-[#cf2e2e]">
                        ${producto.precio.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-xs text-[#cf2e2e] font-medium mt-1">
                      ✓ Garantía extendida 2 años
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
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="flex flex-col items-center gap-5 max-w-md mx-auto">
              <span className="material-symbols-outlined text-7xl text-[#cf2e2e]">devices</span>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>No se encontraron productos</h3>
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
            Ver catálogo completo
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
              Tecnología de vanguardia para potenciar tu productividad, entretenimiento y conectividad.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Categorías</h4>
            <ul className="footer-links">
              <li><button onClick={() => setCurrentFilter('smartphone')} className="footer-link">Smartphones</button></li>
              <li><button onClick={() => setCurrentFilter('laptop')} className="footer-link">Laptops</button></li>
              <li><button onClick={() => setCurrentFilter('tablet')} className="footer-link">Tablets</button></li>
              <li><button onClick={() => setCurrentFilter('gaming')} className="footer-link">Gaming</button></li>
              <li><button onClick={() => setCurrentFilter('wearable')} className="footer-link">Wearables</button></li>
              <li><button onClick={() => setCurrentFilter('audio')} className="footer-link">Audio</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Marcas</h4>
            <ul className="footer-links">
              <li><button onClick={() => handleSearchSuggestion('Apple')} className="footer-link">Apple</button></li>
              <li><button onClick={() => handleSearchSuggestion('Samsung')} className="footer-link">Samsung</button></li>
              <li><button onClick={() => handleSearchSuggestion('Google')} className="footer-link">Google</button></li>
              <li><button onClick={() => handleSearchSuggestion('Sony')} className="footer-link">Sony</button></li>
              <li><button onClick={() => handleSearchSuggestion('ASUS')} className="footer-link">ASUS</button></li>
              <li><button onClick={() => handleSearchSuggestion('Meta')} className="footer-link">Meta</button></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Soporte Técnico</h4>
            <p className="footer-description mb-4">
              Configuración, garantía extendida, reparaciones y soporte técnico especializado.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email para lanzamientos"
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
          <p className="copyright">© 2024 Tecommers Tecnología. Innovación certificada.</p>
          <div className="footer-bottom-links">
            <Link to="/warranty" className="footer-bottom-link">Garantías</Link>
            <Link to="/support" className="footer-bottom-link">Soporte Técnico</Link>
            <Link to="/financing" className="footer-bottom-link">Financiamiento</Link>
            <Link to="/trade-in" className="footer-bottom-link">Trade-in</Link>
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

      {showLatestInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowLatestInfo(false)}>
          <div className="p-8 rounded-2xl max-w-md text-center shadow-2xl" 
               style={{ backgroundColor: 'var(--modal-bg)' }} 
               onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">new_releases</span>
            <h4 className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>Últimos Modelos 2024</h4>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Tecnología de vanguardia con las especificaciones más avanzadas del mercado.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">rocket_launch</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Procesadores más potentes</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">photo_camera</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Cámaras con IA avanzada</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">battery_full</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Autonomía mejorada</span>
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

      {showGamingInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowGamingInfo(false)}>
          <div className="p-8 rounded-2xl max-w-md text-center shadow-2xl" 
               style={{ backgroundColor: 'var(--modal-bg)' }} 
               onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">stadia_controller</span>
            <h4 className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>Equipo Gaming Profesional</h4>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Hardware optimizado para gaming con altas tasas de refresco y rendimiento extremo.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">speed</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>≥ 144Hz Refresh Rate</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">memory</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>RTX 40 Series</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">keyboard</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Teclado Mecánico RGB</span>
              </div>
            </div>
            <button
              onClick={() => setShowGamingInfo(false)}
              className="bg-[#cf2e2e] text-white border-none px-8 py-3 rounded-lg cursor-pointer font-medium hover:bg-[#b91c1c] transition-colors"
            >
              Ver gaming
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tecnologia;