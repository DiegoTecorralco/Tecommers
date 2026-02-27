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
  material: string;
  estilo: string;
  modelo?: string;
  descuento: number;
  especificaciones: {
    icono: string;
    texto: string;
  }[];
}

const MueblesHogar: React.FC = () => {
  const { addToCart, cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showEcoInfo, setShowEcoInfo] = useState(false);
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
      nombre: "Sofá Seccional Moderno",
      descripcion: "Sofá seccional 5 plazas en tela premium, diseño modular, patas de madera maciza, chaise longue.",
      precio: 974.25,
      precioOriginal: 1299.00,
      imagen: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["living", "latest"],
      material: "tela",
      estilo: "moderno",
      modelo: "2024",
      descuento: 25,
      especificaciones: [
        { icono: "chair", texto: "5 plazas" },
        { icono: "palette", texto: "Tela Premium" },
        { icono: "forest", texto: "Madera Maciza" },
        { icono: "weekend", texto: "Modular" }
      ]
    },
    {
      id: 2,
      nombre: "Cama King Size Roble",
      descripcion: "Cama king size en roble macizo, diseño rústico moderno, cabecera acolchada, estructura reforzada.",
      precio: 719.20,
      precioOriginal: 899.00,
      imagen: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["bedroom", "latest"],
      material: "madera",
      estilo: "rustico",
      modelo: "2024",
      descuento: 20,
      especificaciones: [
        { icono: "bed", texto: "King Size" },
        { icono: "forest", texto: "Roble Macizo" },
        { icono: "straighten", texto: "200x200 cm" },
        { icono: "king_bed", texto: "Cabecera Acolchada" }
      ]
    },
    {
      id: 3,
      nombre: "Mesa Comedor Extensible",
      descripcion: "Mesa de comedor extensible de vidrio templado, base de acero inoxidable, para 6-8 personas, fácil limpieza.",
      precio: 509.15,
      precioOriginal: 599.00,
      imagen: "https://images.unsplash.com/photo-1604578762240-7e2f6361a0df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["dining"],
      material: "vidrio",
      estilo: "moderno",
      modelo: "2023",
      descuento: 15,
      especificaciones: [
        { icono: "table_restaurant", texto: "6-8 personas" },
        { icono: "diamond", texto: "Vidrio Templado" },
        { icono: "crop_din", texto: "Extensible" },
        { icono: "cleaning_services", texto: "Fácil limpieza" }
      ]
    },
    {
      id: 4,
      nombre: "Escritorio Ajustable",
      descripcion: "Escritorio de oficina con altura ajustable eléctrica, diseño industrial, cable management, superficie anti-rayas.",
      precio: 314.30,
      precioOriginal: 449.00,
      imagen: "https://images.unsplash.com/photo-1518455027359-f3f8164d6b9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["office", "latest"],
      material: "MDF",
      estilo: "industrial",
      modelo: "2024",
      descuento: 30,
      especificaciones: [
        { icono: "desk", texto: "Ajustable" },
        { icono: "settings", texto: "Eléctrico" },
        { icono: "cable", texto: "Cable Mgmt" },
        { icono: "shield", texto: "Anti-rayas" }
      ]
    },
    {
      id: 5,
      nombre: "Juego Terraza Rattan",
      descripcion: "Juego de terraza 5 piezas en rattan sintético, resistente a la intemperie, cojines incluidos, mesa central.",
      precio: 623.22,
      precioOriginal: 799.00,
      imagen: "https://images.unsplash.com/photo-1560185007-c5ca9d2c045d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["outdoor", "eco"],
      material: "rattan",
      estilo: "moderno",
      modelo: "2023",
      descuento: 22,
      especificaciones: [
        { icono: "deck", texto: "5 piezas" },
        { icono: "eco", texto: "Rattan Sintético" },
        { icono: "wb_sunny", texto: "Resistente" },
        { icono: "table_restaurant", texto: "Mesa Central" }
      ]
    },
    {
      id: 6,
      nombre: "Alfombra Persa Lana",
      descripcion: "Alfombra persa hecha a mano en lana natural, diseño tradicional, tamaño 3x2 metros, antialérgica.",
      precio: 286.18,
      precioOriginal: 349.00,
      imagen: "https://images.unsplash.com/photo-1581852017101-2eac541a11aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["decor"],
      material: "lana",
      estilo: "persa",
      modelo: "2023",
      descuento: 18,
      especificaciones: [
        { icono: "measuring_tape", texto: "3x2 metros" },
        { icono: "texture", texto: "Lana Natural" },
        { icono: "handshake", texto: "Hecha a mano" },
        { icono: "allergy", texto: "Antialérgica" }
      ]
    },
    {
      id: 7,
      nombre: "Lámpara de Pie Arco",
      descripcion: "Lámpara de pie estilo arco, base de mármol, luz LED regulable, altura ajustable, 3 modos de luz.",
      precio: 166.32,
      precioOriginal: 189.00,
      imagen: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["decor", "latest"],
      material: "metal",
      estilo: "minimalista",
      modelo: "2024",
      descuento: 12,
      especificaciones: [
        { icono: "lightbulb", texto: "LED Regulable" },
        { icono: "architecture", texto: "Diseño Arco" },
        { icono: "height", texto: "Altura Ajust." },
        { icono: "brightness_4", texto: "3 modos luz" }
      ]
    },
    {
      id: 8,
      nombre: "Mueble TV Escandinavo",
      descripcion: "Mueble para TV estilo escandinavo, almacenamiento abierto, diseño minimalista, hasta 65\", puertas corredizas.",
      precio: 263.20,
      precioOriginal: 329.00,
      imagen: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      categoria: ["living"],
      material: "MDP",
      estilo: "escandinavo",
      modelo: "2023",
      descuento: 20,
      especificaciones: [
        { icono: "tv", texto: "Hasta 65\"" },
        { icono: "shelves", texto: "Almacenamiento" },
        { icono: "design_services", texto: "Escandinavo" },
        { icono: "door_sliding", texto: "Puertas Corred." }
      ]
    }
  ];

  const filteredProducts = productos.filter(producto => {
    const matchesSearch = searchTerm === '' || 
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.estilo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = currentFilter === 'all' || 
      (currentFilter === 'eco' ? 
        (producto.categoria.includes('eco') || 
         producto.material.includes('rattan') || 
         producto.material.includes('lana')) :
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
      case 'popularity':
        return b.descuento - a.descuento;
      case 'newest':
        return (b.modelo || '0').localeCompare(a.modelo || '0');
      case 'material':
        const materialValues: Record<string, number> = {
          'madera': 5, 'roble': 5, 'lana': 5, 'tela': 4, 'rattan': 4, 'vidrio': 3, 'metal': 3, 'MDF': 2, 'MDP': 2
        };
        return (materialValues[b.material] || 0) - (materialValues[a.material] || 0);
      case 'style':
        return a.estilo.localeCompare(b.estilo);
      default:
        return 0;
    }
  });

  const handleAddToCart = (producto: Producto) => {
    addToCart(producto, 'muebles');
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

  const handleStyleClick = (estilo: string) => {
    setSearchTerm(estilo);
    setCurrentFilter('all');
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
            Muebles y Hogar
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Diseño, confort y estilo para cada espacio
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
              placeholder="Buscar sofás, mesas, dormitorios, decoración, estilos..."
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
            {['Sofá', 'Cama', 'Mesa', 'Moderno', 'Escandinavo'].map((suggestion) => (
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
              { id: 'living', label: 'Sala' },
              { id: 'bedroom', label: 'Dormitorio' },
              { id: 'dining', label: 'Comedor' },
              { id: 'office', label: 'Oficina' },
              { id: 'outdoor', label: 'Exterior' },
              { id: 'decor', label: 'Decoración' },
              { id: 'eco', label: 'Ecológicos' },
              { id: 'latest', label: 'Nuevos diseños' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setCurrentFilter(filter.id);
                  if (filter.id === 'eco') {
                    setShowEcoInfo(true);
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
            {sortedProducts.length} mueble{sortedProducts.length !== 1 ? 's' : ''} de {productos.length}
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
              <option value="popularity">Más populares</option>
              <option value="newest">Más nuevos</option>
              <option value="material">Calidad material</option>
              <option value="style">Estilo A-Z</option>
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
                        className="flex items-center gap-1 text-xs text-white bg-[#ec1313] px-2 py-1 rounded-lg"
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
                        ✓ Incluye armado profesional
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
              <span className="material-symbols-outlined text-7xl text-[#cf2e2e]">weekend</span>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>No se encontraron muebles</h3>
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
            Ver colección completa
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
              Diseño que transforma espacios. Muebles de calidad para un hogar con estilo y personalidad.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Habitaciones</h4>
            <ul className="footer-links">
              {[
                { label: 'Sala de Estar', filter: 'living' },
                { label: 'Dormitorio', filter: 'bedroom' },
                { label: 'Comedor', filter: 'dining' },
                { label: 'Oficina', filter: 'office' },
                { label: 'Exterior', filter: 'outdoor' },
                { label: 'Decoración', filter: 'decor' }
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
            <h4 className="footer-heading">Estilos</h4>
            <ul className="footer-links">
              {['Moderno', 'Escandinavo', 'Industrial', 'Rústico', 'Minimalista', 'Persa'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleStyleClick(item)}
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
              Diseño de interiores, armado profesional, entrega a domicilio y garantía de materiales.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email para novedades"
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
          <p className="copyright">© 2024 Tecommers Muebles y Hogar. Diseño y calidad certificada.</p>
          <div className="footer-bottom-links">
            <Link to="/interior-design" className="footer-bottom-link">Diseño de Interiores</Link>
            <Link to="/assembly" className="footer-bottom-link">Armado Profesional</Link>
            <Link to="/delivery" className="footer-bottom-link">Entrega</Link>
            <Link to="/warranty" className="footer-bottom-link">Garantías</Link>
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

      {showEcoInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowEcoInfo(false)}>
          <div className="p-8 rounded-2xl max-w-md text-center shadow-2xl" 
               style={{ backgroundColor: 'var(--modal-bg)' }} 
               onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-green-600 mb-5">eco</span>
            <h4 className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>Muebles Ecológicos</h4>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Productos fabricados con materiales sostenibles, procesos responsables y diseño consciente con el medio ambiente.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-green-600">forest</span>
                <span className="text-xs font-medium text-green-600">Maderas certificadas</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-green-600">recycling</span>
                <span className="text-xs font-medium text-green-600">Materiales reciclados</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-green-600">water_drop</span>
                <span className="text-xs font-medium text-green-600">Pinturas no tóxicas</span>
              </div>
            </div>
            <button
              onClick={() => setShowEcoInfo(false)}
              className="bg-[#cf2e2e] text-white border-none px-8 py-3 rounded-lg cursor-pointer font-medium hover:bg-[#b91c1c] transition-colors"
            >
              Ver colección
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
            <h4 className="text-2xl mb-4" style={{ color: 'var(--text-primary)' }}>Nuevos Diseños 2024</h4>
            <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Las últimas tendencias en mobiliario, con diseños innovadores, materiales premium y funcionalidad mejorada.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">trending_up</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Tendencias 2024</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">design_services</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Diseño Innovador</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'rgba(236, 19, 19, 0.1)' }}>
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">workspace_premium</span>
                <span className="text-xs font-medium" style={{ color: '#b91c1c' }}>Materiales Premium</span>
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

export default MueblesHogar;