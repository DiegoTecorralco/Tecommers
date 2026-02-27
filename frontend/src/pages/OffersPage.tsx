import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useTheme } from '../pages/ThemeContext';

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
  const { addToCart, cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('relevance');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
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

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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

    result = sortProducts(result, selectedSort, searchTerm);
    setFilteredProducts(result);

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

  const handleAddToCart = (product: Product) => {
    const productToAdd = {
      id: product.id,
      nombre: product.name,
      precio: parsePrice(product.price),
      precioOriginal: parsePrice(product.oldPrice),
      imagen: product.image,
      marca: 'Oferta',
      descuento: product.discount,
      especificaciones: []
    };
    addToCart(productToAdd, 'ofertas');
    setNotificationMessage(`${product.name} agregado al carrito`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
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

  const categories = [
    { id: 'electrodomesticos', name: 'Electrodomésticos', icon: 'devices' },
    { id: 'muebles-hogar', name: 'Muebles y Hogar', icon: 'chair' },
    { id: 'tecnologia', name: 'Tecnología', icon: 'computer' },
    { id: 'herramientas', name: 'Herramientas', icon: 'build' }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
            <Link to="/categories" className="nav-link">Categorías</Link>
            <Link to="/offers" className="nav-link active">Ofertas</Link>
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
                <Link to="/categories" className="side-menu-link" onClick={closeMenu}>
                  <span className="material-symbols-outlined">category</span>Categorías
                </Link>
              </li>
              <li>
                <Link to="/offers" className="side-menu-link active" onClick={closeMenu}>
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

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12 w-full">
        <div className="text-center mb-12">
          <h1 className="text-[#ec1313] text-5xl md:text-7xl font-black uppercase tracking-tight mb-2">
            Ofertas
          </h1>
          <p style={{ color: 'var(--text-secondary)' }} className="text-lg">
            Aprovecha descuentos exclusivos por tiempo limitado
          </p>

          <div className="max-w-4xl mx-auto mt-8 mb-6">
            <div className="flex items-center rounded-xl p-2 mb-4 transition-all focus-within:border-[#ec1313] focus-within:shadow-[0_0_0_3px_rgba(207,46,46,0.1)]"
                 style={{ backgroundColor: 'var(--input-bg)', border: '2px solid var(--border-color)' }}>
              <span className="material-symbols-outlined mx-3" style={{ color: 'var(--text-tertiary)' }}>search</span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar en ofertas..."
                className="flex-1 border-none outline-none text-base py-3"
                style={{ backgroundColor: 'transparent', color: 'var(--text-primary)' }}
              />
              <button 
                onClick={() => setSearchTerm(searchTerm)}
                className="bg-[#ec1313] text-white border-none rounded-lg px-5 py-3 cursor-pointer transition-colors hover:bg-[#b91c1c] flex items-center justify-center"
              >
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>

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
                      : '' 
                  }`}
                  style={selectedFilter !== filter.id ? { 
                    backgroundColor: 'var(--bg-tertiary)', 
                    color: 'var(--text-secondary)' 
                  } : {}}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 py-4 border-b"
             style={{ borderColor: 'var(--border-color)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {filteredProducts.length} oferta{filteredProducts.length !== 1 ? 's' : ''} de {products.length}
          </span>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <label htmlFor="sort-select" className="text-sm" style={{ color: 'var(--text-secondary)' }}>Ordenar por:</label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={handleSortChange}
              className="px-3 py-2 rounded-md text-sm cursor-pointer min-w-[180px] focus:outline-none focus:border-[#ec1313]"
              style={{ 
                backgroundColor: 'var(--input-bg)', 
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="relevance">Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="discount">Mayor descuento</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="flex flex-col rounded-xl overflow-hidden shadow-sm transition-shadow hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
              data-category={product.category}
              data-discount={product.discount}
            >
              <div className="relative w-full aspect-square" style={{ backgroundColor: 'var(--bg-secondary)' }}>
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
                  className="font-semibold mb-2 truncate"
                  style={{ color: 'var(--text-primary)' }}
                  dangerouslySetInnerHTML={{ __html: highlightText(product.name, searchTerm) }}
                />
                <p 
                  className="text-sm leading-relaxed mb-4 h-10 overflow-hidden line-clamp-2"
                  style={{ color: 'var(--text-secondary)' }}
                  dangerouslySetInnerHTML={{ __html: highlightText(product.description, searchTerm) }}
                />
                <div className="mt-auto">
                  <span className="line-through text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>{product.oldPrice}</span>
                  <div className="flex items-baseline gap-2">
                    <p className="text-[#ec1313] text-2xl font-black">{product.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full py-2.5 bg-[#ec1313] text-white text-xs font-bold rounded-lg border-none cursor-pointer transition-colors uppercase tracking-wider hover:bg-[#b91c1c]"
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 px-8 rounded-xl my-8"
               style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="max-w-md mx-auto">
              <span className="material-symbols-outlined text-6xl mb-4" style={{ color: 'var(--text-tertiary)' }}>search_off</span>
              <h3 className="text-2xl mb-2" style={{ color: 'var(--text-secondary)' }}>No se encontraron ofertas</h3>
              <p className="mb-6" style={{ color: 'var(--text-tertiary)' }}>Intenta con otros términos de búsqueda o ajusta los filtros</p>
              <button
                onClick={clearSearch}
                className="bg-[#ec1313] text-white border-none rounded-md px-5 py-2.5 text-sm font-medium cursor-pointer transition-colors hover:bg-[#b91c1c]"
              >
                Mostrar todas las ofertas
              </button>
            </div>
          </div>
        )}

        {showNotification && (
          <div className="fixed top-[100px] right-5 py-4 px-5 rounded-lg shadow-xl flex items-center gap-3 z-50 max-w-[350px] transform translate-x-0 transition-transform duration-300"
               style={{ backgroundColor: 'var(--card-bg)', borderLeft: `4px solid #ec1313` }}>
            <span className="material-symbols-outlined text-[#ec1313]">check_circle</span>
            <span style={{ color: 'var(--text-primary)' }}>{notificationMessage}</span>
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 border-2 border-[#ec1313] text-[#ec1313] font-bold rounded-full cursor-pointer transition-all hover:bg-[#ec1313] hover:text-white"
                  style={{ backgroundColor: 'transparent' }}>
            Ver todo el catálogo
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
              Líderes en tecnología y productos para el hogar. Calidad garantizada en cada compra.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Productos</h4>
            <ul className="footer-links">
              <li><Link to="/categories/tecnologia" className="footer-link">Electrónica</Link></li>
              <li><Link to="/categories/muebles-hogar" className="footer-link">Hogar</Link></li>
              <li><Link to="#" className="footer-link">Moda</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Soporte</h4>
            <ul className="footer-links">
              <li><Link to="/help" className="footer-link">Ayuda</Link></li>
              <li><Link to="/help" className="footer-link">Envíos</Link></li>
              <li><Link to="/contact" className="footer-link">Contacto</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Newsletter</h4>
            <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
              <input type="email" placeholder="Email" className="flex-1 px-4 py-2 text-sm outline-none border-none"
                     style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-primary)' }} />
              <button className="bg-[#ec1313] text-white px-4 py-2 text-xs font-bold border-none cursor-pointer transition-colors hover:bg-[#b91c1c]">
                UNIRSE
              </button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2024 Tecommers. Todos los derechos reservados.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacidad</Link>
            <Link to="/terms" className="footer-bottom-link">Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OffersPage;