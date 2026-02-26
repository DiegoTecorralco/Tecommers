import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showProfessionalInfo, setShowProfessionalInfo] = useState(false);
  const [showNewToolsInfo, setShowNewToolsInfo] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 h-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <svg className="h-10 w-auto" viewBox="0 0 160 120">
              <path d="M10 20H80L65 50H45L30 110H10L25 50H10V20Z" fill="#cf2e2e" />
              <path d="M50 55H78L75 73H47L50 55Z" fill="black" />
              <path d="M43 85H71L68 103H40L43 85Z" fill="#cf2e2e" />
            </svg>
            <span className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a] -ml-3">
              TECOMMERS
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors text-sm py-2 relative">
              Home
            </Link>
            <Link to="/categories" className="text-[#cf2e2e] font-bold hover:text-[#ec1313] transition-colors text-sm py-2 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#ec1313]">
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
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-[#1a1a1a] mb-4">
            Herramientas
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Calidad profesional para cada proyecto
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center bg-white border-3 border-[#cf2e2e] rounded-2xl p-3 mb-4 transition-all focus-within:shadow-[0_12px_30px_rgba(207,46,46,0.25)] focus-within:-translate-y-0.5">
            <span className="material-symbols-outlined text-[#cf2e2e] mx-4 text-3xl">search</span>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar taladros, sierras, llaves, marcas, tipo..."
              className="flex-1 border-none outline-none text-lg py-4 text-[#1a1a1a] font-medium placeholder:text-slate-400"
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
            <span className="text-sm text-slate-500 font-medium">Buscar rápido:</span>
            {['Taladro', 'Bosch', 'Sierra', 'Makita', 'Jardinería'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSearchSuggestion(suggestion)}
                className="bg-[#fee] border border-[#fcc] rounded-full px-4 py-2 text-sm text-[#cf2e2e] cursor-pointer transition-all hover:bg-[#fdd] hover:-translate-y-0.5 font-medium"
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
                    : 'border-gray-200 text-gray-700 hover:border-[#cf2e2e] hover:text-[#cf2e2e]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <span className="text-gray-600 mb-4 sm:mb-0">
            {sortedProducts.length} herramienta{sortedProducts.length !== 1 ? 's' : ''} de {productos.length}
          </span>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm text-gray-600 whitespace-nowrap">Ordenar por:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-[#cf2e2e] focus:outline-none"
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
              <div key={producto.id} className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-[#cf2e2e] hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="relative aspect-square overflow-hidden bg-gray-100 flex-shrink-0">
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
                  <h3 className="font-bold text-base mb-2 line-clamp-2 h-12">
                    {producto.nombre}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
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
                      <span className="text-sm text-gray-400 line-through">
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
              <h3 className="text-2xl font-bold text-[#1a1a1a]">No se encontraron herramientas</h3>
              <p className="text-gray-600">Intenta con otros términos de búsqueda o ajusta los filtros</p>
              <button
                onClick={clearSearch}
                className="px-6 py-3 bg-white text-[#cf2e2e] border-2 border-[#cf2e2e] rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#cf2e2e] hover:text-white transition-colors"
              >
                Mostrar todas
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-16 pt-16 border-t-2 border-gray-200">
          <button className="px-8 py-4 bg-white text-[#cf2e2e] border-2 border-[#cf2e2e] rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#cf2e2e] hover:text-white transition-colors">
            Ver más herramientas
          </button>
        </div>
      </main>

      <footer className="bg-[#1a1a1a] text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="relative w-[42px] h-8 flex items-center scale-[0.75] origin-left">
                  <div className="absolute left-0 w-full h-full bg-[#ec1313] clip-path-[polygon(10%_0,90%_0,80%_25%,55%_25%,45%_100%,25%_100%,35%_25%,0_25%)]"></div>
                  <div className="absolute right-0 top-[40%] w-[35%] flex flex-col gap-[3px]">
                    <div className="h-[5px] bg-white/40 skew-x-[-15deg]"></div>
                    <div className="h-[5px] bg-[#ec1313] skew-x-[-15deg]"></div>
                  </div>
                </div>
                <span className="text-xl font-black -tracking-wide text-white">TECOMMERS</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Herramientas profesionales para trabajadores exigentes. Calidad y durabilidad garantizada.
              </p>
            </div>

            <div>
              <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs border-b border-white/10 pb-4">
                Categorías
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm font-medium">
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
                      className="hover:text-[#ec1313] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs border-b border-white/10 pb-4">
                Marcas
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm font-medium">
                {['Bosch', 'Makita', 'DEWALT', 'Stanley', 'Husqvarna', '3M', 'Black+Decker', 'Werner'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleSearchSuggestion(item)}
                      className="hover:text-[#ec1313] transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs border-b border-white/10 pb-4">
                Garantía
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Todas nuestras herramientas incluyen garantía de 2 años y soporte técnico especializado.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email para ofertas"
                  className="bg-white/5 border-none px-5 py-3 text-sm text-white rounded-sm focus:shadow-[0_0_0_1px_#ec1313] focus:outline-none"
                />
                <button className="bg-[#ec1313] px-5 py-3 font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#dc2626] transition-colors">
                  SUSCRIBIR
                </button>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
              © 2024 Tecommers Herramientas. Todos los derechos reservados.
            </p>
            <div className="flex gap-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Garantías</a>
              <a href="#" className="hover:text-white transition-colors">Soporte Técnico</a>
              <a href="#" className="hover:text-white transition-colors">Manuales</a>
              <a href="#" className="hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>

      {showNotification && (
        <div className="fixed bottom-5 right-5 bg-white border-l-4 border-[#cf2e2e] p-4 rounded-lg shadow-xl z-50 flex items-center gap-3 max-w-sm animate-slide-in">
          <span className="material-symbols-outlined text-green-600">check_circle</span>
          <span className="text-gray-800">{notificationMessage}</span>
        </div>
      )}

      {showProfessionalInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowProfessionalInfo(false)}>
          <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">engineering</span>
            <h4 className="text-2xl text-gray-800 mb-4">Herramientas Profesionales</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Equipamiento de alta gama diseñado para uso intensivo, con mayor durabilidad, potencia y características avanzadas.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">auto_awesome</span>
                <span className="text-xs text-[#b91c1c] font-medium">Uso Intensivo</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">verified</span>
                <span className="text-xs text-[#b91c1c] font-medium">Garantía Extendida</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">rocket_launch</span>
                <span className="text-xs text-[#b91c1c] font-medium">Máximo Rendimiento</span>
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
          <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">new_releases</span>
            <h4 className="text-2xl text-gray-800 mb-4">Nuevas Herramientas 2024</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Últimos modelos con tecnología avanzada, mejoras de diseño y características innovadoras para mayor productividad.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">electric_bolt</span>
                <span className="text-xs text-[#b91c1c] font-medium">Tecnología Brushless</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">battery_charging_full</span>
                <span className="text-xs text-[#b91c1c] font-medium">Autonomía Mejorada</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">memory</span>
                <span className="text-xs text-[#b91c1c] font-medium">Electrónica Avanzada</span>
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