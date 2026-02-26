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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showEfficiencyInfo, setShowEfficiencyInfo] = useState(false);
  const [showLatestInfo, setShowLatestInfo] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
            <Link to="/Cart" className="relative p-2.5 rounded-full bg-slate-100 text-gray-700 hover:text-[#ec1313] hover:bg-slate-200 transition-all w-11 h-11 flex items-center justify-center">
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
            Electrodomésticos
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tecnología y eficiencia para tu hogar
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
              placeholder="Buscar refrigeradores, lavadoras, cocinas, aires, marcas..."
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
            {['Refrigerador', 'Lavadora', 'LG', 'Samsung', 'Aire Acondicionado'].map((suggestion) => (
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
            {sortedProducts.length} electrodoméstico{sortedProducts.length !== 1 ? 's' : ''} de {productos.length}
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
                          spec.texto.includes('A++') || spec.texto.includes('A+') 
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
                      <span className="text-sm text-gray-400 line-through">
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
              <h3 className="text-2xl font-bold text-[#1a1a1a]">No se encontraron electrodomésticos</h3>
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

        <div className="text-center mt-16 pt-16 border-t-2 border-gray-200">
          <button className="px-8 py-4 bg-white text-[#cf2e2e] border-2 border-[#cf2e2e] rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#cf2e2e] hover:text-white transition-colors">
            Ver más electrodomésticos
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
                Electrodomésticos inteligentes para un hogar eficiente. Tecnología que simplifica tu vida.
              </p>
            </div>

            <div>
              <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs border-b border-white/10 pb-4">
                Categorías
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm font-medium">
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
                {['LG', 'Samsung', 'Mabe', 'Daikin', 'Whirlpool', 'Xiaomi', 'Panasonic', 'iRobot'].map((item) => (
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
                Servicios
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Instalación profesional, garantía extendida y soporte técnico especializado.
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
              © 2024 Tecommers Electrodomésticos. Garantía y servicio incluidos.
            </p>
            <div className="flex gap-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Instalación</a>
              <a href="#" className="hover:text-white transition-colors">Garantías</a>
              <a href="#" className="hover:text-white transition-colors">Financiamiento</a>
              <a href="#" className="hover:text-white transition-colors">Retiro viejo</a>
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

      {showEfficiencyInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowEfficiencyInfo(false)}>
          <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-green-600 mb-5">info</span>
            <h4 className="text-2xl text-gray-800 mb-4">Eficiencia Energética A+++</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Los electrodomésticos con clasificación A+++ consumen hasta un 60% menos de energía que los de clase A, reduciendo significativamente tu factura eléctrica.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-green-600">savings</span>
                <span className="text-xs text-green-700 font-medium">Ahorro hasta 60%</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-green-600">recycling</span>
                <span className="text-xs text-green-700 font-medium">Ecológico</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-green-600">verified</span>
                <span className="text-xs text-green-700 font-medium">Certificación UE</span>
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
          <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">new_releases</span>
            <h4 className="text-2xl text-gray-800 mb-4">Últimos Modelos 2024</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Electrodomésticos con la tecnología más avanzada, diseño innovador y las mejores características del mercado.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">wifi</span>
                <span className="text-xs text-[#b91c1c] font-medium">Conectividad IoT</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">auto_awesome</span>
                <span className="text-xs text-[#b91c1c] font-medium">Inteligencia Artificial</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">design_services</span>
                <span className="text-xs text-[#b91c1c] font-medium">Diseño Premium</span>
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