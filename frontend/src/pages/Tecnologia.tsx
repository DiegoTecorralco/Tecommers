import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [cartCount, setCartCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showLatestInfo, setShowLatestInfo] = useState(false);
  const [showGamingInfo, setShowGamingInfo] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Filtrar productos
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

  // Ordenar productos
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
    setCartCount(prev => prev + 1);
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

  // Efecto para enfocar el input al cargar
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ================= NAVBAR ================= */}
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
            <button className="relative p-2.5 rounded-full bg-slate-100 text-gray-700 hover:text-[#ec1313] hover:bg-slate-200 transition-all w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ec1313] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link to="/register" className="p-2.5 rounded-full bg-slate-100 text-gray-700 hover:text-[#ec1313] hover:bg-slate-200 transition-all w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">person</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header de categoría */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-[#1a1a1a] mb-4">
            Tecnología
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Innovación y rendimiento al alcance de tu mano
          </p>
        </div>

        {/* Barra de búsqueda mejorada */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center bg-white border-3 border-[#cf2e2e] rounded-2xl p-3 mb-4 transition-all focus-within:shadow-[0_12px_30px_rgba(207,46,46,0.25)] focus-within:-translate-y-0.5">
            <span className="material-symbols-outlined text-[#cf2e2e] mx-4 text-3xl">search</span>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar smartphones, laptops, tablets, wearables, marcas..."
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

          {/* Sugerencias de búsqueda */}
          <div className="flex items-center flex-wrap gap-2.5 py-3">
            <span className="text-sm text-slate-500 font-medium">Buscar rápido:</span>
            {['iPhone', 'Samsung', 'Gaming', 'Apple Watch', 'Audífonos'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSearchSuggestion(suggestion)}
                className="bg-[#fee] border border-[#fcc] rounded-full px-4 py-2 text-sm text-[#cf2e2e] cursor-pointer transition-all hover:bg-[#fdd] hover:-translate-y-0.5 font-medium"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Filtros rápidos */}
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
                    : 'border-gray-200 text-gray-700 hover:border-[#cf2e2e] hover:text-[#cf2e2e]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Información de resultados */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <span className="text-gray-600 mb-4 sm:mb-0">
            {sortedProducts.length} producto{sortedProducts.length !== 1 ? 's' : ''} de {productos.length}
          </span>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm text-gray-600">Ordenar por:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-[#cf2e2e] focus:outline-none"
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

        {/* Grid de productos */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((producto) => (
              <div key={producto.id} className="bg-white border-2 border-gray-100 rounded-xl overflow-hidden hover:border-[#cf2e2e] hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
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
                  <h3 className="font-bold text-base mb-2 line-clamp-2">{producto.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{producto.descripcion}</p>
                  
                  {/* Especificaciones */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {producto.especificaciones.map((spec, index) => (
                      <div key={index} className="flex items-center gap-1 text-xs text-[#cf2e2e] bg-[#fee] px-2 py-1 rounded-lg border border-[#fcc]">
                        <span className="material-symbols-outlined text-xs">{spec.icono}</span>
                        <span className="whitespace-nowrap">{spec.texto}</span>
                      </div>
                    ))}
                  </div>

                  {/* Precio */}
                  <div className="mb-4">
                    <span className="text-sm text-gray-400 line-through">
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
          /* Mensaje sin resultados */
          <div className="text-center py-16">
            <div className="flex flex-col items-center gap-5 max-w-md mx-auto">
              <span className="material-symbols-outlined text-7xl text-[#cf2e2e]">devices</span>
              <h3 className="text-2xl font-bold text-[#1a1a1a]">No se encontraron productos</h3>
              <p className="text-gray-600">Intenta con otros términos de búsqueda o ajusta los filtros</p>
              <button
                onClick={clearSearch}
                className="px-6 py-3 bg-white text-[#cf2e2e] border-2 border-[#cf2e2e] rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#cf2e2e] hover:text-white transition-colors"
              >
                Mostrar todos
              </button>
            </div>
          </div>
        )}

        {/* Botón ver catálogo */}
        <div className="text-center mt-16 pt-16 border-t-2 border-gray-200">
          <button className="px-8 py-4 bg-white text-[#cf2e2e] border-2 border-[#cf2e2e] rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#cf2e2e] hover:text-white transition-colors">
            Ver catálogo completo
          </button>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#1a1a1a] text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            {/* Logo */}
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
                Tecnología de vanguardia para potenciar tu productividad, entretenimiento y conectividad.
              </p>
            </div>

            {/* Categorías */}
            <div>
              <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs border-b border-white/10 pb-4">
                Categorías
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm font-medium">
                {['Smartphones', 'Laptops', 'Tablets', 'Gaming', 'Wearables', 'Audio'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => setCurrentFilter(item.toLowerCase())}
                      className="hover:text-[#ec1313] transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Marcas */}
            <div>
              <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs border-b border-white/10 pb-4">
                Marcas
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm font-medium">
                {['Apple', 'Samsung', 'Google', 'Sony', 'ASUS', 'Meta'].map((item) => (
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

            {/* Soporte */}
            <div>
              <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs border-b border-white/10 pb-4">
                Soporte Técnico
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Configuración, garantía extendida, reparaciones y soporte técnico especializado.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email para lanzamientos"
                  className="bg-white/5 border-none px-5 py-3 text-sm text-white rounded-sm focus:shadow-[0_0_0_1px_#ec1313] focus:outline-none"
                />
                <button className="bg-[#ec1313] px-5 py-3 font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#dc2626] transition-colors">
                  SUSCRIBIR
                </button>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
              © 2024 Tecommers Tecnología. Innovación certificada.
            </p>
            <div className="flex gap-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Garantías</a>
              <a href="#" className="hover:text-white transition-colors">Soporte Técnico</a>
              <a href="#" className="hover:text-white transition-colors">Financiamiento</a>
              <a href="#" className="hover:text-white transition-colors">Trade-in</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Notificación de búsqueda */}
      {showNotification && (
        <div className="fixed bottom-5 right-5 bg-white border-l-4 border-[#cf2e2e] p-4 rounded-lg shadow-xl z-50 flex items-center gap-3 max-w-sm animate-slide-in">
          <span className="material-symbols-outlined text-[#cf2e2e]">check_circle</span>
          <span className="text-gray-800">{notificationMessage}</span>
        </div>
      )}

      {/* Modal últimos modelos */}
      {showLatestInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowLatestInfo(false)}>
          <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">new_releases</span>
            <h4 className="text-2xl text-gray-800 mb-4">Últimos Modelos 2024</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Tecnología de vanguardia con las especificaciones más avanzadas del mercado.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">rocket_launch</span>
                <span className="text-xs text-[#b91c1c] font-medium">Procesadores más potentes</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">photo_camera</span>
                <span className="text-xs text-[#b91c1c] font-medium">Cámaras con IA avanzada</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">battery_full</span>
                <span className="text-xs text-[#b91c1c] font-medium">Autonomía mejorada</span>
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

      {/* Modal gaming */}
      {showGamingInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowGamingInfo(false)}>
          <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">stadia_controller</span>
            <h4 className="text-2xl text-gray-800 mb-4">Equipo Gaming Profesional</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Hardware optimizado para gaming con altas tasas de refresco y rendimiento extremo.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">speed</span>
                <span className="text-xs text-[#b91c1c] font-medium">≥ 144Hz Refresh Rate</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">memory</span>
                <span className="text-xs text-[#b91c1c] font-medium">RTX 40 Series</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">keyboard</span>
                <span className="text-xs text-[#b91c1c] font-medium">Teclado Mecánico RGB</span>
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