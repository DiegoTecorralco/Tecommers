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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showEcoInfo, setShowEcoInfo] = useState(false);
  const [showLatestInfo, setShowLatestInfo] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
            Muebles y Hogar
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Diseño, confort y estilo para cada espacio
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
              placeholder="Buscar sofás, mesas, dormitorios, decoración, estilos..."
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
            {['Sofá', 'Cama', 'Mesa', 'Moderno', 'Escandinavo'].map((suggestion) => (
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
            {sortedProducts.length} mueble{sortedProducts.length !== 1 ? 's' : ''} de {productos.length}
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
                        className="flex items-center gap-1 text-xs text-white bg-[#ec1313] px-2 py-1 rounded-lg"
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
              <h3 className="text-2xl font-bold text-[#1a1a1a]">No se encontraron muebles</h3>
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
            Ver colección completa
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
                Diseño que transforma espacios. Muebles de calidad para un hogar con estilo y personalidad.
              </p>
            </div>

            <div>
              <h4 className="font-black mb-8 uppercase tracking-[0.2em] text-xs border-b border-white/10 pb-4">
                Habitaciones
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm font-medium">
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
                Estilos
              </h4>
              <ul className="space-y-4 text-gray-400 text-sm font-medium">
                {['Moderno', 'Escandinavo', 'Industrial', 'Rústico', 'Minimalista', 'Persa'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleStyleClick(item)}
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
                Diseño de interiores, armado profesional, entrega a domicilio y garantía de materiales.
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email para novedades"
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
              © 2024 Tecommers Muebles y Hogar. Diseño y calidad certificada.
            </p>
            <div className="flex gap-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Diseño de Interiores</a>
              <a href="#" className="hover:text-white transition-colors">Armado Profesional</a>
              <a href="#" className="hover:text-white transition-colors">Entrega</a>
              <a href="#" className="hover:text-white transition-colors">Garantías</a>
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

      {showEcoInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5 animate-fade-in" onClick={() => setShowEcoInfo(false)}>
          <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-green-600 mb-5">eco</span>
            <h4 className="text-2xl text-gray-800 mb-4">Muebles Ecológicos</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Productos fabricados con materiales sostenibles, procesos responsables y diseño consciente con el medio ambiente.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-green-600">forest</span>
                <span className="text-xs text-green-700 font-medium">Maderas certificadas</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-green-600">recycling</span>
                <span className="text-xs text-green-700 font-medium">Materiales reciclados</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-green-50 rounded-lg">
                <span className="material-symbols-outlined text-2xl text-green-600">water_drop</span>
                <span className="text-xs text-green-700 font-medium">Pinturas no tóxicas</span>
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
          <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-2xl" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-5xl text-[#cf2e2e] mb-5">new_releases</span>
            <h4 className="text-2xl text-gray-800 mb-4">Nuevos Diseños 2024</h4>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Las últimas tendencias en mobiliario, con diseños innovadores, materiales premium y funcionalidad mejorada.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">trending_up</span>
                <span className="text-xs text-[#b91c1c] font-medium">Tendencias 2024</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">design_services</span>
                <span className="text-xs text-[#b91c1c] font-medium">Diseño Innovador</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-[#fee] rounded-lg">
                <span className="material-symbols-outlined text-2xl text-[#cf2e2e]">workspace_premium</span>
                <span className="text-xs text-[#b91c1c] font-medium">Materiales Premium</span>
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