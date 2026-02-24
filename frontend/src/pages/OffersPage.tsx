import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  oldPrice: string;
  price: string;
  discount: number;
  category: string;
}

const OffersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('relevance');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Inicializar productos
  useEffect(() => {
    const initialProducts: Product[] = [
      {
        id: 1,
        name: 'iPhone 17 Pro Max',
        description: 'Smartphone de última generación con pantalla Super Retina XDR y cámara profesional.',
        image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        oldPrice: '$1,249.00',
        price: '$999.00',
        discount: 20,
        category: 'technology'
      },
      {
        id: 2,
        name: 'Mueble Minimalista',
        description: 'Mueble de diseño en madera de roble, perfecto para sala o dormitorio.',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        oldPrice: '$529.00',
        price: '$450.00',
        discount: 15,
        category: 'home'
      },
      {
        id: 3,
        name: 'Conjunto Hombre Invierno',
        description: 'Conjunto completo para invierno, incluye chaqueta impermeable y pantalón térmico.',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        oldPrice: '$121.00',
        price: '$85.00',
        discount: 30,
        category: 'fashion'
      },
      {
        id: 4,
        name: 'Smart TV 4K 48"',
        description: 'Televisor inteligente con resolución 4K, Android TV y asistente de voz integrado.',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        oldPrice: '$665.00',
        price: '$599.00',
        discount: 10,
        category: 'technology'
      },
      {
        id: 5,
        name: 'Laptop Gaming',
        description: 'Laptop para gaming con procesador i7, 16GB RAM y tarjeta gráfica RTX 4060.',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        oldPrice: '$1,499.00',
        price: '$1,299.00',
        discount: 13,
        category: 'technology'
      },
      {
        id: 6,
        name: 'Sofá Moderno',
        description: 'Sofá moderno 3 plazas en tela premium, diseño ergonómico y cómodo.',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        oldPrice: '$999.00',
        price: '$799.00',
        discount: 20,
        category: 'home'
      },
      {
        id: 7,
        name: 'Zapatos Deportivos',
        description: 'Zapatos para running con tecnología air cushion, ideales para entrenamiento.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        oldPrice: '$129.99',
        price: '$89.99',
        discount: 31,
        category: 'fashion'
      },
      {
        id: 8,
        name: 'Refrigerador Smart',
        description: 'Refrigerador inteligente con control por app, sistema de enfriamiento inverter.',
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        oldPrice: '$1,499.00',
        price: '$1,199.00',
        discount: 20,
        category: 'home'
      }
    ];

    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  // Filtrar y ordenar productos cuando cambian los filtros
  useEffect(() => {
    let result = [...products];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedFilter !== 'all') {
      switch(selectedFilter) {
        case 'high-discount':
          result = result.filter(product => product.discount >= 20);
          break;
        case 'technology':
          result = result.filter(product => product.category === 'technology');
          break;
        case 'home':
          result = result.filter(product => product.category === 'home');
          break;
        case 'fashion':
          result = result.filter(product => product.category === 'fashion');
          break;
      }
    }

    // Ordenar
    result = sortProducts(result, selectedSort, searchTerm);

    setFilteredProducts(result);

    // Mostrar notificación si hay búsqueda
    if (searchTerm) {
      setNotificationMessage(`${result.length} resultado${result.length !== 1 ? 's' : ''} para "${searchTerm}"`);
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchTerm, selectedFilter, selectedSort, products]);

  const sortProducts = (products: Product[], sortType: string, search: string): Product[] => {
    const sorted = [...products];
    
    switch(sortType) {
      case 'price-asc':
        return sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case 'price-desc':
        return sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      case 'discount':
        return sorted.sort((a, b) => b.discount - a.discount);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'relevance':
      default:
        if (search) {
          return sorted.sort((a, b) => {
            const aNameMatch = a.name.toLowerCase().includes(search.toLowerCase());
            const bNameMatch = b.name.toLowerCase().includes(search.toLowerCase());
            if (aNameMatch && !bNameMatch) return -1;
            if (!aNameMatch && bNameMatch) return 1;
            return b.discount - a.discount;
          });
        }
        return sorted.sort((a, b) => b.discount - a.discount);
    }
  };

  const parsePrice = (price: string): number => {
    return parseFloat(price.replace('$', '').replace(',', ''));
  };

  const highlightText = (text: string, search: string): string => {
    if (!search) return text;
    
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<mark class="bg-red-200 text-inherit px-[2px] rounded-sm">$1</mark>');
  };

  const handleAddToCart = (productName: string) => {
    alert(`¡${productName} agregado al carrito!`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedFilter('all');
    setSelectedSort('relevance');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleQuickFilter = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ================= NAVBAR PRINCIPAL ================= */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 h-20 flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="h-10 w-auto" viewBox="0 0 160 120">
              <path d="M10 20H80L65 50H45L30 110H10L25 50H10V20Z" fill="#cf2e2e" />
              <path d="M50 55H78L75 73H47L50 55Z" fill="black" />
              <path d="M43 85H71L68 103H40L43 85Z" fill="#cf2e2e" />
            </svg>
            <span className="text-2xl font-black uppercase tracking-tight text-[#1a1a1a] -ml-3">
              TECOMMERS
            </span>
          </div>

          <nav className="flex items-center gap-10">
            <Link to="/" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Home
            </Link>
            <Link to="/categories" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Categorías
            </Link>
            <Link to="/offers" className="text-[#cf2e2e] font-bold hover:text-[#ec1313] transition-colors no-underline text-sm py-2 relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[3px] after:bg-[#ec1313]">
              Ofertas
            </Link>
            <Link to="/services" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Servicios
            </Link>
            <Link to="/about" className="text-slate-600 font-medium hover:text-[#ec1313] transition-colors no-underline text-sm py-2">
              Nosotros
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full bg-slate-100 text-gray-700 hover:text-[#ec1313] hover:bg-slate-200 transition-all w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
            </button>
            <Link to="/register" className="p-2.5 rounded-full bg-slate-100 text-gray-700 hover:text-[#ec1313] hover:bg-slate-200 transition-all w-11 h-11 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">person</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-[#ec1313] text-5xl md:text-7xl font-black uppercase tracking-tight mb-2">
            Ofertas
          </h1>
          <p className="text-gray-500 text-lg">
            Aprovecha descuentos exclusivos por tiempo limitado
          </p>

          {/* Barra de búsqueda */}
          <div className="max-w-4xl mx-auto mt-8 mb-6">
            <div className="flex items-center bg-white border-2 border-slate-200 rounded-xl p-2 mb-4 transition-all focus-within:border-[#ec1313] focus-within:shadow-[0_0_0_3px_rgba(207,46,46,0.1)]">
              <span className="material-symbols-outlined text-slate-500 mx-3">search</span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar en ofertas..."
                className="flex-1 border-none outline-none text-base py-3 text-[#1a1a1a]"
              />
              <button 
                onClick={() => setSearchTerm(searchTerm)}
                className="bg-[#ec1313] text-white border-none rounded-lg px-5 py-3 cursor-pointer transition-colors hover:bg-[#b91c1c] flex items-center justify-center"
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>

            {/* Filtros rápidos */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { id: 'all', label: 'Todas las ofertas' },
                { id: 'high-discount', label: 'Mayor descuento' },
                { id: 'technology', label: 'Tecnología' },
                { id: 'home', label: 'Hogar' },
                { id: 'fashion', label: 'Moda' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => handleQuickFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    selectedFilter === filter.id
                      ? 'bg-[#ec1313] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Información de resultados */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 py-4 border-b border-slate-200">
          <span className="text-sm text-slate-500 font-medium">
            {filteredProducts.length} oferta{filteredProducts.length !== 1 ? 's' : ''} de {products.length}
          </span>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <label htmlFor="sort-select" className="text-sm text-slate-500">Ordenar por:</label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={handleSortChange}
              className="px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-600 bg-white cursor-pointer min-w-[180px] focus:outline-none focus:border-[#ec1313]"
            >
              <option value="relevance">Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="discount">Mayor descuento</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-shadow hover:shadow-lg cursor-pointer"
              data-category={product.category}
              data-discount={product.discount}
            >
              <div className="relative w-full aspect-square bg-gray-50">
                <div className="absolute top-3 left-3 z-10 bg-[#ec1313] text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </div>
                <img
                  className="w-full h-full object-contain p-8 transition-transform duration-500 hover:scale-105"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 
                  className="text-gray-900 font-semibold mb-2 truncate"
                  dangerouslySetInnerHTML={{ __html: highlightText(product.name, searchTerm) }}
                />
                <p 
                  className="text-slate-500 text-sm leading-relaxed mb-4 h-10 overflow-hidden line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: highlightText(product.description, searchTerm) }}
                />
                <div className="mt-auto">
                  <span className="text-gray-400 line-through text-sm font-medium">{product.oldPrice}</span>
                  <div className="flex items-baseline gap-2">
                    <p className="text-[#ec1313] text-2xl font-black">{product.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product.name)}
                  className="mt-4 w-full py-2.5 bg-[#ec1313] text-white text-xs font-bold rounded-lg border-none cursor-pointer transition-colors uppercase tracking-wider hover:bg-[#b91c1c]"
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje sin resultados */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 px-8 bg-slate-50 rounded-xl my-8">
            <div className="max-w-md mx-auto">
              <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
              <h3 className="text-2xl text-slate-500 mb-2">No se encontraron ofertas</h3>
              <p className="text-slate-400 mb-6">Intenta con otros términos de búsqueda o ajusta los filtros</p>
              <button
                onClick={clearSearch}
                className="bg-[#ec1313] text-white border-none rounded-md px-5 py-2.5 text-sm font-medium cursor-pointer transition-colors hover:bg-[#b91c1c]"
              >
                Mostrar todas las ofertas
              </button>
            </div>
          </div>
        )}

        {/* Notificación de búsqueda */}
        {showNotification && (
          <div className="fixed top-[100px] right-5 bg-white border-l-4 py-4 px-5 rounded-lg shadow-xl flex items-center gap-3 z-50 max-w-[350px] transform translate-x-0 transition-transform duration-300"
               style={{ borderLeftColor: '#ec1313' }}>
            <span className="material-symbols-outlined text-[#ec1313]">search</span>
            <span>{notificationMessage}</span>
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 bg-white border-2 border-[#ec1313] text-[#ec1313] font-bold rounded-full cursor-pointer transition-all hover:bg-[#ec1313] hover:text-white">
            Ver todo el catálogo
          </button>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
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
              Líderes en tecnología y productos para el hogar. Calidad garantizada en cada compra.
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Productos</h4>
            <ul className="list-none flex flex-col gap-3 text-sm text-gray-500">
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Electrónica</a></li>
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Hogar</a></li>
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Moda</a></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Soporte</h4>
            <ul className="list-none flex flex-col gap-3 text-sm text-gray-500">
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Ayuda</a></li>
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Envíos</a></li>
              <li><a href="#" className="text-gray-500 no-underline transition-colors hover:text-[#ec1313]">Contacto</a></li>
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
    </div>
  );
};

export default OffersPage;